import photoshop from "photoshop";
import { saveFileMthods } from "./addMethod";
import { FormatsKeys } from "../redux/reducer/saveFormats";


type SaveFileFunc = (format:FormatsKeys,filePath:string,quality:number) =>Promise<void>;

export const saveFileAsFormat:SaveFileFunc = async(format,filePath,quality) =>{
    switch(format){
        case "eps":
            await saveFileMthods.saveAsEps(filePath);
            break

        case "jpg":
            await saveFileMthods.saveAsJpeg(quality,filePath);
            break

        case "psd":
            await saveFileMthods.saveAsPsd(filePath);
            break;

        case "tiff":
            await saveFileMthods.saveAsTiff(filePath);
            break;

        default:
            await photoshop.app.activeDocument.save();
            break;
    }
}

export class AwaitSaveMethod{
    accept = null;
    deny = null;
    saveFile = null;
    constructor(){

    }

    init = () =>{
        this.saveFile = () =>{
            return new Promise(async(resolve,reject)=>{
                this.accept = resolve;
                this.deny = reject;
                try{
                    const r = await photoshop.app.activeDocument.save();
                    this.accept(true);
                }catch(e){
                    console.log("Error");
                    console.log(e);
                    this.deny("Error");
                }
            })
        }
    }

    rejects = () =>{
        console.log("cancelled");
        this.deny("Error");
    }

    saveDocument = async() =>{
        const r = await this.saveFile();
        console.log("result");
        console.log(r);
    }

}
