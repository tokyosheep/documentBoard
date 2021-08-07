export type SaveFormats = {
    "jpg":boolean,
    "psd":boolean,
    "tiff":boolean,
    "eps":boolean,
    "itSelf":boolean
}

const initFormats = {
    jpg:false,
    psd:false,
    tiff:false,
    eps:false,
    itSelf:true
}

export type FormatsKeys = keyof SaveFormats;

export type FormatsActions = {type:"saveFormats_check",prop:FormatsKeys};

type SaveFormatReducer = (state:SaveFormats,action:FormatsActions)=>SaveFormats;

export const saveFormats:SaveFormatReducer = (state=initFormats,action)=>{
    switch(action.type){
        case "saveFormats_check":
            Object.keys(state).forEach(key=>state[key]=false);
            state[action.prop] = true;
            return {...state};

        default:
            return state;
    }
} 

