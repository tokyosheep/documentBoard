import * as React from "react";
import styled from "styled-components";

import { ExportContainer } from "../../../styles/container";
const { HeaderCompo } = ExportContainer;

const HeaderTitle = styled.h1`
    font-size: 15px;
    font-weight: 300;
    color: #fff;
    margin: 5px;
`;

const ExportHeader = () =>{
    return(
        <HeaderCompo >
            <HeaderTitle>export</HeaderTitle>
        </HeaderCompo>
    )
}

export default ExportHeader;