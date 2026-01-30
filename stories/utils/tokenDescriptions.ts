import tokensJson from '../../export-from-figma/tokens-from-ts.json';

type TokenValue = {
  $type?: string;
  $value: string | number | object;
  $description?: string;
};

type TokenGroup = {
  [key: string]: TokenValue | TokenGroup;
};

const descriptionCache = new Map<string, string>();

function isTokenValue(obj: unknown): obj is TokenValue {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    '$value' in obj
  );
}

/**
 * Converts JSON path to SCSS variable name following build-tokens.js logic
 * Mirrors the nameSegmentsFromPath function in build-tokens.js
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
    segments = ['desktop', ...rest];
  }
  // Handle Responsive/Mobile - prefix with 'mobile'
  else if (group === 'Responsive/Mobile') {
    segments = ['mobile', ...rest];
  }
  // For all other groups (Tokens, Numeric Tokens, Elevation, etc.),
  // strip the group name and use only the nested path
  else {
    segments = rest;
  }

  // Sanitize segments (lowercase, replace non-alphanumeric with dash)
  const sanitized = segments
    .map(seg => seg.toString().trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase())
    .filter(Boolean);

  return `$${sanitized.join('-')}`;
}

function buildDescriptionCache(obj: TokenGroup, path: string[] = []): void {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (isTokenValue(value)) {
      if (value.$description) {
        const scssVar = pathToScssName(currentPath);
        if (scssVar && scssVar !== '$') {
          descriptionCache.set(scssVar.toLowerCase(), value.$description);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      buildDescriptionCache(value as TokenGroup, currentPath);
    }
  }
}

// Build cache on module load
buildDescriptionCache(tokensJson as TokenGroup);

/**
 * Get token description from JSON source
 * @param tokenName - SCSS variable name (with or without $)
 * @returns Description string or undefined
 */
export function getTokenDescription(tokenName: string): string | undefined {
  const normalized = tokenName.startsWith('$') ? tokenName : `$${tokenName}`;
  return descriptionCache.get(normalized.toLowerCase());
}

/**
 * Get all tokens with descriptions matching a prefix
 */
export function getDescriptionsByPrefix(prefix: string): Map<string, string> {
  const normalizedPrefix = prefix.startsWith('$') ? prefix.toLowerCase() : `$${prefix}`.toLowerCase();
  const results = new Map<string, string>();

  for (const [name, description] of descriptionCache.entries()) {
    if (name.startsWith(normalizedPrefix)) {
      results.set(name, description);
    }
  }

  return results;
}
