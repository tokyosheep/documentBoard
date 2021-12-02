import photoshop from "photoshop";
import {core as photoshopCore} from "photoshop"
import { app } from "photoshop";

import { DocumentData } from "../redux/reducer/documents";

export const getDocuments:()=>Promise<typeof app.documents> = async() =>{
    return new Promise((resolve,reject)=>{
        photoshopCore.executeAsModal(async()=>{
            try{
                resolve(app.documents);
            }catch(e){
                reject(e);
            }
        },{commandName:"getActive"});
    })
}

export const pickValuesPSDocs:(docs:typeof photoshop.app.documents)=>DocumentData[] = docs =>{
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
    return new Promise(resolve=>{
        photoshopCore.executeAsModal(async()=>{
            try{
                const currentDocs = photoshop.app.documents;
                console.log(currentDocs,docs);
                if(currentDocs.length !== docs.length)return false;
                await currentDocs[index].close();
                resolve(true);
            }catch(e){
                console.log(e);
                resolve(false);
            }
        },{"commandName":"close"});
    });
}

export const saveFile:(index:number,docs:DocumentData[])=>Promise<boolean> = async(index,docs) =>{
    return new Promise(resolve=>{
        photoshopCore.executeAsModal(async()=>{
            try{
                const currentDocs = photoshop.app.documents;
                console.log(currentDocs,docs);
                if(currentDocs.length !== docs.length)resolve(false);
                await currentDocs[index].save();
                resolve(true);
            }catch(e){
                console.log(e);
                resolve(false);
            }
        },{commandName:"save"})
    });
}

export const activeDoc:(index:number,docs:DocumentData[])=>Promise<void> = async(index,docs)=>{
    await photoshopCore.executeAsModal(async()=>{
        const currentDocs = photoshop.app.documents;
        if(currentDocs.length !== docs.length)return;
        photoshop.app.activeDocument = currentDocs[index];
    },{commandName:"activate"});
}

