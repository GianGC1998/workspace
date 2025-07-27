import { useEffect, useState } from 'react';

/**
 * Hook que retrasa la ejecución de una función hasta que el valor deje de cambiar
 * @param value - El valor a debounce
 * @param delay - El tiempo de espera en milisegundos (por defecto 500ms)
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
