import {core as photoshopCore} from "photoshop"
import { app } from "photoshop";
import { DocumentData } from "../details/features/document/documentSlice";

export type ReloadedLayer = {id:number,layers:null|typeof app.activeDocument.layers};

export const pasteLayer:(docs:DocumentData[])=>Promise<ReloadedLayer[]> = async docs =>{
    return new Promise(async resolve=>{
        await photoshopCore.executeAsModal(async(executionControl)=>{
            if(app.documents.length !== docs.length){
                app.showAlert("active documents doesn't fit saved docs");
                return;
            }
            const checkedDocs = docs.filter(doc=> doc.checked);
            let count = 0;
            const ratio = 10/ checkedDocs.length
            await Promise.allSettled(docs.map(async(doc)=>{
                try{
                    if(!doc.checked)return;
                    count += ratio;
                    executionControl.reportProgress({value:count});
                    const target = app.documents.find(d=>d.id===doc.id);
                    if(target===undefined)return;
                    app.activeDocument = target;
                    await app.activeDocument.paste();
                    return ;
                }catch(e){
                    console.log(e);
                    return ;
                }
            }));
            resolve(
                app.documents.map(doc=>{
                    return{
                        id:doc.id,
                        layers:doc.layers
                    }
                }
            ));
        },{commandName:"paste layer"});
    })
}

export const deleteLayers:(docData:DocumentData[])=>Promise<ReloadedLayer[]> = async(docData) =>{
    return new Promise(async resolve=>{
        await photoshopCore.executeAsModal(async(executionControl)=>{
            let count = 0;
            const ratio = 10/app.documents.length;
            const layers = app.documents.map((doc,i)=>{
                try{
                    count += ratio;
                    executionControl.reportProgress({value:count});
                    app.activeDocument = app.documents[i];
                    const refDoc = docData.find(d=>d.id===app.activeDocument.id);
                    if(refDoc===undefined)return {layers:app.activeDocument.layers,id:app.activeDocument.id};
                    doc.layers.forEach(lay=>{
                        const ref = refDoc.layers.find(refLay=>refLay.id===lay.id);
                        if(ref?.checked)lay.delete();
                    });
                    return {layers:app.activeDocument.layers,id:app.activeDocument.id};
                }catch(e){
                    console.log(e);
                    return {layers:app.activeDocument.layers,id:app.activeDocument.id};
                }
            });
            resolve(layers);
        },{commandName:"delate layers"});
    })
}

export const closeCheckedDocs:(docData:DocumentData[])=>Promise<typeof app.documents> = async docs=>{
    return new Promise(async(resolve)=>{
        await photoshopCore.executeAsModal(async(executionControl)=>{
            if(app.documents.length !== docs.length){
                app.showAlert("active documents doesn't fit saved docs");
                return;
            }
            const saveFiles = docs.filter(doc=> doc.checked);
            let count = 0;
            const ratio = 10/saveFiles.length
            executionControl.reportProgress({value:0});
            await Promise.allSettled(docs.map(async(doc)=>{
                if(doc.checked){
                    const document = app.documents.find(d=> d.id===doc.id);
                    if(document===undefined)return;
                    app.activeDocument = document;
                    app.activeDocument.close();
                    count += ratio;
                    executionControl.reportProgress({value:count});
                }
            }));
        },{commandName:"close documents"});
        resolve(app.documents);
    })
}