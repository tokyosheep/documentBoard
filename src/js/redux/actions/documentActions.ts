import { DocumentsActions , DocumentData } from "../reducer/documents";

export const documents_set:(docs:DocumentData[])=>DocumentsActions = docs => ({type:"documents_set",docs:docs});

