import uxp,{ entrypoints } from "uxp";
import { app } from "photoshop";
const fs:any = uxp.storage.localFileSystem;

import { MainPanel , ExportPanel } from "./panel/panels";
import { saveFromDialog } from "./fileSystem/saveFromDialog";

import { saveFileMthods } from "./fileSystem/addMethod";

const saveTiff = async() =>{
    try{
        const entry = await fs.getFolder();
        const theNewFile = await entry.createFile("export.tiff", {overwrite: true});
        const saveFile = await fs.createSessionToken(theNewFile);
        await saveFileMthods.saveAsTiff(saveFile);
    }catch(e){
        console.log(e);
    }
}

entrypoints.setup({
    plugin:{
        create:(plugin:any)=>{
            console.log(plugin);
        },
        destroy:()=>{
            console.log("destroyed");
        }
    },
    commands:{
        save_dialog:()=>saveFromDialog(),
        save_tiff:saveTiff
    },
    panels:{
        mainList:{
            show(e){
                console.log(e);
                const attachment:HTMLElement = e.node;
                const root = document.createElement("div");
                MainPanel(attachment,root);
            }
        },
        export:{
            show(e){
                console.log(e);
                const attachment:HTMLElement = e.node;
                const root = document.createElement("div");
                ExportPanel(attachment,root);
            }
        }
    }
})