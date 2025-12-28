import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import fs from 'fs';

// Register the Tokens Studio transforms so references and value conversions work as expected.
register(StyleDictionary, {
  excludeParentKeys: false,
});

// Helper to stamp generated files.
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} T ${hours}:${minutes}:${seconds}`;
}

// Configuration for groups with special processing requirements.
const GROUP_CONFIGS = {
  'Motion': {
    sourceFile: 'animation.json',
    processor: 'buildMotionOutputs',
    includeInStyleDictionary: false,
    includeInIndex: true
  },
  'Responsive/Desktop': {
    preprocessor: 'normalizeResponsiveRefs',
    includeInIndex: true
  },
  'Responsive/Mobile': {
    preprocessor: 'normalizeResponsiveRefs',
    includeInIndex: true
  },
  'Primitives': {
    flatten: true,
    includeInIndex: true
  },
  'Fonts': {
    flatten: true,
    includeInIndex: true
  },
  'Numeric Tokens': {
    flatten: true,
    includeInIndex: true
  },
  'Elevation': {
    flatten: true,
    includeInIndex: true
  },
  'Focus': {
    includeInIndex: true,
    description: 'Focus ring box shadows'
  }
};

// Auto-detect token groups from the source tokens file.
function detectTokenGroups(sourceTokens) {
  const EXCLUDED_KEYS = ['$metadata', '$themes'];

  // Try to use metadata ordering first (respects Figma's intended order).
  if (sourceTokens.$metadata?.tokenSetOrder) {
    return sourceTokens.$metadata.tokenSetOrder.map(key => ({
      key,
      source: 'tokens-from-ts.json'
    }));
  }

  // Fallback: auto-detect from top-level keys.
  const detectedGroups = Object.keys(sourceTokens)
    .filter(key => !EXCLUDED_KEYS.includes(key))
    .filter(key => {
      const value = sourceTokens[key];
      return value && typeof value === 'object' && !Array.isArray(value);
    })
    .map(key => ({
      key,
      source: 'tokens-from-ts.json'
    }));

  return detectedGroups;
}

const tokensFile = 'export-from-figma/tokens-from-ts.json';
const allTokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8'));
const animationFile = 'export-from-figma/animation.json';

// Auto-detect groups and apply configurations.
const detectedGroups = detectTokenGroups(allTokens);
let TOKEN_GROUPS = detectedGroups.map(group => ({
  key: group.key,
  ...(GROUP_CONFIGS[group.key] || {})
}));

// Add Motion group manually if animation.json exists and Motion not already detected.
if (fs.existsSync(animationFile) && !TOKEN_GROUPS.find(g => g.key === 'Motion')) {
  TOKEN_GROUPS.push({
    key: 'Motion',
    sourceFile: 'animation.json',
    processor: 'buildMotionOutputs',
    includeInStyleDictionary: false,
    includeInIndex: true
  });
}

console.log('📋 Detected token groups:', TOKEN_GROUPS.map(g => g.key).join(', '));

// Fix known missing prefixes in focus-fx error layers.
try {
  const focusFx = allTokens?.Tokens?.['focus-fx'];
  if (focusFx && typeof focusFx === 'object') {
    for (const variant of Object.values(focusFx)) {
      const layers = variant?.$value;
      if (Array.isArray(layers)) {
        for (const layer of layers) {
          if (
            layer &&
            typeof layer === 'object' &&
            typeof layer.color === 'string' &&
            layer.color.trim() === '{color.border.focus.error}'
          ) {
            layer.color = '{Tokens.color.border.focus.error}';
          }
        }
      }
    }
  }
} catch (_) {
  // Non-fatal; continue.
}

// Ensure Responsive token references include the full group prefix.
function normalizeResponsiveRefs(group, groupName) {
  const walk = (node) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (key === '$value' && value && typeof value === 'object' && !Array.isArray(value)) {
        walk(value);
        continue;
      }

      if (key.startsWith('$')) {
        continue;
      }

      if (typeof value === 'string' && value.includes('{typescale.')) {
        node[key] = value.replace(/\{typescale\./g, `{${groupName}.typescale.`);
      } else if (value && typeof value === 'object') {
        walk(value);
      }
    }
  };

  walk(group);
}

// Apply preprocessors dynamically based on group configuration.
for (const group of TOKEN_GROUPS) {
  if (group.preprocessor === 'normalizeResponsiveRefs' && allTokens[group.key]) {
    normalizeResponsiveRefs(allTokens[group.key], group.key);
  }
}

function prepareTokensForDictionary(sourceTokens) {
  const prepared = { ...sourceTokens };

  // Dynamically determine which groups to flatten based on config.
  const groupsToFlatten = TOKEN_GROUPS
    .filter(g => g.flatten === true)
    .map(g => g.key);

  for (const groupKey of groupsToFlatten) {
    const group = sourceTokens[groupKey];
    if (!group || typeof group !== 'object') {
      continue;
    }

    for (const [childKey, childValue] of Object.entries(group)) {
      if (!(childKey in prepared)) {
        prepared[childKey] = childValue;
      }
    }
  }

  return prepared;
}

const dictionaryTokens = prepareTokensForDictionary(allTokens);

const aliasLookup = new Map();
const tokenEntries = new Map();

function sanitizeSegment(segment) {
  return segment
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function nameSegmentsFromPath(path) {
  if (!Array.isArray(path) || path.length === 0) {
    return [];
  }

  const [group, ...rest] = path;

  // Remove the group prefix from all paths (only use the nested path)
  if (group === 'Primitives') {
    if (rest[0] === 'colors') {
      return rest.slice(1).map(sanitizeSegment).filter(Boolean);
    }
    return rest.map(sanitizeSegment).filter(Boolean);
  }

  // For Responsive groups, include the context (desktop/mobile) as prefix
  if (group === 'Responsive/Desktop') {
    return ['desktop', ...rest.map(sanitizeSegment).filter(Boolean)];
  }

  if (group === 'Responsive/Mobile') {
    return ['mobile', ...rest.map(sanitizeSegment).filter(Boolean)];
  }

  // For all other groups, exclude the group name and use only the nested path
  return rest.map(sanitizeSegment).filter(Boolean);
}

function buildName(path) {
  return nameSegmentsFromPath(path).join('-');
}

function getFileName(groupKey) {
  return groupKey.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
}

function registerAliases(pathSegments, entry) {
  for (let i = 0; i < pathSegments.length; i += 1) {
    const key = pathSegments.slice(i).join('.');
    if (!aliasLookup.has(key)) {
      aliasLookup.set(key, entry);
    }
  }
}

function extractTokenValue(node) {
  if (node && typeof node === 'object' && !Array.isArray(node) && '$value' in node) {
    return node.$value;
  }
  return node;
}

function extractTokenType(node) {
  if (node && typeof node === 'object' && !Array.isArray(node) && '$type' in node) {
    return node.$type;
  }
  return undefined;
}

function addFlatToken(pathSegments, node) {
  if (!pathSegments || pathSegments.length === 0) {
    return;
  }

  const scssName = buildName(pathSegments);
  if (!scssName) {
    return;
  }

  const pathKey = pathSegments.join('.');
  const entry = {
    path: [...pathSegments],
    pathKey,
    scssName,
    cssName: scssName,
    rawValue: extractTokenValue(node),
    type: extractTokenType(node),
  };

  tokenEntries.set(pathKey, entry);
  registerAliases(pathSegments, entry);
}

function flattenTokenTree(node, pathSegments = []) {
  if (node === null || node === undefined) {
    return;
  }

  if (typeof node !== 'object' || Array.isArray(node)) {
    addFlatToken(pathSegments, node);
    return;
  }

  if ('$value' in node) {
    addFlatToken(pathSegments, node);
    return;
  }

  if ('value' in node && typeof node.value !== 'object') {
    addFlatToken(pathSegments, node.value);
    return;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) {
      continue;
    }
    flattenTokenTree(value, [...pathSegments, key]);
  }
}

flattenTokenTree(allTokens);

function resolveStringValue(str, target, stack) {
  if (typeof str !== 'string') {
    return str;
  }

  const trimmed = str.trim();
  const exactMatch = trimmed.match(/^\{([^}]+)\}$/);
  if (exactMatch) {
    const entry = aliasLookup.get(exactMatch[1].trim());
    if (!entry) {
      return str;
    }
    if (target === 'scss') {
      return `$${entry.scssName}`;
    }
    if (target === 'css') {
      return resolveEntryValue(entry, target, stack);
    }
  }

  return str.replace(/\{([^}]+)\}/g, (match, rawRef) => {
    const ref = rawRef.trim();
    const entry = aliasLookup.get(ref);
    if (!entry) {
      return match;
    }

    if (target === 'scss') {
      return `$${entry.scssName}`;
    }

    if (target === 'css') {
      const resolved = resolveEntryValue(entry, target, stack);
      if (typeof resolved === 'string' || typeof resolved === 'number') {
        return resolved;
      }
      return stringifyValue(resolved);
    }

    return match;
  });
}

function resolveValueDeep(value, target, stack) {
  if (typeof value === 'string') {
    return resolveStringValue(value, target, stack);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValueDeep(item, target, stack));
  }

  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = resolveValueDeep(val, target, stack);
    }
    return result;
  }

  return value;
}

function resolveEntryValue(entry, target, stack = []) {
  const cacheKey = target === 'css' ? 'resolvedCss' : 'resolvedScss';
  if (entry[cacheKey] !== undefined) {
    return entry[cacheKey];
  }

  if (stack.includes(entry.pathKey)) {
    return entry.rawValue;
  }

  const nextStack = stack.concat(entry.pathKey);
  const resolved = resolveValueDeep(entry.rawValue, target, nextStack);
  entry[cacheKey] = resolved;
  return resolved;
}

function isShadowToken(value) {
  // Helper to check if an object is a valid shadow layer
  const isShadowLayer = (item) =>
    item &&
    typeof item === 'object' &&
    'type' in item &&
    (item.type === 'dropShadow' || item.type === 'innerShadow') &&
    'color' in item &&
    'x' in item &&
    'y' in item &&
    'blur' in item &&
    'spread' in item;

  // Check if value is a single shadow object
  if (isShadowLayer(value)) {
    return true;
  }

  // Check if value is an array of shadow layer objects
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(isShadowLayer)
  );
}

function convertShadowToCSS(shadowValue) {
  // Convert Tokens Studio shadow format to CSS box-shadow
  // Handle both single shadow objects and arrays
  const shadowArray = Array.isArray(shadowValue) ? shadowValue : [shadowValue];

  return shadowArray
    .map((layer) => {
      const x = layer.x || 0;
      const y = layer.y || 0;
      const blur = layer.blur || 0;
      const spread = layer.spread || 0;
      const color = layer.color || 'transparent';
      const inset = layer.type === 'innerShadow' ? 'inset ' : '';

      // Add px unit to numeric values
      const xPx = typeof x === 'number' || !isNaN(Number(x)) ? `${x}px` : x;
      const yPx = typeof y === 'number' || !isNaN(Number(y)) ? `${y}px` : y;
      const blurPx = typeof blur === 'number' || !isNaN(Number(blur)) ? `${blur}px` : blur;
      const spreadPx = typeof spread === 'number' || !isNaN(Number(spread)) ? `${spread}px` : spread;

      return `${inset}${xPx} ${yPx} ${blurPx} ${spreadPx} ${color}`.trim();
    })
    .join(', ');
}

function stringifyValue(value, target) {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value === null) {
    return 'null';
  }

  // Convert shadow tokens to CSS box-shadow format
  if (isShadowToken(value)) {
    return convertShadowToCSS(value);
  }

  const jsonValue = JSON.stringify(value);
  if (target === 'scss') {
    const escaped = jsonValue.replace(/'/g, "\\'");
    return `'${escaped}'`;
  }

  return jsonValue;
}

function formatMotionValue(pathSegments, value) {
  if (Array.isArray(value)) {
    const parts = value.map((num) => (typeof num === 'number' ? num : Number(num))); // ensure numeric output
    return `cubic-bezier(${parts.join(', ')})`;
  }

  if (typeof value === 'number') {
    if (pathSegments.includes('durations') || pathSegments.includes('delays')) {
      return `${value}ms`;
    }
    return String(value);
  }

  return String(value);
}

function buildMotionOutputs() {
  if (!fs.existsSync(animationFile)) {
    return;
  }

  let motionSource;
  try {
    motionSource = JSON.parse(fs.readFileSync(animationFile, 'utf-8'));
  } catch (error) {
    console.warn('⚠️  Unable to parse motion tokens:', error.message);
    return;
  }

  const motionRoot = motionSource?.Motion;
  if (!motionRoot || typeof motionRoot !== 'object') {
    return;
  }

  const entries = [];

  const collect = (node, pathSegments) => {
    if (node === null || node === undefined) {
      return;
    }

    if (Array.isArray(node)) {
      entries.push({ path: pathSegments, value: node });
      return;
    }

    if (typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) {
        collect(value, [...pathSegments, key]);
      }
      return;
    }

    entries.push({ path: pathSegments, value: node });
  };

  collect(motionRoot, ['Motion']);

  if (entries.length === 0) {
    return;
  }

  entries.sort((a, b) => a.path.join('.').localeCompare(b.path.join('.')));

  const timestamp = getTimestamp();

  const scssLines = [];
  const cssLines = [];

  for (const entry of entries) {
    const name = buildName(entry.path);
    if (!name) {
      continue;
    }

    const formattedValue = formatMotionValue(entry.path, entry.value);
    scssLines.push(`$${name}: ${formattedValue};`);
    cssLines.push(`  --${name}: ${formattedValue};`);
  }

  const scssHeader = `// Do not edit directly, this file was auto-generated.\n// Generated: ${timestamp}\n// Group: Motion\n\n`;
  const cssHeader = `/**\n * Do not edit directly, this file was auto-generated.\n * Generated: ${timestamp}\n * Group: Motion\n */\n\n`;

  fs.mkdirSync('build/scss', { recursive: true });
  fs.mkdirSync('build/css', { recursive: true });

  fs.writeFileSync('build/scss/_motion.scss', `${scssHeader}${scssLines.join('\n')}\n`);
  fs.writeFileSync('build/css/motion.css', `${cssHeader}:root {\n${cssLines.join('\n')}\n}\n`);
}

