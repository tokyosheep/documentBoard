import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { commonBlack } from "../styles/commonValues";
import { store } from "./app/store";
import { Provider } from "react-redux";

import Layout from "./panel/layout";

const GlobalStyle = createGlobalStyle<{bg:string}>`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: ${props=>props.bg};
    }   
`;

export const DetailPanel = (node:HTMLElement,root:HTMLDivElement) =>{
    ReactDOM.render(
            <Provider store={store}>
                <GlobalStyle bg={commonBlack} />
                <Layout />
            </Provider>
        ,
        root
    )
    node.appendChild(root);
}



