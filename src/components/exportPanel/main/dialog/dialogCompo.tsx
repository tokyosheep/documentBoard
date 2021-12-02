import * as React from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

import { centerPlaced } from "../../../../styles/mixin";
import { CautionColorButton } from "../../../parts/buttons";

const DialogWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    top: 30%;
    left: 50%;
    transform: translateX(-50);
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 50px;
    ${centerPlaced};
    display: flex;
    justify-content: space-around;
`;

const GlobalStyle = createGlobalStyle`
    dialog{
        margin: 0;
        padding: 0;
        background: rgb(30,30,30);
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
    }
`;
/*
    dialogに表示するコンポーネント
*/

/*
    dialog.close()ダイアログを閉じて尚且つ閉じた時のメッセージを引数で送れる
*/

const DialogCompo = ({itSelf}) =>{
    return(
        <>
            <GlobalStyle />
            <DialogWrapper>
                <Title>Are you sure to save all documents?</Title>
                <ButtonWrapper>
                    <CautionColorButton name="sure" func={()=>itSelf.close("sure")} ></CautionColorButton>
                    <CautionColorButton name="cancel" func={()=>itSelf.close("no")}></CautionColorButton>
                </ButtonWrapper>
            </DialogWrapper>
        </>
    )
}

export default DialogCompo;