StyleDictionary.registerFormat({
  name: 'scss/variables-with-timestamp',
  format: ({ dictionary, options }) => {
    const timestamp = getTimestamp();
    const groupName = options.groupName || 'Tokens';
    const useReferences = options.outputReferences ?? false;
    
    let output = `// Do not edit directly, this file was auto-generated.\n`;
    output += `// Generated: ${timestamp}\n`;
    output += `// Group: ${groupName}\n\n`;

    for (const token of dictionary.allTokens) {
      const name = buildName(token.path);
      if (!name) {
        continue;
      }

        const pathKey = token.path.join('.');
        const entry = tokenEntries.get(pathKey);
        const target = useReferences ? 'scss' : 'css';
        const resolvedValue = entry
          ? resolveEntryValue(entry, target)
          : token.original?.value ?? token.original?.$value ?? token.value;

  const valueString = stringifyValue(resolvedValue, 'scss');
      output += `$${name}: ${valueString};\n`;
    }

    return output;
  },
});

StyleDictionary.registerFormat({
  name: 'css/variables-with-timestamp',
  format: ({ dictionary, options }) => {
    const timestamp = getTimestamp();
    const groupName = options.groupName || 'Tokens';

    let output = `/**\n * Do not edit directly, this file was auto-generated.\n`;
    output += ` * Generated: ${timestamp}\n`;
    output += ` * Group: ${groupName}\n */\n\n`;
    output += `:root {\n`;


    for (const token of dictionary.allTokens) {
      const name = buildName(token.path);
      if (!name) {
        continue;
      }



        const pathKey = token.path.join('.');
        const entry = tokenEntries.get(pathKey);
        const resolvedValue = entry
          ? resolveEntryValue(entry, 'css')
          : token.value ?? token.original?.value ?? token.original?.$value;

  const valueString = stringifyValue(resolvedValue, 'css');
      output += `  --${name}: ${valueString};\n`;
    }

    output += '}\n';
    return output;
  },
});

