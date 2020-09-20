// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IMessagesPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IMessagesPage.IStateProps = {
    messageRecipients: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0,
        errors: ['']
    },
    allMessages: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0,
        errors: ['']
    }
};

export const MessagesReducer = (
        state = INITIAL_STATE,
        action: IAction<IMessagesPage.Actions.IMapAllMessages &
            IMessagesPage.Actions.IMapMessageRecipients &
            IMessagesPage.Actions.IMapNewConversationRecieved>
    ) => {
    switch (action.type) {
        case ActionConsts.Messages.NewConversationRecieved: {
            const { conversation } = action.payload!;

            const existConversation = state.allMessages.values.filter((message, i) => {
                return message.id === conversation.id
            });

            if (existConversation.length <= 0) {
                return Object.assign({}, state, {
                    allMessages: {
                        values: [conversation, ...state.allMessages.values],
                        emptyPaginationNo: state.allMessages.emptyPaginationNo,
                        paginationNo: state.allMessages.paginationNo
                    }
                });
            }
            return state;
        }
        case ActionConsts.Messages.GetAllMessagesSuccess: {
            const { allMessages, page } = action.payload!;

            if (!page) {
                return Object.assign({}, state, {
                    allMessages: {
                        values: allMessages,
                        paginationNo: page + 1,
                        emptyPaginationNo: allMessages.length ? state.allMessages.emptyPaginationNo : page
                    }
                });
            }
            
            if (allMessages.length) {
                return Object.assign({}, state, {
                    allMessages: {
                        values: [...state.allMessages.values, ...allMessages],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.allMessages.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    allMessages: {
                        emptyPaginationNo: page,
                        values: state.allMessages.values,
                        paginationNo: page
                    }
                });
            }
        }
        case ActionConsts.Messages.GetAllMessagesError: {
            return Object.assign({}, state, {
                allMessages: {
                    ...state.allMessages,
                    errors: ['Error getting message list']
                }
            });   
        }
        case ActionConsts.Messages.GetMessagesRecipientsSuccess: {
            const { messageRecipients, page } = action.payload!;

            if (!page) {
                return Object.assign({}, state, {
                    messageRecipients: {
                        values: [...messageRecipients],
                        paginationNo: page + 1,
                        emptyPaginationNo: messageRecipients.length ? state.allMessages.emptyPaginationNo : page
                    }
                });
            }
            
            if (messageRecipients.length) {
                return Object.assign({}, state, {
                    messageRecipients: {
                        values: [...state.messageRecipients.values, ...messageRecipients],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.messageRecipients.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    messageRecipients: {
                        emptyPaginationNo: page,
                        values: state.messageRecipients.values,
                        paginationNo: page
                    }
                });
            }
        }
        case ActionConsts.Messages.GetMessagesRecipientsError: {
            return Object.assign({}, state, {
                messageRecipients: {
                    ...state.allMessages,
                    errors: ['Error getting message recipients']
                }
            });   
        }
        default:
            return state;
    }
};
