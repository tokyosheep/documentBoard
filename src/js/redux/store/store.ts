import { combineReducers , createStore } from "redux";

import { documentList } from "../reducer/documents";
import { loading } from "../reducer/loading";
import { saveFormats } from "../reducer/saveFormats";
import { isProgress } from "../reducer/progress";

const rootReducer = combineReducers({
    documentList,
    loading,
    saveFormats,
    isProgress
});

const configStore = () => createStore(rootReducer);

export default configStore;