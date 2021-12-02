import * as React from "react";
import { useAppSelector } from "../../../details/app/hooks";
import styled from "styled-components";

import DocumentBox from "./docmentBox/docBox";
import { DetailsContainer } from "../../styles/container";
const { DocBox } = DetailsContainer;


const ListWrapper = styled.ul`
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
    overflow: scroll;
`;

const DocmentCompo = () =>{
    const documents = useAppSelector(state=>state.documents.value);
    const docList = documents.map(doc=>{
        return(
            <DocumentBox {...doc} key={doc.id} />
        )
    })
    return(
        <DocBox>
            <ListWrapper>
                {docList}
            </ListWrapper>
        </DocBox>
    )
}

export default DocmentCompo;