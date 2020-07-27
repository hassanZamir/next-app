import { FEED, USER_SESSION, PAYMENT_USER_SETTINGS, PAYMENT_USER_WALLET, PAYMENT_CARD } from "@Interfaces";

declare namespace IPersistState {
    export interface IStateProps {
        session: USER_SESSION;
        feed: FEED;
    }

    namespace Actions {
        export interface ISetStatusFeed {
            feed: FEED;
        }
        export interface ISetSession {
            session: USER_SESSION;
        }
        export interface IUpdatePaymentInfoInSession {
            paymentSettings: {
                userSettings: PAYMENT_USER_SETTINGS,
                userWallet: PAYMENT_USER_WALLET,
                userCard: PAYMENT_CARD[]
            }
        }
    }
}

export { IPersistState };