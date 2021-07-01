import { combineReducers , createStore } from "redux";

import { documentList } from "../reducer/documents";
import { loading } from "../reducer/loading";

const rootReducer = combineReducers({
    documentList,
    loading
});

const configStore = () => createStore(rootReducer);

export default configStore;