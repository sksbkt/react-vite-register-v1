import React from "react";
import useLocalStorage from "./use_localstorage";

function useToggle(key: any, initValue: any) {
    const [value, setValue] = useLocalStorage(key, initValue);

    function toggle(value: any) {
        setValue((prev: any) => {
            return typeof value === 'boolean' ? value : !prev;
        });
    }

    return [value, toggle];
}

export default useToggle;
