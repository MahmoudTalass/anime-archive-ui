import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: unknown) => {
   const [storedValue, setStoredValue] = useState(() => {
      try {
         const v = localStorage.getItem(keyName);
         if (v) {
            return JSON.parse(v);
         } else {
            localStorage.setItem(keyName, JSON.stringify(defaultValue));

            return defaultValue;
         }
      } catch (err) {
         console.log(err);
         return defaultValue;
      }
   });

   const setValue = (newValue: unknown) => {
      try {
         localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {
         console.log(err);
      }
      setStoredValue(newValue);
   };

   return [storedValue, setValue];
};
