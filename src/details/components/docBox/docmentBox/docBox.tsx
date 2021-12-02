import * as React from "react";
import { useCallback , useState } from "react";
import { FC } from "react";
import styled from "styled-components";
import { DocumentData } from "../../../features/document/documentSlice";
import { StdCheckBox } from "../../../components/parts/checkBoxes";

import LayerBox from "./layerBox/layerBox";
import { useAppDispatch } from "../../../../details/app/hooks";
import { checkDoc } from "../../../features/document/documentSlice";

import FloatWindow from "./floatWIndow/floatWindow";
import LayerFloatWindow,{LayerFloat} from "./layerBox/floatLayerBox";

const DocmentBoxStyle = styled.li`
    padding: 10px;
    width: 300px;
    height: 380px;
    border: 1px solid #999;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 5px;
    position: relative;
`;

const TextList = styled.ul`
    list-style: none;
    margin-bottom: 10px;
    padding: 0px;
    & >li{
        height: 20px;
        width: 85%;
        color: #fff;
        font-size: 13px;
        font-weight: 200;
        margin: 3px auto;
        overflow: hidden;
        white-space: nowrap;
    }
    &:hover{
        background: rgba(255,255,255,0.2);
        cursor: pointer;
    }
`;

const CheckBoxWrapper = styled.div`
    display: block;
    margin-top: 10px;
`;

const initLayer:LayerFloat = {id:0,name:"",typename:"",locked:false,visible:false,checked:false,isWindowVisible:false};

const DocumentBox:FC<DocumentData> = (doc) =>{
    const dispatch = useAppDispatch();
    const [floatLayer,setFloatLayer] = useState<LayerFloat>(initLayer);
    const [isOver,setOver] = useState<boolean>(false);
    const handleCheckBox = useCallback((e)=>{
        dispatch(checkDoc({check:e.target.checked,id:doc.id}));
    },[doc]);
    return(
        <DocmentBoxStyle >
        <LayerFloatWindow {...floatLayer} />
        <FloatWindow isVisible={isOver} name={doc.name} path={doc.path} click={setOver} />
            <TextList onClick={()=>setOver(!isOver)} onMouseLeave={()=>setOver(false)}>
                <li>title:{doc.title}</li>
                <li>path:{doc.path}</li>
                <li>profile:{doc.colorProfileName}</li>
                <li>width:{doc.width}</li>
                <li>height:{doc.height}</li>
            </TextList>
            {<LayerBox layers={doc.layers} docId={doc.id} setLayerWin={setFloatLayer} />}
            <CheckBoxWrapper>
                <StdCheckBox 
                    checked={doc.checked} 
                    func={handleCheckBox} 
                    name={doc.checked ? "ON" : "OFF"} 
                />
            </CheckBoxWrapper>
        </DocmentBoxStyle>
    )
}

export default DocumentBox;