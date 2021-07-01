import * as React from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../../redux/stateType";
import styled from "styled-components";
import photoshop from "photoshop";
import { pickValuesPSDocs } from "../../../../fileSystem/appAction";
import { documents_set } from "../../../../redux/actions/documentActions";
import { loading_switch } from "../../../../redux/actions/loadingAction";

import { DocumentData } from "../../../../redux/reducer/documents";
import { commonBlack , commonWhite } from "../../../../styles/commonValues";
import { StdButton } from "../../../parts/buttons";

import { lighten } from "polished";
import { saveFile , closeFile , activeDoc } from "../../../../fileSystem/appAction";

const FileBoxWrapper = styled.div`
    width: 200px;
    height: 200px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    border-radius: 5px;
    margin: 5px auto;
    &:hover{
        background: ${lighten(0.2,commonBlack)};
    }
    & > button{
        margin-bottom: 5px;
    }
`;

const FileListTable = styled.div` 

`;

const FileInfo = styled.ul`
    padding: 0;
    list-style:none;
    & > li{
        margin-bottom: 5px;
        color: ${commonWhite};
        font-size: 12px;
        font-weight: 300;
    }
`;

const justAwait:()=>Promise<void> = () =>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },100);
    })
}

const FileBox:(props:DocumentData&{index:number})=>JSX.Element = props =>{
    const dispatch = useDispatch();
    const docs = useSelector((state:StateType)=>state.documentList);
    const save = (index,docs)=> async() =>{
        await justAwait();//間にsettimeOutをおかないとload画面が表示されない
        dispatch(loading_switch(true));
        if(await saveFile(index,docs)){
            const openedDocs = photoshop.app.documents;
            dispatch(documents_set(pickValuesPSDocs(openedDocs)));
            dispatch(loading_switch(false));
        }
    }
    const close = (index,docs)=> async() =>{
        if(closeFile(index,docs)){
            const openedDocs = photoshop.app.documents;
            dispatch(documents_set(pickValuesPSDocs(openedDocs)));
        }
    }
    return(
        <FileBoxWrapper onClick={()=>activeDoc(props.index,docs)}>
            <FileListTable>
                    <FileInfo>
                        <li>name :{props.name}</li>
                    </FileInfo>
                    <FileInfo>
                        <li>path :{props.path}</li>
                    </FileInfo>
                    <FileInfo>
                        <li>width :{props.width}</li>
                    </FileInfo>
                    <FileInfo>
                        <li>height :{props.height}</li>
                    </FileInfo>
            </FileListTable>
            <StdButton name="save" func={save(props.index,docs)}/>
            <StdButton name="close" func={close(props.index,docs)}/>
        </FileBoxWrapper>
    )
}

export default FileBox;