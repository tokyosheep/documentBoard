import photoshop from "photoshop";
import fs from "fs";

import { DocumentData } from "../redux/reducer/documents";

export const pickValuesPSDocs:(docs:photoshop.Document[])=>DocumentData[] = docs =>{
    return docs.map(doc=>{
        return {
            name:doc.title,
            path:doc.path,
            width:doc.width,
            height:doc.height
        };
    })
}

export const closeFile:(index:number,docs:DocumentData[])=>Promise<boolean> = async(index,docs) =>{
    const currentDocs = photoshop.app.documents;
    console.log(currentDocs,docs);
    if(currentDocs.length !== docs.length)return false;
    await currentDocs[index].close();
    return true;
}

export const saveFile:(index:number,docs:DocumentData[])=>Promise<boolean> = async(index,docs) =>{
    const currentDocs = photoshop.app.documents;
    console.log(currentDocs,docs);
    if(currentDocs.length !== docs.length)return false;
    await currentDocs[index].save();
    return true
}

export const activeDoc:(index:number,docs:DocumentData[])=>Promise<void> = async(index,docs)=>{
    const currentDocs = photoshop.app.documents;
    if(currentDocs.length !== docs.length)return;
    photoshop.app.activeDocument = currentDocs[index];
}