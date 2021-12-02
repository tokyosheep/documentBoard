import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configStore from "./redux/store/store";

import MainListPanel from "./panel/mainList";
import ExportCompo from "./panel/export";

const store = configStore();

export const MainPanel = (node:HTMLElement,root:HTMLDivElement) =>{
    ReactDOM.render(
        <Provider store={store}>
            <MainListPanel />
        </Provider>,
        root
    );
    node.appendChild(root);
}

export const ExportPanel = (node:HTMLElement,root:HTMLDivElement) =>{
    ReactDOM.render(
        <Provider store={store}>
            <ExportCompo />
        </Provider>,
        root
    );
    node.appendChild(root);
}