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
    &:active{
        background: ${darken(0.3,commonWhite)};
    }
    &:hover{
        cursor: pointer;
    }
`;

export const StdButton:(props:StdButtonProps)=>JSX.Element = props =>{
    return(
        <StdButtonStyle onClick={()=>props.func(props.name)}>{props.name}</StdButtonStyle>
    )
}