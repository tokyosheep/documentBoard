import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { darken , lighten } from "polished";

import { centerPlaced } from "../../../styles/mixin";

export type CheckBoxProps ={
    checked:boolean,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void,
    name:string,
}

const StdCheckBoxWrapper = styled.label<{bg:string,checked:boolean}>`
    width: 50px;
    height: 20px;
    border-radius: 10px;
    display: block;
    background: ${props=>props.checked ? darken(0.3,props.bg) : props.bg};
    position: relative;
    cursor: pointer;
    & > input{
        display: none;
    }
    &:active{
        background: ${props=> darken(0.4,props.bg)};
    }
`;

const BoardBoxText = styled.div<{textColor:string}>`
    font-size: 12px;
    font-weight: 300;
    color: ${props=>props.textColor};
    ${centerPlaced};
`;

export const StdCheckBox:FC<CheckBoxProps> = ({checked,func,name}) =>{
    return(
        <StdCheckBoxWrapper 
            bg="#666" 
            checked={checked}
        >
            <input type="checkbox" 
                checked={checked}
                onChange={(e)=>func(e,name)}
            />
            <BoardBoxText textColor="#aaa">
                {name}
            </BoardBoxText>
        </StdCheckBoxWrapper>
    )
}

const StdWidth = 70;

const FormatCheckBoxWrapper = styled.label`
    display: block;
    width: ${StdWidth}px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    & > input{
        display: none;
    }
`;

const StdCheckBoxTitle = styled.div<{textColor:string}>`
    font-size: 12px;
    font-weight: 300;
    color: ${props=>props.textColor};
`;

const StdCheckBoxHole = styled.div<{bg:string,checked:boolean}>`
    position: relative;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background: ${props=> props.checked ? lighten(0.2,props.bg) : props.bg };
    transition: .3s linear;
`;

const StdCheckBoxBall = styled.div<{checked:boolean}>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 50%;
    left: ${props=> props.checked ? (StdWidth-20)+"px" : "0px" };
    transform: translateY(-50%);
    transition: .3s linear;
`;

export const FormatCheckBox:FC<CheckBoxProps> = ({name,checked,func}) =>{
    return(
        <FormatCheckBoxWrapper>
            <input type="checkbox" checked={checked} onChange={(e)=>func(e,name)} />
            <StdCheckBoxTitle textColor="#eee">
                {name}
            </StdCheckBoxTitle>
            <StdCheckBoxHole bg="#3f9759" checked={checked}>
                <StdCheckBoxBall checked={checked}></StdCheckBoxBall>
            </StdCheckBoxHole>
        </FormatCheckBoxWrapper>
    )
}