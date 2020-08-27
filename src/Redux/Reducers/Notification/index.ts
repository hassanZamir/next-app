// #region Local Imports
import { ActionConsts } from "@Definitions";
import Router from "next/router";
// #endregion Local Imports

// #region Interface Imports
import { INotificationsPage, IAction } from "@Interfaces";
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
    action: IAction<INotificationsPage.Actions.IMapGetNotificationPayload>
    ) => {
    switch (action.type) {
        case ActionConsts.Notifications.GetNotifiactionsSuccess: {
            const { key, notifications, page } = action.payload!;
            
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
