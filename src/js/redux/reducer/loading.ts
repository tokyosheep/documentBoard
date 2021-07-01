export type LoadingAction = {type:"loading_switch",isLoad:boolean};

export type LoadReducer = (state:boolean,action:LoadingAction)=>boolean;

export const loading:LoadReducer = (state=false,action)=>{
    switch(action.type){
        case "loading_switch":
            return action.isLoad;

        default:
            return state;
    }
}