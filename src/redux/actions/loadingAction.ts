import { LoadingAction } from "../reducer/loading";

export const loading_switch:(isLoad:boolean)=>LoadingAction = isLoad => ({type:"loading_switch",isLoad:isLoad});