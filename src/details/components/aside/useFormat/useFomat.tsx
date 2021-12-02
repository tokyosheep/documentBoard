import * as React from "react";
import { useState , useMemo , useCallback } from "react";

export type FormatTypes = {
    "jpg":boolean,
    "png":boolean,
    "gif":boolean,
    "psd":boolean,
    "psb":boolean
}

const initFormat:FormatTypes = {
    "jpg":false,
    "png":false,
    "gif":false,
    "psd":false,
    "psb":false
}

const useFormat = () =>{
    const [formats,setFormats] = useState<FormatTypes>(initFormat);
    const handleFormat:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void = useCallback((e,name)=>{
        setFormats({...formats,[name]:e.target.checked});
    },[formats]);
    return {formats,setFormats,handleFormat};
}

export default useFormat;