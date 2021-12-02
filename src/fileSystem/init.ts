import photoshop from "photoshop";

const events = ["select","close","open","make","crop","canvasSize","imageSize","rotateEventEnum","historyStateChanged"];
const layerEvents = ["make","select","move","delete","applyLocking","hide","show"];

export const dispatchEvent:(callback:()=>void)=>void = callback =>{
    photoshop.action.addNotificationListener(events,callback);
}

export const dispatchDocAndLayer:(callback:()=>void)=>void = callback =>{
    photoshop.action.addNotificationListener([...events,...layerEvents],callback);
}