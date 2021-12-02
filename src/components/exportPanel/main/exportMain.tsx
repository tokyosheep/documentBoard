import * as React from "react";
import { useSelector , useDispatch } from "react-redux";
import photoshop from "photoshop";
import styled from "styled-components";

import { StdButton } from "../../parts/buttons";

import { ExportContainer } from "../../../styles/container";
const { MainCompo } = ExportContainer;

import openPreferences from "./dialog/dialog";

import { isProgress_set } from "../../../redux/actions/isProgressActions";

import { centerPlaced } from "../../../styles/mixin";
import { core as photoshopCore } from "photoshop";

const timeLag = () =>{
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(true);
        },500)
    });
}

const saveDocs = async() =>{
    await photoshopCore.executeAsModal(async(executionControl)=>{
        const ratio = 1/photoshop.app.documents.length;
        let count = 0;
        for(let i=0;i< photoshop.app.documents.length;i++){
            try{
                await timeLag();
                count += ratio;
                executionControl.reportProgress({value:count});
                photoshop.app.activeDocument = photoshop.app.documents[i];
                await photoshop.app.activeDocument.save();
                if(executionControl.isCancelled)throw new Error("error");
            }catch(e){
                console.log(e);
                break;//キャンセルしたら途中で抜ける
            }
        }
    },{"commandName":"save documents"})
}

const ButtonWrapper = styled.div`
    width: auto;
    height: auto;
    ${centerPlaced};
    display: block;
`;

const ExportMain = () =>{
    const dispatch = useDispatch();
    const saveAllDocuments = async()=>{
        dispatch(isProgress_set(true));
        await saveDocs();
        dispatch(isProgress_set(false));
    }
    return(
        <>
            <MainCompo>
                <ButtonWrapper>
                    <StdButton name="save all files" func={()=>openPreferences(saveAllDocuments)} />
                </ButtonWrapper>
            </MainCompo>
        </>
    )
}
/*()=>saveAllDocuments(format[0])*/
export default ExportMain;