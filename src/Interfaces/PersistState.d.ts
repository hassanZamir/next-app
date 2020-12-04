import {
    FEED, USER_SESSION, PAYMENT_USER_SETTINGS, PAYMENT_USER_WALLET,
    PAYMENT_CARD, NOTIFICATION_STATS, CONVERSATION_THREAD
} from "@Interfaces";

declare namespace IPersistState {
    export interface IStateProps {
        session: USER_SESSION;
        feed: FEED;
        notificationStats: NOTIFICATION_STATS;
        activeConversation: CONVERSATION_THREAD;
        statusFound: boolean; // sets to false in case GetFeed failed to load status 
    }

    namespace Actions {
        export interface IViewNotificationType {
            type: number;
        }
        export interface ISetStatusFeed {
            feed: FEED;
        }
        export interface ISetSession {
            session: USER_SESSION;
        }
        export interface ISetNotificationStats {
            notificationStats: NOTIFICATION_STATS;
        }
        export interface ISetActiveConversation {
            conversation: CONVERSATION_THREAD;
        }
        export interface IUpdateActiveConversation {
            apiReducerKey: string
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