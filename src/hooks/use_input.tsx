import React, { useState } from "react";
import useLocalStorage from "./use_localstorage";

function useInput(key: any, initValue: any) {
    const [value, setValue] = useLocalStorage(key, initValue);

    function reset() {
        setValue(initValue);
    }
    const attributeObj = {
        value,
        onChange: (e: any) => setValue(e.target.value)
    }
    return [value, reset, attributeObj];
}

export default useInput;
