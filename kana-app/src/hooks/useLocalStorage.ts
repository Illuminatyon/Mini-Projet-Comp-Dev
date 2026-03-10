import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: number) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: number) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    return [storedValue, setValue] as const;
}