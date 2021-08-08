import photoshop from "photoshop";
import uxp from "uxp";
import path from "path-browserify";

const fs:any = uxp.storage.localFileSystem;

export const saveFromDialog = async() =>{
    try{
        const entry = await fs.getFileForSaving("export.psd");
        photoshop.app.activeDocument.save(entry);
    }catch(e){
        photoshop.app.showAlert(e);
    }
}