// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
// import { HomeReducer } from "./home";
import { LoginErrorReducer } from "./Login";
import { SignUpReducer } from "./SignUp";
import { FeedsReducer } from "./Feeds";
import { CreatorProfileReducer } from "./CreatorProfile";
import { AccountVerifyReducer } from "./AccountVerify";
import { PersistReducer } from "./PersistReducer";
import { StatusReducer } from "./StatusReducer";
import { PaymentReducer } from "./Payment";
import { BankingInfoReducer } from "./BankingInfo";
import { NotificationReducer } from "./Notification";
import { FollowersInfoReducer } from "./FollowersInfo";
import { FollowingInfoReducer } from "./FollowingInfo";
import { MessagesReducer } from "./Messages";
import { ConversationReducer } from "./Conversation";
import { SettingsReducer } from "./Settings";
import { StatementsReducer } from "./Statements";
// #endregion Local Imports

export default combineReducers({
    loginError: LoginErrorReducer,
    signUp: SignUpReducer,
    feeds: FeedsReducer,
    creatorProfile: CreatorProfileReducer,
    accountVerify: AccountVerifyReducer,
    persistState: PersistReducer,
    statusPage: StatusReducer,
    payment: PaymentReducer,
    bankingInfo: BankingInfoReducer,
    notification: NotificationReducer,
    followersInfo: FollowersInfoReducer,
    followingInfo: FollowingInfoReducer,
    messages: MessagesReducer,
    conversationState: ConversationReducer,
    settings: SettingsReducer,
    statements: StatementsReducer,
});
