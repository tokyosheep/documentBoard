import * as React from "react";
import styled from "styled-components";
import {FC} from "react";

import { FloatWrapper , DocText } from "../floatWIndow/floatWindow";
import { LayerData } from "../../../../features/document/documentSlice";


const LayerFloat = styled(FloatWrapper)`
    top: 70px;
    left: 0px;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
`;

export type LayerFloat = LayerData&{isWindowVisible:boolean}

const LayerFloatWindow:FC<LayerFloat> = layer =>{
    return(
        <LayerFloat isVisible={layer.isWindowVisible} >
            <DocText>name :{layer.name}</DocText>
            <DocText>kind :{layer.typename}</DocText>
        </LayerFloat>
    )
}

export default LayerFloatWindow;