// Filter groups for inclusion in Style Dictionary and index files.
const STYLE_DICTIONARY_GROUPS = TOKEN_GROUPS.filter(
  group => group.includeInStyleDictionary !== false &&
           group.sourceFile !== 'animation.json'
);

const INDEX_GROUPS = TOKEN_GROUPS.filter(
  group => group.includeInIndex !== false
);

const scssFiles = INDEX_GROUPS.map((group) => `_${getFileName(group.key)}.scss`);
const cssFiles = INDEX_GROUPS.map((group) => `${getFileName(group.key)}.css`);

function tokenBelongsToGroup(token, groupKey) {
  return token.path?.[0] === groupKey;
}

const scssFileDefinitions = STYLE_DICTIONARY_GROUPS.map((group) => ({
  destination: `_${getFileName(group.key)}.scss`,
  format: 'scss/variables-with-timestamp',
  filter: (token) => tokenBelongsToGroup(token, group.key),
  options: {
    outputReferences: false,
    groupName: group.key,
  },
}));

const cssFileDefinitions = STYLE_DICTIONARY_GROUPS.map((group) => ({
  destination: `${getFileName(group.key)}.css`,
  format: 'css/variables-with-timestamp',
  filter: (token) => tokenBelongsToGroup(token, group.key),
  options: {
    outputReferences: false,
    groupName: group.key,
  },
}));

