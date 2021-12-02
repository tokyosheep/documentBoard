import { DocumentData } from "./reducer/documents";
import { SaveFormats } from "./reducer/saveFormats";

type StateType = {
    documentList:DocumentData[],
    loading:boolean,
    saveFormats:SaveFormats,
    isProgress:boolean
}

export default StateType;