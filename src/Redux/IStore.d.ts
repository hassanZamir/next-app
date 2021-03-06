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
    IBankingInfoPage,
    INotificationsPage,
    IFollowersInfoPage,
    IFollowingInfoPage,
    IMessagesPage,
    IConversationPage,
    ISettingsPage,
    IStatementsPage,
} from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    loginError: ILoginPage.IStateProps;
    signUp: ISignUpPage.IStateProps;
    feeds: IFeedsPage.IStateProps;
    creatorProfile: IProfilePage.IStateProps;
    accountVerify: IAccountVerifyPage.IStateProps;
    statusPage: IStatusPage.IStateProps;
    persistState: IPersistState.IStateProps;
    payment: IPayment.IStateProps;
    bankingInfo: IBankingInfoPage.IStateProps;
    notification: INotificationsPage.IStateProps;
    messages: IMessagesPage.IStateProps;
    conversationState: IConversationPage.IStateProps;
    followersInfo: IFollowersInfoPage.IStateProps;
    followingInfo: IFollowingInfoPage.IStateProps;
    settings: ISettingsPage.IStateProps;
    statements: IStatementsPage.IStateProps;
}
