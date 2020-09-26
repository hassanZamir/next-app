// #region Local Imports
import { ActionConsts } from "@Definitions";
import Router from "next/router";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IPersistState, USER_SESSION, FEED, NOTIFICATION_STATS, CONVERSATION_THREAD } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IPersistState.IStateProps = {
    session: <USER_SESSION>{},
    feed: <FEED>{},
    notificationStats: <NOTIFICATION_STATS>{},
    activeConversation: <CONVERSATION_THREAD>{}
};

export const PersistReducer = (
    state = INITIAL_STATE,
    action: IAction<IPersistState.Actions.ISetStatusFeed 
    & IPersistState.Actions.ISetSession 
    & IPersistState.Actions.ISetNotificationStats
    & IPersistState.Actions.IUpdatePaymentInfoInSession
    & IPersistState.Actions.IViewNotificationType
    & IPersistState.Actions.ISetActiveConversation
    & IPersistState.Actions.IUpdateActiveConversation>
) => {
    switch (action.type) {
        case ActionConsts.Conversation.UpdateMessageSettingSuccess: {
            const { apiReducerKey } = action.payload!;

            if (apiReducerKey) {
                const existing = state.activeConversation.conversationSettings[apiReducerKey];
                return Object.assign({}, state, {
                    activeConversation: Object.assign({}, state.activeConversation, {
                        conversationSettings: {
                            ...state.activeConversation.conversationSettings,
                            [apiReducerKey]: !existing
                        }
                    })
                });
            } else {
                return state;
            }
        }
        case ActionConsts.Messages.SetActiveConversationSuccess: {
            const { conversation } = action.payload!;
            Router.push("/message/" + conversation.id, "/message/" + conversation.id);

            console.log("activeConversation : ", conversation);
            return Object.assign({}, state, {
                activeConversation: conversation
            });
        }
        case ActionConsts.Messages.SetActiveConversationError: {
            return Object.assign({}, state, {
                activeConversation: {}
            });
        }
        case ActionConsts.Notifications.GetNotifiactionStatsSuccess: {
            const { notificationStats } = action.payload!;
            return Object.assign({}, state, {
                notificationStats: notificationStats
            });
        }
        case ActionConsts.Notifications.GetNotifiactionStatsError: {
            return Object.assign({}, state, {
                notificationStats: state.notificationStats
            });
        }
        case ActionConsts.Notifications.PusherNotificationRecieved: {
            return Object.assign({}, state, {
                notificationStats: Object.assign({}, state.notificationStats, {
                    notifications_unseen_counter: state.notificationStats.notifications_unseen_counter + 1
                })
            });
        }
        case ActionConsts.Conversation.PusherMessageRecieved: {
            const { conversationMessage } = action.payload! as any;
            if (!window.location.href.includes('conversation/' + conversationMessage.id)) {
                return Object.assign({}, state, {
                    notificationStats: { 
                        conversation_unseen_counter: state.notificationStats.conversation_unseen_counter + 1 
                    }
                });
            }
            return state;
        }
        case ActionConsts.Conversation.ConversationSeenSuccess: {
            return Object.assign({}, state, {
                notificationStats: { conversation_unseen_counter: 0 }
            });
        }
        case ActionConsts.Notifications.ViewNotificationsSuccess: {
            const { type } = action.payload!;

            return Object.assign({}, state, {
                notificationStats: {
                    notifications_unseen_counter: type === 0 ? 0 : state.notificationStats.notifications_unseen_counter,
                    likes_unseen_counter: type === 2 ? 0 : state.notificationStats.likes_unseen_counter,
                    comments_unseen_counter: type === 3 ? 0 : state.notificationStats.comments_unseen_counter
                }
            });
        }
        case ActionConsts.Feeds.SetPolledPersistFeed: {
            let { feed } = action.payload!;
            
            if ('id' in state.feed && state.feed.id === feed.id) {
                return Object.assign({}, state, {
                    feed: Object.assign({}, feed, {
                        media_url: state.feed.media_url
                    })
                });
            } else {
                return Object.assign({}, state, { feed: feed });
            }
        }
        case ActionConsts.Feeds.SetPersistFeed: {
            let { feed } = action.payload!;

            return Object.assign({}, state, {
                feed: feed
            });
        }
        case ActionConsts.Feeds.ClearPersistFeed: {
            return Object.assign({}, state, {
                feed: {}
            });
        }
        case ActionConsts.Status.UpdatePersistFeedCommentCount: {
            const updatedFeed = Object.assign({}, state.feed, {
                commentsCount: state.feed.commentsCount ? state.feed.commentsCount + 1 : 1
            });
            
            return Object.assign({}, state, {
                feed: updatedFeed
            });
        }
        case ActionConsts.Login.SetUserPayload: {
            let { session } = action.payload!;
            Router.push("/");

            return Object.assign({}, state, {
                session: session
            });
        }
        case ActionConsts.Payment.UpdatePaymentInfoInSession: {
            let { paymentSettings } = action.payload!;
            const defaultCard = paymentSettings.userCard.find((card) => {
                return  paymentSettings.userSettings && card.id === paymentSettings.userSettings.defaultCard
            });
            return Object.assign({}, state, {
                session: Object.assign({}, state.session, {
                    paymentMode: paymentSettings.userSettings ? paymentSettings.userSettings.paymentMode : 0,
                    cardNumber: defaultCard ? defaultCard.cardNumber : '',
                    cardTitle: defaultCard ? defaultCard.cardTitle : ''
                })
            });
        }
        case ActionConsts.Payment.OnBecomeCreatorSuccess: {
            Router.push("/");
            
            return Object.assign({}, state, {
                session: Object.assign({}, state.session, {
                    isCreator: true
                })
            });
        }
        case ActionConsts.Login.DoLogout: {
            Router.push("/login");
            return INITIAL_STATE;
        }
        default:
            return state;
    }
};