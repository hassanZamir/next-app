// #region Interface Imports
import { GETNotificationPayload, GETNotificationResponse, SeenNotificationPayload, 
    SeenNotificationResponse, ViewNotificationsPayload, ViewNotificationsResponse,
    GETNotificationStatsPayload, GETNotificationStatsResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace NotificationModel {
    export interface GetGETNotificationPayload extends GETNotificationPayload {}
    export interface GetGETNotificationResponse extends GETNotificationResponse {}

    export interface GetGETNotificationStatsPayload extends GETNotificationStatsPayload {}
    export interface GetGETNotificationStatsResponse extends GETNotificationStatsResponse {}

    export interface GetSeenNotificationPayload extends SeenNotificationPayload {}
    export interface GetSeenNotificationResponse extends SeenNotificationResponse {}

    export interface GetViewNotificationsPayload extends ViewNotificationsPayload {}
    export interface GetViewNotificationsResponse extends ViewNotificationsResponse {}
}

export { NotificationModel };