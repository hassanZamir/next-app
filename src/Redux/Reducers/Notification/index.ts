// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { INotificationsPage, IAction } from "@Interfaces";
import { NotificationTabs } from "@Components/NotificationComponent/NotificationTabs";
// #endregion Interface Imports

const INITIAL_STATE: INotificationsPage.IStateProps = {
    errors: '',
    notifications: {
        all: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        liked: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        comments: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        subscribed: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        tipped: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        promotions: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        },
        purchases: {
            emptyPaginationNo: 9999,
            values: [],
            paginationNo: 0
        }
    }
};

export const NotificationReducer = (
    state = INITIAL_STATE,
    action: IAction<INotificationsPage.Actions.IMapGetNotificationPayload
        & INotificationsPage.Actions.IMapPusherNotification>
    ) => {
    switch (action.type) {
        case ActionConsts.Notifications.AddPusherNotificationToList: {
            const { notification } = action.payload!;
            const tab = NotificationTabs.filter((tab, i) => {
                return tab.type === notification.type
            })[0];

            if (!tab) return;

            return Object.assign({}, state, {
                notifications: {
                    ...state.notifications,
                    [tab.key]: {
                        values: [notification, ...state.notifications[tab.key].values],
                        paginationNo: state.notifications[tab.key].paginationNo,
                        emptyPaginationNo: state.notifications[tab.key].emptyPaginationNo
                    },
                    all: {
                        values: [notification, ...state.notifications.all.values],
                        paginationNo: state.notifications.all.paginationNo,
                        emptyPaginationNo: state.notifications.all.emptyPaginationNo
                    }
                }
            });

        }
        case ActionConsts.Notifications.GetNotifiactionsSuccess: {
            const { key, notifications, page } = action.payload!;
            
            if (!page) {
                return Object.assign({}, state, {
                    notifications: {
                        ...state.notifications,
                        [key]: {
                            values: [...notifications],
                            paginationNo: page + 1,
                            emptyPaginationNo: state.notifications[key].emptyPaginationNo
                        }
                    }
                });
            }
            
            if (notifications.length) {
                return Object.assign({}, state, {
                    notifications: {
                        ...state.notifications,
                        [key]: {
                            values: [...state.notifications[key].values, ...notifications],
                            paginationNo: page + 1,
                            emptyPaginationNo: state.notifications[key].emptyPaginationNo
                        }
                    }
                });
            } else {
                return Object.assign({}, state, {
                    notifications: {
                        ...state.notifications,
                        [key]: {
                            emptyPaginationNo: page,
                            values: state.notifications[key].values,
                            paginationNo: page
                        }
                    }
                });
            }
        }
        case ActionConsts.Notifications.GetNotifiactionsError: {
            return Object.assign({}, state, {
                errors: 'Error occured get notifications'
            });
        }
        default:
            return state;
    }
};
