export type IsProgressAction = {type:"isProgress_set",checked:boolean};

type IsProgreeReducer = (state:boolean,action:IsProgressAction)=>boolean;

export const isProgress:IsProgreeReducer = (state=false,action)=>{
    switch(action.type){
        case "isProgress_set":
            return action.checked;

        default:
            return state;
    }
}