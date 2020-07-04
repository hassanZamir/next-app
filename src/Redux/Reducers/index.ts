// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { HomeReducer } from "./home";
import { LoginReducer } from "./Login";
// #endregion Local Imports

export default combineReducers({
    home: HomeReducer,
    login: LoginReducer
});
