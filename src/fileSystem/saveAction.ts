import photoshop from "photoshop";
import { storage } from "uxp";
import {core as photoshopCore} from "photoshop"
import { app } from "photoshop";
import path from "../../node_modules/path-browserify";

import { FormatTypes } from "../details/components/aside/useFormat/useFomat";
import { DocumentData } from "../details/features/document/documentSlice";

const fs = storage.localFileSystem;

const saveActiveDocument:(formats:FormatTypes,fileName:string,folder:any)=>Promise<void> = async(formats,fileName,folder)=>{
    await photoshopCore.executeAsModal(async()=>{
        await Promise.allSettled( 
            Object.entries(formats).map(async([key,value])=>{
                if(!value)return;
                console.log(fileName+"."+key);
                try{
                    /*saveAs オプションに空のオブジェクトを渡すとデフォルトのオプションが適応される */
                    await app.activeDocument.saveAs[key](await folder.createEntry(fileName+"."+key),{},true);
                }catch(e){
                    console.log(e);
                }
        }));
    },{commandName:"save"});
}


export const exportDocuments:(formats:FormatTypes,docs:DocumentData[])=>Promise<void> = async(formats,docs)=>{
    await photoshopCore.executeAsModal(async(executionControl)=>{
        if(app.documents.length !== docs.length){
            app.showAlert("active documents doesn't fit saved docs");
            return;
        }
        let count = 0;
        const ratio = 10/docs.length
        try{
            const folder = await fs.getFolder();
            if(folder===null)return;
            await Promise.allSettled(docs.map(async(doc)=>{
                console.log(doc);
                if(!doc.checked)return;
                app.activeDocument = app.documents.find(d=> d.id===doc.id);
                const baseName = path.basename(doc.name,path.extname(doc.name));
                console.log(baseName);
                await saveActiveDocument(formats,baseName,folder);
                count += ratio;
                executionControl.reportProgress({value:count});
            }));
        }catch(e){
            console.log(e);
        }
    },{commandName:"export files"});
}

export const saveCheckedDocs:(docs:DocumentData[])=>Promise<void> = async docs =>{
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
                await app.activeDocument.save();
                count += ratio;
                executionControl.reportProgress({value:count});
            }
            
        }));
    },{commandName:"save documents"})
}
