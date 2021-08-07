import * as React from "react";
import ReactDOM from "react-dom";

import DialogCompo from "./dialogCompo";

const openPreferences = async(func/*,format*/)=>{
    let preferencesDialog = null;
    if(!preferencesDialog){
        preferencesDialog = document.createElement("dialog");
        preferencesDialog.addEventListener("close",(e)=>console.log(e));
        ReactDOM.render(<DialogCompo itSelf={preferencesDialog} />,preferencesDialog);
    }
    document.body.appendChild(preferencesDialog);
    let result = await preferencesDialog.uxpShowModal({
        title:"saving",
        resize:"none",
        size:{
            width:400,
            height:150
        }
    });
    console.log(result);//dialogからのメッセージを受け取れる。
    if(result==="sure")await func(/*format*/);//ダイアログを閉じたら処理開始
    preferencesDialog.remove();
}
export default openPreferences;