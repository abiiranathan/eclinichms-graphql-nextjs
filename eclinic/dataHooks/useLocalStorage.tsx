import { useEffect, useState, Dispatch, SetStateAction } from "react";

function getSavedValue<T>(key: string, initialValue: T | null): T | null {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;

    const parsedValue = JSON.parse(storedValue);
    if (parsedValue) return parsedValue;
  } catch (error) {
    return initialValue;
  }

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
