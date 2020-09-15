import { FEED, USER_SESSION, PAYMENT_USER_SETTINGS, PAYMENT_USER_WALLET, 
        PAYMENT_CARD, NOTIFICATION_STATS, MESSAGE_LIST_ITEM } from "@Interfaces";

declare namespace IPersistState {
    export interface IStateProps {
        session: USER_SESSION;
        feed: FEED;
        notificationStats: NOTIFICATION_STATS;
        activeConversation: MESSAGE_LIST_ITEM;
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
            conversation: MESSAGE_LIST_ITEM;
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