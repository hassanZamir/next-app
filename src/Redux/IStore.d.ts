// #region Interface Imports
import { IHomePage, ILoginPage, ISignUpPage, IFeedsPage, IProfilePage, IAccountVerifyPage } from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    login: ILoginPage.IStateProps;
    signUp: ISignUpPage.IStateProps;
    feeds: IFeedsPage.IStateProps;
    creatorProfile: IProfilePage.IStateProps;
    accountVerify: IAccountVerifyPage.IStateProps;
}
