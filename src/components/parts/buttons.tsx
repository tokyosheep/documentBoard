import * as React from "react";
import styled from "styled-components";

import { commonBlack , commonWhite } from "../../styles/commonValues";
import { darken } from "polished";

type StdButtonProps = {
    name:string,
    func:(v:string)=>void
}

const StdButtonStyle = styled.button`
    border: none;
    width: 100px;
    height: 20px;
    border-radius: 5px;
    background: ${commonWhite};
    color: ${commonBlack};
    margin: 0;
    &:hover{
        cursor: pointer;
    }
    &:active{
        background: ${darken(0.3,commonWhite)};
    }
`;

export const StdButton:(props:StdButtonProps)=>JSX.Element = props =>{
    return(
        <StdButtonStyle onClick={()=>props.func(props.name)}>{props.name}</StdButtonStyle>
    )
}

const CautionColor = "#ee2233";

const CautionButton = styled.button`
    border: none;
    width: 100px;
    height: 20px;
    border-radius: 5px;
    background: ${CautionColor};
    color: #fff;
    &:active{
        background: ${darken(0.2,CautionColor)};
    }
    &:hover{
        cursor: pointer;
    }
`;

export const CautionColorButton:(props:StdButtonProps)=>JSX.Element = props =>{
    return <CautionButton onClick={()=>props.func(props.name)}>{props.name}</CautionButton>
}