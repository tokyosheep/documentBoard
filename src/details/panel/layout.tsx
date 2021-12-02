import * as React from "react";
import { useMemo , useCallback , useState } from "react";

import { dispatchDocAndLayer } from "../../fileSystem/init";

import AsideCompo from "../components/aside/aside";
import Footer from "../components/footer/footer";
import DocmentCompo from "../components/docBox/docCompo";
import { DetailsContainer } from "../styles/container";
const { Container } = DetailsContainer;

import { useAppDispatch, useAppSelector } from "../../details/app/hooks";
import { loadDocs } from "../features/document/documentSlice";
import { getDocuments } from "../../fileSystem/appAction";

const Layout = () =>{
    const dispatch = useAppDispatch();
    const [visibleExportMode,setVisibleExport] = useState<boolean>(false);
    const docs = useAppSelector(state=>state.documents.value);
    const setDocs = useCallback(()=>{
        (async()=>{
            const newDocs = await getDocuments();
            dispatch(loadDocs(newDocs));
        })();
    },[docs]);
    useMemo(()=>{
        setDocs();
        dispatchDocAndLayer(setDocs);
    },[]);
    return(
        <>
            <AsideCompo visible={visibleExportMode} setVisible={setVisibleExport} />
            <Container>
                <DocmentCompo />
            </Container>
            <Footer setVisible={setVisibleExport} />
        </>
    )
}

export default Layout;