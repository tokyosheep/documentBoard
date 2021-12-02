import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { ReloadedLayer } from "../../../fileSystem/detailsActions";
import { app } from "photoshop";

export type LayerData = {
    id:number,
    name:string,
    typename:string,
    locked:boolean,
    checked:boolean,
    visible:boolean
}

export type DocumentData = {
    id:number,
    title:string,
    name:string,
    path:string,
    height:number,
    width:number,
    colorProfileName:string,
    checked:boolean,
    layers:LayerData[]
}

interface DocumentState {
    value:DocumentData[]
}

const initialState:DocumentState = {
    value:[]
}

const turnsLayers:(layers:typeof app.activeDocument.layers)=>LayerData[] = layers=>{
    return layers.map(lay=>{
        console.log(lay);
        return{
            id:lay.id,
            name:lay.name,
            typename:lay.kind,
            locked:lay.locked,
            checked:false,
            visible:lay.visible
        }
    })
}

const turnsNewDocSource:(docs:typeof app.documents)=> DocumentData[] = docs =>{
    return docs.map(d=>{
        return {
            id:d.id,
            title:d.title,
            name:d.name,
            path:d.path,
            height:d.height,
            width:d.width,
            colorProfileName:d.colorProfileName,
            layers:turnsLayers(d.layers),
            checked:false
        }
    })
}

export const documentSlice = createSlice({
    name:"documents",
    initialState,
    reducers:{
        loadDocs:(state,action:PayloadAction<typeof app.documents>)=>{
            state.value = turnsNewDocSource(action.payload);
        },
        checkDoc:(state,action:PayloadAction<{check:boolean,id:number}>)=>{
            const targetIndex = state.value.findIndex(s=>s.id===action.payload.id);
            state.value[targetIndex].checked = action.payload.check;
        },
        replaceLayers:(state,action:PayloadAction<ReloadedLayer[]>)=>{
            const replace = state.value.map(doc=>{
                const replaceDoc = action.payload.find(ac=> ac.id===doc.id);
                return {
                    ...doc,
                    layers:replaceDoc.layers===null ? doc.layers : turnsLayers(replaceDoc.layers )
                }
            });
            state.value = replace;
        },
        checkLayer:(state,action:PayloadAction<{check:boolean,docId:number,layId:number}>)=>{
            state.value.forEach(doc=>{
                if(doc.id===action.payload.docId){
                    doc.layers.forEach(lay=>{
                        if(lay.id===action.payload.layId){
                            lay.checked = action.payload.check;
                        }
                    });
                }
            })
        }
    }
});

export const { loadDocs , checkDoc , replaceLayers , checkLayer }  = documentSlice.actions;

export const documents = (state:RootState) => state.documents;

export default documentSlice.reducer;