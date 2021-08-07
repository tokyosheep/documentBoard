import { entrypoints } from "uxp";
import { app } from "photoshop";

import { MainPanel , ExportPanel } from "./panel/panels";

entrypoints.setup({
    plugin:{
        create:(plugin:any)=>{
            console.log(plugin);
        },
        destroy:()=>{
            console.log("destroyed");
        }
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