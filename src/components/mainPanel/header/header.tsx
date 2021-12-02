import * as React from "react";
import styled from "styled-components";
import { commonBlack , commonWhite } from "../../../styles/commonValues";
const Titlte = styled.h1`
    color: ${commonWhite};
    font-size: 15px;
    margin: 4px;
`;

import { FileListContainer } from "../../../styles/container";
const { HeaderCompo } = FileListContainer;

const Header = () =>{
    return(
        <HeaderCompo>
            <Titlte>Document Board</Titlte>
        </HeaderCompo>
    )
}

export default Header;