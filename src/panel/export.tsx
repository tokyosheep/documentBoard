import * as React from "react";
import styled from "styled-components";

import { ExportContainer } from "../styles/container";
const { Container } = ExportContainer;

import ExportHeader from "../components/exportPanel/header/exportHeader";
import ExportMain from "../components/exportPanel/main/exportMain";
import Footer from "../components/exportPanel/footer/footer";

const ExportCompo = () =>{
    return(
        <Container>
            <ExportHeader />
            <ExportMain />
            <Footer />
        </Container>
    )
}

export default ExportCompo;