const styleDictionary = new StyleDictionary({
  tokens: dictionaryTokens,
  preprocessors: ['tokens-studio'],
  log: {
    verbosity: 'verbose',
    warnings: 'disabled',
    errors: {
      brokenReferences: 'disabled',
    },
  },
  platforms: {
    scss: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/scss/',
      files: scssFileDefinitions,
    },
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      files: cssFileDefinitions,
    },
  },
});

async function build() {
  console.log('🚀 Building design tokens...');

  try {
    await styleDictionary.cleanAllPlatforms();
    await styleDictionary.buildAllPlatforms();
  buildMotionOutputs();

    const indexHeader = `// Do not edit directly, this file was auto-generated.\n// Generated: ${getTimestamp()}\n// Index file importing all token groups\n\n`;
    const indexBody = scssFiles
      .map((file) => {
        const importPath = file.replace(/^_/, '').replace(/\.scss$/, '');
        return `@import '${importPath}';`;
      })
      .join('\n');

    fs.writeFileSync('build/scss/index.scss', `${indexHeader}${indexBody}\n`);

    console.log('✅ Design tokens built successfully!');
    console.log('\n📁 Generated SCSS files:');
    scssFiles.concat('index.scss').forEach((file) => {
      console.log(`   - build/scss/${file}`);
    });

    console.log('\n📁 Generated CSS files:');
    cssFiles.forEach((file) => {
      console.log(`   - build/css/${file}`);
    });
  } catch (error) {
    console.error('❌ Error building tokens:');
    console.error(error.message);
    process.exit(1);
  }
}

build();
