import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.warn(`useLocalStorage: impossible d'écrire la clé "${key}"`);
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;