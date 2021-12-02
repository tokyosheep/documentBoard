import { FormatsActions , FormatsKeys } from "../reducer/saveFormats";

export const saveFormats_check:(prop:FormatsKeys)=>FormatsActions = prop => ({type:"saveFormats_check",prop:prop});