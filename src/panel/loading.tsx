import * as React from "react";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import StateType from "../redux/stateType";
import styled from "styled-components";

import { centerPlaced } from "../styles/mixin";

const OverLayer = styled.div<{isLoad:boolean}>`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 20;
    background:rgba(0,0,0,0.8);
    display: ${props=> props.isLoad ? "block" : "none"};
`;

const LoadingTitile = styled.div`
    ${centerPlaced};
    color: #fff;
    font-size: 20px;
    font-weight: 200;
`;



export const CircleLoad = () =>{
    const isLoad = useSelector((state:StateType)=>state.loading);
    const isProgress = useSelector((state:StateType)=>state.isProgress);
    return(
        <OverLayer isLoad={isLoad || isProgress}>
            <LoadingTitile >
                Loading.....
            </LoadingTitile>
        </OverLayer>
    )
};