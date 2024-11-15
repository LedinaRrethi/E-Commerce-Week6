import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const savedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(savedValue ? JSON.parse(savedValue) : initialValue);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
