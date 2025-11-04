import tokensRaw from '../../build/scss/_tokens.scss?raw';
import numericTokensRaw from '../../build/scss/_numeric-tokens.scss?raw';
import fontsRaw from '../../build/scss/_fonts.scss?raw';
import elevationRaw from '../../build/scss/_elevation.scss?raw';
import responsiveDesktopRaw from '../../build/scss/_responsive-desktop.scss?raw';
import responsiveMobileRaw from '../../build/scss/_responsive-mobile.scss?raw';
import motionRaw from '../../build/scss/_motion.scss?raw';
import breakpointsRaw from '../../build/scss/_breakpoints.scss?raw';
import ratiosRaw from '../../build/scss/_ratios.scss?raw';

type TokenMap = Map<string, string>;

type TokenEntry = {
  name: string;
  value: string;
  raw: string;
};

const RAW_SHEETS = [
  tokensRaw,
  numericTokensRaw,
  fontsRaw,
  elevationRaw,
  responsiveDesktopRaw,
  responsiveMobileRaw,
  motionRaw,
  breakpointsRaw,
  ratiosRaw,
];

const tokenMap: TokenMap = new Map();
const resolvedCache: Map<string, string> = new Map();

for (const sheet of RAW_SHEETS) {
  if (!sheet) {
    continue;
  }

  const matcher = /\$([a-z0-9-]+):\s*(.+?);\s*$/gim;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(sheet)) !== null) {
    const [, name, rawValue] = match;
    if (!tokenMap.has(name)) {
      tokenMap.set(name, rawValue.trim());
    }
  }
}

function normalizeName(name: string): string {
  return name.startsWith('$') ? name.slice(1) : name;
}

function stripOuterQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function resolveToken(name: string, stack: Set<string>): string | undefined {
  const key = normalizeName(name);

  if (resolvedCache.has(key)) {
    return resolvedCache.get(key);
  }

  const rawValue = tokenMap.get(key);
  if (rawValue === undefined) {
    return undefined;
  }

  if (stack.has(key)) {
    return stripOuterQuotes(rawValue);
  }

  const pattern = /\$[a-z0-9-]+/gi;
  let resolved = rawValue;

  stack.add(key);
  resolved = resolved.replace(pattern, (match) => {
    const innerKey = normalizeName(match);
    const innerValue = resolveToken(innerKey, stack);
    return innerValue ?? match;
  });
  stack.delete(key);

  const cleaned = stripOuterQuotes(resolved);
  resolvedCache.set(key, cleaned);
  return cleaned;
}

export function resolveTokenValue(name: string): string | undefined {
  return resolveToken(name, new Set());
}

export function getRawTokenValue(name: string): string | undefined {
  return tokenMap.get(normalizeName(name));
}

export function getTokenValueOr(name: string, fallback: string): string {
  return resolveTokenValue(name) ?? fallback;
}

export function getTokensByPrefix(prefix: string): TokenEntry[] {
  const normalizedPrefix = normalizeName(prefix);
  const results: TokenEntry[] = [];

  for (const [name, raw] of tokenMap.entries()) {
    if (name.startsWith(normalizedPrefix)) {
      const resolved = resolveTokenValue(name);
      results.push({
        name: `$${name}`,
        raw,
        value: resolved ?? raw,
      });
    }
  }

  results.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return results;
}

export function getAllTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];
  for (const [name, raw] of tokenMap.entries()) {
    entries.push({
      name: `$${name}`,
      raw,
      value: resolveTokenValue(name) ?? raw,
    });
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
}

export type { TokenEntry };
