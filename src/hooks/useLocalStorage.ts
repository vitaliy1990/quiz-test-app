import { useCallback } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const get = useCallback((): T => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue || '';
  }, [key, initialValue]);

  const set = useCallback(
    (data: T) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    [key]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { get, set, clear };
};

export default useLocalStorage;
