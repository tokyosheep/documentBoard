import * as React from "react";
import { FC } from "react";
import styled from "styled-components";

export const FloatWrapper = styled.div<{isVisible:boolean}>`
    width: 200px;
    height: auto;
    padding: 5px;
    box-sizing:border-box;
    border-radius: 5px;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 20;
    background: #dab438;
    display: ${props=>props.isVisible ? "block" : "none"};
`;

export const DocText = styled.p`
    color: #000;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 5px;
`;

type DocProps = {
    path:string,
    name:string,
    isVisible:boolean,
    click:React.Dispatch<React.SetStateAction<boolean>>
}

const FloatWindow:FC<DocProps> = (doc) =>{
    return(
        <FloatWrapper isVisible={doc.isVisible} onClick={()=>doc.click(false)}>
            <DocText>name :{doc.name}</DocText>
            <DocText>path :{doc.path}</DocText>
        </FloatWrapper>
    )
}

export default FloatWindow;
