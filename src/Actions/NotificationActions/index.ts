// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { NotificationService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { INotificationsPage, NOTIFICATION } from "@Interfaces";
// #endregion Interface Imports

export const NotificationActions = {
    AddPusherNotificationToList: (payload: NOTIFICATION) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: {notification: payload},
            type: ActionConsts.Notifications.AddPusherNotificationToList
        });
    },
    GetNotificationStats: (payload: INotificationsPage.Actions.IGetGETNotificationStatsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await NotificationService.GetNotificationStats(payload);

        dispatch({
            payload: {notificationStats: result.status && result.response ? result.response : {}},
            type: result.status && result.response ? ActionConsts.Notifications.GetNotifiactionStatsSuccess : ActionConsts.Notifications.GetNotifiactionStatsError
        });
    },
    PusherNotificationRecieved: (payload: any) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: true,
            type: ActionConsts.Notifications.PusherNotificationRecieved
        });
    },
    GetNotification: (payload: INotificationsPage.Actions.IGetGETNotificationPayload) => async (
        dispatch: Dispatch
    ) => {
        const { key, ...rest } = payload;
        const result = await NotificationService.GetNotifications({ ...rest });

        dispatch({
            payload: { 
                notifications: result.status && result.response ? result.response : [], 
                key: key, 
                page: payload.page
            },
            type: result.status && result.response ? ActionConsts.Notifications.GetNotifiactionsSuccess : ActionConsts.Notifications.GetNotifiactionsError
        });
    },
    SeenNotification: (payload: INotificationsPage.Actions.IGetSeenNotificationPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await NotificationService.SeenNotification(payload);

        dispatch({
            payload: result.status ? true : false,
            type: result.status ? ActionConsts.Notifications.SeenNotifiactionSuccess : ActionConsts.Notifications.SeenNotifiactionError
        });
    },
    ViewNotifications: (payload: INotificationsPage.Actions.IGetViewNotificationsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await NotificationService.ViewNotifications(payload);

        dispatch({
            payload: {type: result.status ? payload.type : -1},
            type: result.status ? ActionConsts.Notifications.ViewNotificationsSuccess : ActionConsts.Notifications.ViewNotificationsError
        });
    }
}
