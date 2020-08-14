// #region Interface Imports
import { 
    IHomePage, 
    ILoginPage, 
    ISignUpPage,
    IFeedsPage, 
    IProfilePage, 
    IAccountVerifyPage, 
    IPersistState,
    IStatusPage,
    IPayment,
    IBankingInfoPage
} from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    // loginSuccess: ILoginPage.IStateProps;
    loginError: ILoginPage.IStateProps;
    signUp: ISignUpPage.IStateProps;
    feeds: IFeedsPage.IStateProps;
    creatorProfile: IProfilePage.IStateProps;
    accountVerify: IAccountVerifyPage.IStateProps;
    statusPage: IStatusPage.IStateProps;
    persistState: IPersistState.IStateProps;
    payment: IPayment.IStateProps;
    bankingInfo: IBankingInfoPage;
}
