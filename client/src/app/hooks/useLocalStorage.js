// use client
import { useState, useEffect } from 'react';
import { isSsr } from '../utils/utils';

const useLocalStorage = (key, initialValue) => {
    if (isSsr) return [ initialValue ];

    const getStoredValue = () => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    };

    const [ storedValue, setStoredValue ] = useState(getStoredValue);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
    }, [ key, storedValue ]);

    const setValue = (value) => {
        setStoredValue((prevValue) => {
            const newValue = value instanceof Function ? value(prevValue) : value;
            window.localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    };

    const removeValue = () => {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
    };

    return [ storedValue, setValue, removeValue ];
};

export default useLocalStorage;
