import * as React from "react";
import { FC , useState } from "react";
import { useAppDispatch } from "../../../../../details/app/hooks";
import styled,{css} from "styled-components";
import { LayerData , checkLayer } from "../../../../features/document/documentSlice";

import { BsEyeFill , BsEyeSlashFill , BsFillLockFill , BsFillUnlockFill } from "react-icons/bs";
import { LayerFloat } from "./floatLayerBox";

const visibleStyle = css`
    fill: #a3a3a3;
    width: 20px;
    height: 20px;
`;

const VisibleIcon = styled(BsEyeFill)`
    ${visibleStyle};
`;

const UnvisibleIcon = styled(BsEyeSlashFill)`
    ${visibleStyle};
`;

const LockedIcon = styled(BsFillLockFill)`
    ${visibleStyle};
`;

const UnLockIcon = styled(BsFillUnlockFill)`
    ${visibleStyle};
`;

const LayerBoxStyle = styled.div`
    padding: 10px;
    width: 260px;
    height: 165px;
    margin: auto;
    border: 1px solid #999;
    background: #3c3c3c;
    overflow: scroll;
    position: relative;
`;

const layerProps = css<{check:boolean}>`
    height: 25px;
    padding: 5px;
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    color: #fff;
    font-weight: 200;
    background: ${props=>props.check ? "#222"  : "#777"};
`;

const PropList = styled.ul`
    padding: 0; 
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
    position: relative;
`;

const LayerName = styled.li<{check:boolean}>`
    width: 60%;
    cursor: pointer;
    ${layerProps};
`;

const OptionBox = styled.li<{check:boolean}>`
    ${layerProps};
    width: 30px;
`;


const LayerBox:FC<
    {
        layers:LayerData[],
        docId:number,
        setLayerWin:React.Dispatch<React.SetStateAction<LayerFloat>>
    }
    > = (
    {
        layers,docId,setLayerWin
    }
    ) =>{
    const dispatch = useAppDispatch();
    const props = layers.map(lay=>{
        return(
            <PropList 
                key={lay.id}
                onMouseOver={()=>setLayerWin({...lay,isWindowVisible:true})}
                onMouseLeave={()=>setLayerWin({...lay,isWindowVisible:false})}
                onClick={()=>{
                    dispatch(checkLayer({layId:lay.id,check:!lay.checked,docId}));
                }}>
                <LayerName check={lay.checked}>name:{lay.name}</LayerName>
                <OptionBox check={lay.checked}>{lay.typename.substr(0,3)}</OptionBox>
                <li>{lay.visible ? <VisibleIcon></VisibleIcon> : <UnvisibleIcon></UnvisibleIcon>}</li>
                <li>{lay.locked ? <LockedIcon></LockedIcon> : <UnLockIcon></UnLockIcon>}</li>
            </PropList>
        )
    })
    return(
        <LayerBoxStyle>
            {props}
        </LayerBoxStyle>
    )
}

export default LayerBox;