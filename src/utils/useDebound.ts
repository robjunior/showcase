import { useState, useEffect, useRef } from 'react';

type DebounceOptions = {
  delay?: number;
};

export const useDebounce = <T>(value: T, options: DebounceOptions = {}): T => {
  const { delay = 300 } = options;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;