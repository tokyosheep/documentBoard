import * as React from "react";
import { useSelector , useDispatch } from "react-redux";
import styled from "styled-components";
import StateType from "../../../redux/stateType";

import { commonBlack , commonWhite } from "../../../styles/commonValues";

import { FileListContainer } from "../../../styles/container";
const { FooterCompo } = FileListContainer;

const FooterInfor = styled.div`
    color: ${commonWhite};
    font-size: 12px;
    text-align: center;
    width: 100%;
`;

const Footer = () =>{
    const documents = useSelector((state:StateType)=>state.documentList);
    return(
        <FooterCompo>
            <FooterInfor>
                opened {documents.length} documents
            </FooterInfor>
        </FooterCompo>
    )
}

export default Footer;