import { IsProgressAction } from "../reducer/progress";

export const isProgress_set:(checked:boolean)=>IsProgressAction = checked =>({type:"isProgress_set",checked:checked});