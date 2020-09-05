import { NotificationModel, NOTIFICATION } from "@Interfaces";

declare namespace INotificationsPage {
    export interface IProps {}
    
    export interface IStateProps {
        notifications: {
            all: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            liked: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            comments: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            subscribed: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            tipped: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            promotions: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            purchases: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            },
            [key: string]: {
                emptyPaginationNo: number,
                values: NOTIFICATION[],
                paginationNo: number
            };
        },
        errors: string
    }

    namespace Actions {
        export interface IMapGetNotificationPayload {
            error: string;
            notifications: NOTIFICATION[],
            key: string,
            page: number
        }

        export interface IMapPusherNotification {
            notification: NOTIFICATION
        }

        export interface IGetGETNotificationPayload extends NotificationModel.GetGETNotificationPayload {}
        export interface IGetGETNotificationResponse extends NotificationModel.GetGETNotificationResponse {}

        export interface IGetGETNotificationStatsPayload extends NotificationModel.GetGETNotificationStatsPayload {}
        export interface IGetGETNotificationStatsResponse extends NotificationModel.GetGETNotificationStatsResponse {}

        export interface IGetSeenNotificationPayload extends NotificationModel.GetSeenNotificationPayload {}
        export interface IGetSeenNotificationResponse extends NotificationModel.GetSeenNotificationResponse {}

        export interface IGetViewNotificationsPayload extends NotificationModel.GetViewNotificationsPayload {}
        export interface IGetViewNotificationsResponse extends NotificationModel.GetViewNotificationsResponse {}
    }
}

export { INotificationsPage };
