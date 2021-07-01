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