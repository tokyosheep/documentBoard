import styled from "styled-components";

const coverColor = "#111";

const size = {
    width:1200,
    height:900
}

export const DetailsContainer = {
    Container:styled.div`
        width: 100%;
        height: 100%;
        display: relative;
    `,
    DocBox:styled.main`
        height: 600px;
        padding-bottom: 100px;
    `,
    DocAside:styled.aside<{visible:boolean}>`
        width: 250px;
        height:100%;
        padding-left: 20px;
        box-sizing: border-box;
        background: #404040;
        position: absolute;
        top: 0;
        right: ${props=>props.visible ? "0px" : "-100%"};
        z-index: 10;
    `,
    FooterCompo:styled.footer`
        position: absolute;
        left: 0;
        bottom: 0px;
        display: block;
        width: 100%;
        height: 50px;
        background: #2c2c2c;
        z-index: 15;
    `
}