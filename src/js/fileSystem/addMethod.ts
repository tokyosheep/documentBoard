import photoshop from "photoshop";
import uxp from "uxp";
import path from "path-browserify";
const fs:any = uxp.storage.localFileSystem;
/*
const getPureName = filePath => path.basename(filePath,path.extname(filePath));

const getFileNameAsSaveFormat = (filePath,ext) =>{
    console.log("filepath");
    const dirName = filePath.substring(0,filePath.length - (path.basename(filePath).length+1));
    console.log(dirName);
    console.log(path);
    return `${dirName}/${getPureName(filePath)}.${ext}`;
}
*/


/*
UXP ではpath moduleが正常に動かない????
*/



const getFileNameAsSaveFormat:(filePath:string,ext:string)=>string|false = (filePath,ext) =>{
    const index = filePath.lastIndexOf(".");
    console.log(filePath.substring(0,index)+"."+ext);
    return index === -1 ? false : filePath.substring(0,index)+"."+ext;
}

const setPersistentToken = async() =>{
    const thePersistentFolderToken = await fs.getEntryForPersistentToken(await fs.getFolder());
    console.log(thePersistentFolderToken);
    const theNewFile = await thePersistentFolderToken.createFile("export.jpg", {overwrite: true});
    const saveFile = await fs.createSessionToken(theNewFile);
    return saveFile;
}

const saveOnFolder = async() =>{
    console.log(await fs.getFileForOpening());
    const filePath = path.dirname(photoshop.app.activeDocument.path);
    await photoshop.app.activeDocument.save(await fs.getFileForSaving("target.jpg"));
}

const batchPlay:any = photoshop.action.batchPlay;

    export const saveFileMthods = {
        saveAsTiff:async function(
            filePath:string,
        ){
            await batchPlay(
                [
                    {
                        "_obj": "save",
                        "as": {
                            "_obj": "TIFF",
                            "byteOrder": {
                            "_enum": "platform",
                            "_value": "macintosh"
                            }
                        },
                        "in": {
                            "_path": getFileNameAsSaveFormat(filePath,"tiff"),
                            "_kind": "local"
                        },
                        "documentID": 225,
                        "lowerCase": true,
                        "saveStage": {
                            "_enum": "saveStageType",
                            "_value": "saveSucceeded"
                        },
                        "_isCommand": false,
                        "_options": {
                            "dialogOptions": "dontDisplay"
                        }
                    }
                ],{
                    "synchronousExecution": false,
                    "modalBehavior": "fail"
                });

        }
        ,
        saveAsEps:async function(
            filePath:string,
        ){
            await batchPlay(
                [
                    {
                        "_obj": "save",
                        "as": {
                            "_obj": "photoshopEPSFormat",
                            "preview": {
                                "_enum": "EPSPreview",
                                "_value": "TIFF"
                            },
                            "depth": {
                                "_enum": "depth",
                                "_value": "8BitsPerPixel"
                            },
                            "encoding": {
                                "_enum": "encoding",
                                "_value": "ASCII85"
                            },
                            "halftoneScreen": false,
                            "transferFunction": false,
                            "colorManagement": false,
                            "interfaceIconFrameDimmed": false
                        },
                        "in": {
                            "_path": getFileNameAsSaveFormat(filePath,"eps"),
                            "_kind": "local"
                        },
                        "documentID": 225,
                        "lowerCase": true,
                        "saveStage": {
                            "_enum": "saveStageType",
                            "_value": "saveSucceeded"
                        },
                        "_isCommand": false,
                        "_options": {
                            "dialogOptions": "dontDisplay"
                        }
                    }
                ],{
                    "synchronousExecution": false,
                    "modalBehavior": "fail"
                });
        }
        ,
        saveAsPsd:async function(
            filePath:string,
        ){
            await batchPlay(
                [
                    {
                        "_obj": "save",
                        "as": {
                            "_obj": "photoshop35Format"
                        },
                        "in": {
                            "_path": getFileNameAsSaveFormat(filePath,"psd"),
                            "_kind": "local"
                        },
                        "documentID": 225,
                        "lowerCase": true,
                        "saveStage": {
                            "_enum": "saveStageType",
                            "_value": "saveSucceeded"
                        },
                        "_isCommand": false,
                        "_options": {
                            "dialogOptions": "dontDisplay"
                        }
                    }
                ],{
                    "synchronousExecution": false,
                    "modalBehavior": "fail"
                });
        }
        ,
        saveAsJpeg:async function(
            quality:number=12,
            filePath:string,
        ){  

            console.log("save jpeg");
            console.log(photoshop.app.activeDocument.path);
            const result = await batchPlay(
                [
                    {
                        "_obj": "save",
                        "as": {
                            "_obj": "JPEG",
                            "extendedQuality": quality,
                            "matteColor": {
                                "_enum": "matteColor",
                            "_value": "none"
                        }
                    },
                    "in": {
                        "_path": await saveOnFolder(),
                        "_kind": "local"
                    },
                    "documentID": 225,
                    "lowerCase": true,
                    "saveStage": {
                        "_enum": "saveStageType",
                        "_value": "saveSucceeded"
                    },
                    "_isCommand": false,
                    "_options": {
                        "dialogOptions": "dontDisplay"
                        }
                    }
                ],{
                    "synchronousExecution": false,
                    "modalBehavior": "fail"
                });
            console.log(result);
        }
    }


