import {useEffect, useState} from "react";

export function useLocalStorage<T>(key:string,intialValue:T){
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item?JSON.parse(item) : intialValue;
        }catch (error) {
            console.error(error);
            return intialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key,JSON.stringify(storedValue));
        }catch (e) {
            console.error(e);
        }
    },[key,storedValue]);

    return [storedValue, setStoredValue] as const;
}
