import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import reposReducer from "./reposReducer";
import singleRepoReducer from "./singleRepoReducer";
import commitsReducer from "./commitsReducer";
import contributorsReducer from "./contributorsReducer";
import languagesReducer from "./langaugesReducer";

const reducers = combineReducers({
    search: searchReducer,
    user: userReducer,
    repos: reposReducer,
    repo: singleRepoReducer,
    commits: commitsReducer,
    contributors: contributorsReducer,
    languages: languagesReducer
});

export default reducers;