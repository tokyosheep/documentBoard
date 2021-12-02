import * as React from "react";
import {FC} from "react";
import styled from "styled-components";

import { DetailsContainer } from "../../styles/container";
const { DocAside } = DetailsContainer;
import useFormat from "./useFormat/useFomat";
import { FormatCheckBox } from "../parts/checkBoxes";
import { StdButton } from "../../../components/parts/buttons";

import { exportDocuments } from "../../../fileSystem/saveAction";
import { useAppSelector } from "../../../details/app/hooks";

const CheckBoxesWrapper = styled.ul`
    list-style: none;
    padding: 10px;
    margin: 10px 0px;
    & >li{
        margin-bottom: 10px;
    }
`;

const ButtonWrapper = styled.div`
    padding: 10px;
    list-style: none;
    margin-top: 20px;
    & > li{
        margin-bottom: 10px;
    }
`;

const AsideCompo:FC<{visible:boolean,setVisible:React.Dispatch<React.SetStateAction<boolean>>}> = 
    ({visible,setVisible}) =>{
    const currentDocs = useAppSelector(state=>state.documents.value);
    const { formats , setFormats , handleFormat } = useFormat();
    const checkList = Object.entries(formats).map(([key,value])=>{
        return(
            <li key={key}>
                <FormatCheckBox name={key} checked={value} func={handleFormat} />
            </li>
        )
    });
    return(
        <DocAside visible={visible}>
            <CheckBoxesWrapper>
                {checkList}
            </CheckBoxesWrapper>
            <ButtonWrapper>
                <li>
                    <StdButton name="export" func={async()=>await exportDocuments(formats,currentDocs)} />
                </li>
                <li>
                    <StdButton name="close" func={()=>setVisible(false)} />
                </li>
            </ButtonWrapper>
        </DocAside>
    )
}

export default AsideCompo;