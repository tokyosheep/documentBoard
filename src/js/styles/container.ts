import styled from "styled-components";

const coverColor = "#111";

export const FileListContainer = {
    Container:styled.div`
        position: relative;
        width:100%;
        height:auto;
    `,
    HeaderCompo:styled.header`
        width:100%;
        height:30px;
        background: ${coverColor};
    `,
    MainListCompo:styled.main`
        height:auto;
        width:100%;
    `,
    FooterCompo:styled.footer`
        height:20px;
        width:100%;
        background: ${coverColor};
    `
}

const ExportSize = {
    width:350,
    height:250
}

export const ExportContainer = {
    Container:styled.div`
        position: relative;
    `,
    HeaderCompo:styled.header`
        width: 100%;
        height: 30px;
        background: rgb(0,0,0);
    `,
    MainCompo:styled.main`
        width: 100%;
        height: 200px;
    `,
    FooterCompo:styled.footer`
        width: 100%;
        height: 20px;
        background: rgb(0,0,0);
    `
}