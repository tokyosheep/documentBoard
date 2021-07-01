import photoshop from "photoshop";

const events = ["select","close","open","make","crop","canvasSize","imageSize","rotateEventEnum","historyStateChanged"];

export const dispatchEvent:(callback:()=>void)=>void = callback =>{
    photoshop.action.addNotificationListener(events.map(e=>({event:e})),callback);
}