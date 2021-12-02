import * as React from "react";
import { FC , useCallback } from "react";
import styled from "styled-components";
import { StdButton } from "../../../components/parts/buttons";

import { DetailsContainer } from "../../styles/container";
const { FooterCompo } = DetailsContainer;

import { getDocuments } from "../../../fileSystem/appAction";
import { loadDocs , replaceLayers } from "../../features/document/documentSlice";
import { useAppDispatch, useAppSelector } from "../../../details/app/hooks";

import { pasteLayer , deleteLayers , closeCheckedDocs } from "../../../fileSystem/detailsActions";
import { saveCheckedDocs } from "../../../fileSystem/saveAction";

const ButtonWrapper = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    & > li{
        margin-left: 5px;
    }
`;


const Footer:FC<{setVisible:React.Dispatch<React.SetStateAction<boolean>>}> = ({setVisible}) =>{
    const dispatch = useAppDispatch();
    const currentDocs = useAppSelector(state=>state.documents.value);
    const getDocs = async() =>{
        const newDocs = await getDocuments();
        dispatch(loadDocs(newDocs));
    }
    const pasteAllLayers = useCallback(() =>{
        (async()=>{
            const newLays = await pasteLayer(currentDocs);
            console.log(newLays);
            dispatch(replaceLayers(newLays));
        })();
    },[currentDocs])
    const deleteCheckedLayers = useCallback(()=>{
        (async()=>{
            const newLays = await deleteLayers(currentDocs);
            console.log(newLays);
            dispatch(replaceLayers(newLays));
        })();
    },[currentDocs]);
    const saveDocs = async()=>{
        saveCheckedDocs(currentDocs)
    } 
    const closeDocs = useCallback(()=>{
        (async()=>{
            const newDocs = await closeCheckedDocs(currentDocs);
            dispatch(loadDocs(newDocs));
        })();
    },[currentDocs]);
    return(
        <FooterCompo>
            <ButtonWrapper>
                <li>
                    <StdButton name="load" func={getDocs} />
                </li>
                <li>
                    <StdButton name="close doc" func={closeDocs} />
                </li>
                <li>
                    <StdButton name="save doc" func={saveDocs} />
                </li>
                <li>
                    <StdButton name="delete layers" func={deleteCheckedLayers} />
                </li>
                <li>
                    <StdButton name="paste Layer" func={pasteAllLayers} />
                </li>
                <li>
                    <StdButton name="export" func={()=>setVisible(true)} />
                </li>
            </ButtonWrapper>
        </FooterCompo>
    )
}

export default Footer;