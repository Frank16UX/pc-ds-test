import tokensJson from '../../export-from-figma/tokens-from-ts.json';

type TokenGroup = {
  [key: string]: any;
};

/**
 * Transforms a JSON path to SCSS variable name format.
 * Mirrors the logic in build-tokens.js nameSegmentsFromPath function.
 */
function pathToScssName(path: string[]): string {
  if (path.length === 0) return '';
  const [group, ...rest] = path;
  let segments: string[];

  // Handle Primitives group
  if (group === 'Primitives') {
    if (rest[0] === 'colors') {
      segments = rest.slice(1);
    } else {
      segments = rest;
    }
  }
  // Handle Responsive/Desktop - prefix with 'desktop'
  else if (group === 'Responsive/Desktop') {
    segments = ['responsive', 'desktop', ...rest];
  }
  // Handle Responsive/Mobile - prefix with 'mobile'
  else if (group === 'Responsive/Mobile') {
    segments = ['responsive', 'mobile', ...rest];
  }
  // For all other groups (Tokens, Numeric Tokens, Elevation, etc.),
  // strip the group name and use only the nested path
  else {
    segments = rest;
  }

  const sanitized = segments
    .map(seg => seg
      .toString()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
    )
    .filter(Boolean);

  return `${sanitized.join('-')}`;
}

/**
 * Recursively builds a cache of token descriptions from the JSON structure.
 * Maps SCSS variable names to their descriptions.
 */
function buildDescriptionCache(): Map<string, string> {
  const cache = new Map<string, string>();

  function traverse(obj: TokenGroup, path: string[] = []): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // If it has a $value property, it's a token
        if ('$value' in value && '$description' in value) {
          const scssName = pathToScssName(currentPath);
          if (scssName) {
            cache.set(scssName, value.$description as string);
          }
        }
        // Otherwise, it's a group - recurse
        traverse(value as TokenGroup, currentPath);
      }
    }
  }

  traverse(tokensJson as TokenGroup);
  return cache;
}

// Build cache once at module load time
const descriptionCache = buildDescriptionCache();

/**
 * Retrieves the description for a token by its SCSS variable name.
 * @param tokenName - The SCSS variable name (e.g., '$color-text-default-primary')
 * @returns The description or undefined if not found
 */
export function getTokenDescription(tokenName: string): string | undefined {
  // Remove the '$' prefix if present
  const key = tokenName.startsWith('$') ? tokenName.slice(1) : tokenName;
  return descriptionCache.get(key);
}
