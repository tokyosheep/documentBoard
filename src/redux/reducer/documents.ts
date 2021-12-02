export type DocumentData = {
    name:string,
    path:string,
    width:number,
    height:number
}

const initDocuments:DocumentData[] = [];

export type DocumentsActions = {type:"documents_set",docs:DocumentData[]};

type DocumentsReducer = (state:DocumentData[],action:DocumentsActions)=>DocumentData[];

export const documentList:DocumentsReducer = (state=initDocuments,action)=>{
    switch(action.type){
        case "documents_set":
            return [...action.docs];

        default:
            return state;
    }
}
