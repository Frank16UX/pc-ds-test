import { useEffect, useState } from 'react';

const getCSSVariableValue = (variableName: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

export const useCSSVariable = (variableName: string): string => {
  const [value, setValue] = useState<string>(() => getCSSVariableValue(variableName));

  useEffect(() => {
    setValue(getCSSVariableValue(variableName));
  }, [variableName]);

  return value;
};
