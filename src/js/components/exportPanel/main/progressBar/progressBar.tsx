import * as React from "react";
import styled from "styled-components";

import { centerPlaced } from "../../../../styles/mixin";
import { darken } from "polished";

import { CautionColorButton } from "../../../parts/buttons";

const OverLayer = styled.div<{isProgress:boolean}>`
    width: 100%;
    height: 60%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    z-index: 10;
    display: ${props=>props.isProgress ? "block" : "none"};
`;

const Title = styled.h2`
    color: #fff;
    font-size: 15px;
    font-weight: 300;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
`;

const BarWrapper = styled.div`
    width: 80%;
    height: 10px;
    ${centerPlaced}
    background: rgb(0,0,0);
    border-radius: 5px;
    overflow: hidden;
`;

const baseBarColor = "rgb(20,255,60)";

const Bar = styled.div<{progress:number}>`
    height: 100%;
    width: ${props=>props.progress}%;
    background: ${`linear-gradient( 90deg ,${darken(0.3,baseBarColor)},${baseBarColor})`};
`;

const ButtonWrapper = styled.div`
    width: auto;
    height: auto;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
`;

const ProgressLayer:(props:{progress:number[],isProgress:boolean,cancel:()=>void})=>JSX.Element = ({progress,isProgress,cancel}) =>{
    return(
        <OverLayer isProgress={isProgress}>
            <Title>...progressing</Title>
            <BarWrapper>
                <Bar progress={(progress[0]/progress[1])*100}></Bar>
            </BarWrapper>
            <ButtonWrapper>
                <CautionColorButton name="cancel" func={cancel}/>
            </ButtonWrapper>
        </OverLayer>
    )
}

export default ProgressLayer;