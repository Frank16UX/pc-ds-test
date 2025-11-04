import type { CSSProperties } from 'react';
import { resolveTokenValue } from './scssTokens';

type TextTransformValue = CSSProperties['textTransform'];

export interface TypographyTokenResult {
  css: CSSProperties;
  raw: Record<string, string>;
}

const FONT_FALLBACKS: Record<string, string> = {
  Questa: "'Questa', 'Times New Roman', Times, serif",
  Lexend: "'Lexend', 'Arial', 'Helvetica', sans-serif",
};

const WEIGHT_KEYWORDS: Array<{ keyword: string; weight: string }> = [
  { keyword: 'black', weight: '900' },
  { keyword: 'extra bold', weight: '800' },
  { keyword: 'extrabold', weight: '800' },
  { keyword: 'bold', weight: '700' },
  { keyword: 'semi bold', weight: '600' },
  { keyword: 'semibold', weight: '600' },
  { keyword: 'medium', weight: '500' },
  { keyword: 'regular', weight: '400' },
  { keyword: 'light', weight: '300' },
  { keyword: 'thin', weight: '100' },
];

const EMPTY_RESULT: TypographyTokenResult = { css: {}, raw: {} };

const emptyResult = (): TypographyTokenResult => ({ css: {}, raw: {} });

export const getTypographyToken = (scssVariable: string): TypographyTokenResult => {
  const rawValue = resolveTokenValue(scssVariable);
  if (!rawValue) {
    return EMPTY_RESULT;
  }

  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    console.warn(`[typography] Failed to parse token ${scssVariable}:`, rawValue);
    return emptyResult();
  }

  const css: CSSProperties = {};

  if (parsed.fontFamily) {
    css.fontFamily = FONT_FALLBACKS[parsed.fontFamily] ?? `"${parsed.fontFamily}"`;
  }

  applyFontWeight(parsed.fontWeight, css);

  if (parsed.fontSize) {
    css.fontSize = parsed.fontSize;
  }

  if (parsed.lineHeight) {
    css.lineHeight = parsed.lineHeight;
  }

  if (parsed.textDecoration) {
    css.textDecoration = parsed.textDecoration;
  }

  const letterSpacing = normalizeLetterSpacing(parsed.letterSpacing);
  if (letterSpacing) {
    css.letterSpacing = letterSpacing;
  }

  const textTransform = resolveTextCase(parsed.textCase ?? parsed.textTransform);
  if (textTransform) {
    css.textTransform = textTransform;
  }

  return {
    css,
    raw: parsed,
  };
};

const applyFontWeight = (value: string | undefined, css: CSSProperties) => {
  if (!value) {
    return;
  }

  const normalized = value.toLowerCase();

  if (/^\d+$/.test(value)) {
    css.fontWeight = value;
  } else {
    for (const { keyword, weight } of WEIGHT_KEYWORDS) {
      if (normalized.includes(keyword)) {
        css.fontWeight = weight;
        break;
      }
    }
  }

  if (normalized.includes('italic')) {
    css.fontStyle = 'italic';
  }
};

const normalizeLetterSpacing = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }

  if (value.endsWith('%')) {
    const numeric = parseFloat(value);
    if (!Number.isNaN(numeric)) {
      return `${numeric / 100}em`;
    }
  }

  return value;
};

const resolveTextCase = (value: string | undefined): TextTransformValue | undefined => {
  if (!value) {
    return undefined;
  }

  switch (value.toLowerCase()) {
    case 'uppercase':
      return 'uppercase';
    case 'lowercase':
      return 'lowercase';
    case 'capitalize':
      return 'capitalize';
    case 'none':
    case 'normal':
      return 'none';
    default:
      return value as TextTransformValue;
  }
};
