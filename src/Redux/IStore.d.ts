// #region Interface Imports
import { IHomePage, ILoginPage, ISignUpPage } from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    login: ILoginPage.IStateProps;
    signUp: ISignUpPage.IStateProps;
}
