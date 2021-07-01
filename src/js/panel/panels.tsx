
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configStore from "../redux/store/store";

import MainListPanel from "./mainList";

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