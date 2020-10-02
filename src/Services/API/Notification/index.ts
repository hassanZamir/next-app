// #region Local Imports
import { Http, getQueryParams } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { NotificationModel } from "@Interfaces";
// #endregion Interface Imports

export const NotificationService = {
    GetNotificationStats: async (
        payload: NotificationModel.GetGETNotificationStatsPayload
    ): Promise<NotificationModel.GetGETNotificationStatsResponse> => {
        let response: NotificationModel.GetGETNotificationStatsResponse;
        
        const { userId } = payload;
        try {
            response = await Http.Request<NotificationModel.GetGETNotificationStatsResponse>(
                "GET",
                "/users/" + userId + "/notifications/stats",
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    notifications_unseen_counter: 0,
                    likes_unseen_counter: 1,
                    comments_unseen_counter: 0,
                    conversation_unseen_counter: 0
                }
            };
        }
        return response;
    },
    GetNotifications: async (
        payload: NotificationModel.GetGETNotificationPayload
    ): Promise<NotificationModel.GetGETNotificationResponse> => {
        let response: NotificationModel.GetGETNotificationResponse;
        
        const { userId, ...restPayload } = payload;
        try {
            response = await Http.Request<NotificationModel.GetGETNotificationResponse>(
                "GET",
                "/users/" + userId + "/notifications" + getQueryParams({ ...restPayload }),
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    id: 0,
                    userId: 99,
                    type: 2,
                    commentId: 0,
                    contentId: 0,
                    name: "Soahib Riaz",
                    commentText: "No Text",
                    tipAmount: 0.0,
                    profileImageUrl: "images/db046e30-ddf8-11ea-b6ce-dbe4ded239bd.png",
                    seen: true,
                    timeStamp: "2020-08-26T16:52:10.5433333",
                    msgAmount: 0
                }]
            };
        }
        return response;
    },
    SeenNotification: async (
        payload: NotificationModel.GetSeenNotificationPayload
    ): Promise<NotificationModel.GetSeenNotificationResponse> => {
        let response: NotificationModel.GetSeenNotificationResponse;
        
        try {
            response = await Http.Request<NotificationModel.GetSeenNotificationResponse>(
                "POST",
                "/notifications/notifcationId/seen",
                undefined,
                [...payload.notifications] as any
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    },
    ViewNotifications: async (
        payload: NotificationModel.GetViewNotificationsPayload
    ): Promise<NotificationModel.GetViewNotificationsResponse> => {
        let response: NotificationModel.GetViewNotificationsResponse;
        
        try {
            response = await Http.Request<NotificationModel.GetViewNotificationsResponse>(
                "POST",
                "/users/" + payload.userId + "/notifications/view",
                undefined,
                { type: payload.type }
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    }
}