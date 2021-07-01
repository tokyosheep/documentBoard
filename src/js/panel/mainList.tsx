import * as React from "react";
import { useMemo , useCallback } from "react";
import styled from "styled-components";
import { documents_set } from "../redux/actions/documentActions";
import { createGlobalStyle } from "styled-components";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../redux/stateType";

import { dispatchEvent } from "../fileSystem/init";
import { pickValuesPSDocs } from "../fileSystem/appAction";
import photoshop from "photoshop";

import { FileListContainer } from "../styles/container";
const { Container } = FileListContainer;

import Header from "../components/mainPanel/header/header";
import MainList from "../components/mainPanel/fileList/mainList";
import Footer from "../components/mainPanel/footer/footer";

import { CircleLoad } from "./loading";

import { commonBlack , commonWhite } from "../styles/commonValues";


const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: ${commonBlack};
        color: ${commonWhite};
    }
`;

const Wrapper = styled.div`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow: auto; /* or scroll */
`;

const MainListPanel = () =>{
    const dispatch = useDispatch();
    const documents = useSelector((state:StateType)=>state.documentList);
    const callback = useCallback(() =>{
        const openedDocs = photoshop.app.documents;
        dispatch(documents_set(pickValuesPSDocs(openedDocs)));
    },[documents]);
    useMemo(()=>{
        callback();
        dispatchEvent(callback);
    },[]);
    console.log("ss");
    return(
        <Wrapper>
            <GlobalStyle />
            <CircleLoad />
            <Container>
                <Header />
                <MainList />
                <Footer />
            </Container>
        </Wrapper>
    )
}

export default MainListPanel;