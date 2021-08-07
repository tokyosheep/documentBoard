import * as React from "react";
import { useCallback , useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { saveFormats_check } from "../../../redux/actions/formatActions";
import photoshop from "photoshop";
import styled from "styled-components";

import { StdCheckBox } from "../../parts/checkBox";
import { StdButton } from "../../parts/buttons";

import { ExportContainer } from "../../../styles/container";
import StateType from "../../../redux/stateType";
const { MainCompo } = ExportContainer;

import openPreferences from "./dialog/dialog";
import { AwaitSaveMethod } from "../../../fileSystem/saveFunc";

import { isProgress_set } from "../../../redux/actions/isProgressActions";
import ProgressLayer from "./progressBar/progressBar";

import { centerPlaced } from "../../../styles/mixin";
/*
const ButtonList = styled.ul`
    margin-top: 10px;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    & > li{
        margin-right: 5px;
        margin-bottom: 5px;
    }
`;
*/
const timeLag = () =>{
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(true);
        },500)
    });
}

const ButtonWrapper = styled.div`
    width: auto;
    height: auto;
    ${centerPlaced};
`;

const ExportMain = () =>{
    const dispatch = useDispatch();
    const [saveMethod] = useState<AwaitSaveMethod>(new AwaitSaveMethod());
    const [progress,setProgress] = useState<number[]>([0,0]);
    saveMethod.init();
    const saveAllDocuments = async(format)=>{
        dispatch(isProgress_set(true));
        await timeLag();//パネル上にローディングバーを表示するためにタイムラグが必要。
        setProgress([0,photoshop.app.documents.length]);
        for(let i=0;i< photoshop.app.documents.length;i++){
            try{
                await timeLag();
                photoshop.app.activeDocument = photoshop.app.documents[i];
                await saveMethod.saveDocument();
                setProgress([progress[0]+=i+1,photoshop.app.documents.length]);
            }catch(e){
                photoshop.app.showAlert(e);
                break;//キャンセルしたら途中で抜ける
            }
        }
        setProgress([0,0]);
        dispatch(isProgress_set(false));
    }
    const isProgress = useSelector((state:StateType)=>state.isProgress);
    /*
    const formats = useSelector((state:StateType)=>state.saveFormats);
    const format = Object.entries(formats).find(([key,value])=> value);
    const handleCheckbox = useCallback((e,name)=>dispatch(saveFormats_check(name)),[formats]);
    const formatButtons = Object.entries(formats).map(([key,value])=>{
        return <li key={key}><StdCheckBox func={handleCheckbox} checked={value} name={key} /></li>
    });
    */
    return(
        <>
            <ProgressLayer isProgress={isProgress} progress={progress} cancel={saveMethod.rejects}/>
            <MainCompo>
                {/*
                    <ButtonList>
                        {formatButtons}
                    </ButtonList>   
                */}
                <ButtonWrapper>
                    <StdButton name="save all files" func={()=>openPreferences(saveAllDocuments)} />
                </ButtonWrapper>
            </MainCompo>
        </>
    )
}
/*()=>saveAllDocuments(format[0])*/
export default ExportMain;