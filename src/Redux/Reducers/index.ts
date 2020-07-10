// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
// import { HomeReducer } from "./home";
import { LoginReducer } from "./Login";
import { SignUpReducer } from "./SignUp";
import { FeedsReducer } from "./Feeds";
import { CreatorProfileReducer } from "./CreatorProfile";
import { AccountVerifyReducer } from "./AccountVerify";
// #endregion Local Imports

export default combineReducers({
    // home: HomeReducer,
    login: LoginReducer,
    signUp: SignUpReducer,
    feeds: FeedsReducer,
    creatorProfile: CreatorProfileReducer,
    accountVerify: AccountVerifyReducer
});
