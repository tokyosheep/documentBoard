import * as React from "react";
import { useSelector , useDispatch } from "react-redux";
import styled from "styled-components";

import StateType from "../../../redux/stateType";
import { FileListContainer } from "../../../styles/container";
const { MainListCompo } = FileListContainer;

import FileBox from "./fileBox/fileBox";

const ListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const MainList = () =>{
    const documents = useSelector((state:StateType)=>state.documentList);
    const documentList = documents.map((doc,i)=>{
        return(
            <li key={i}>
                <FileBox 
                    name={doc.name} 
                    path={doc.path} 
                    width={doc.width} 
                    height={doc.height}
                    index={i}
                />
            </li>
        )
    })
    return(
        <MainListCompo>
            <ListWrapper>
                {documentList}
            </ListWrapper>
        </MainListCompo>
    )
}

export default MainList;