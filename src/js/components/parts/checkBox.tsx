import * as React from "react";
import styled from "styled-components";
import { darken } from "polished";

import { centerPlaced } from "../../styles/mixin";

export type CheckBoxType = {
    checked:boolean,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void
    ,name:string
}

const stdColor = "#2f4ddf";
const StdWrapper = styled.label<{checked:boolean}>`
    position: relative;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    background: ${props=>props.checked ? darken(0.2,stdColor) : stdColor};
    cursor: pointer;
    & > input{
        display: none;
    }
`;

const StdTitle = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    ${centerPlaced};
`;

export const StdCheckBox:(props:CheckBoxType)=>JSX.Element = ({checked,func,name}) =>{
    return(
        <StdWrapper checked={checked}>
            <input type="checkbox" checked={checked} onChange={(e)=>func(e,name)} />
            <StdTitle>{name}</StdTitle>
        </StdWrapper>
    )
}