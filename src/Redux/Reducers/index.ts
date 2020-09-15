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
import { MessagesReducer } from "./Messages";
import { ConversationReducer } from "./Conversation";
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
    messages: MessagesReducer,
    conversationState: ConversationReducer
});
