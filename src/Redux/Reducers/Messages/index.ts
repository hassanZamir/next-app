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
        searchValues: [],
        paginationNo: 0,
        errors: ['']
    },
    allMessages: {
        emptyPaginationNo: 9999,
        values: [],
        searchValues: [],
        paginationNo: 0,
        errors: ['']
    }
};

export const MessagesReducer = (
        state = INITIAL_STATE,
        action: IAction<IMessagesPage.Actions.IMapAllMessages &
            IMessagesPage.Actions.IMapMessageRecipients &
            IMessagesPage.Actions.IMapNewConversationRecieved &
            IMessagesPage.Actions.IMapSearchMessages>
    ) => {
    switch (action.type) {
        case ActionConsts.Messages.SerachMessagesSuccess: {
            const { searchResult, type } = action.payload!;

            if (searchResult.length > 0) {
                if (type === 1) {
                    return Object.assign({}, state, {
                        allMessages: {
                            ...state.allMessages,
                            searchValues: searchResult
                        }
                    });
                } else {
                    return Object.assign({}, state, {
                        messageRecipients: {
                            ...state.messageRecipients,
                            searchValues: searchResult
                        }
                    });
                }
            } else {
                return state;
            }
        }
        case ActionConsts.Messages.SerachMessagesError: {
            return state;
        }
        case ActionConsts.Messages.ClearSearch: {
            return Object.assign({}, state, {
                allMessages: {
                    ...state.allMessages,
                    searchValues: []
                },
                messageRecipients: {
                    ...state.messageRecipients,
                    searchValues: []
                }
            });
        }
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
                        paginationNo: state.allMessages.paginationNo,
                        searchValues: state.allMessages.searchValues
                    }
                });
            } else {
                const restMessages = state.allMessages.values.filter((message, i) => {
                    return message.id !== conversation.id
                });
                const updatedConversation = Object.assign({}, conversation, {
                    ...conversation,
                    profileImageUrl: existConversation[0].profileImageUrl
                });
                return Object.assign({}, state, {
                    allMessages: {
                        values: [updatedConversation, ...restMessages],
                        emptyPaginationNo: state.allMessages.emptyPaginationNo,
                        paginationNo: state.allMessages.paginationNo,
                        searchValues: state.allMessages.searchValues
                    }
                });
            }
        }
        case ActionConsts.Messages.GetAllMessagesSuccess: {
            const { allMessages, page } = action.payload!;

            if (!page) {
                return Object.assign({}, state, {
                    allMessages: {
                        searchValues: state.allMessages.searchValues,
                        values: allMessages,
                        paginationNo: page + 1,
                        emptyPaginationNo: allMessages.length ? state.allMessages.emptyPaginationNo : page
                    }
                });
            }
            
            if (allMessages.length) {
                return Object.assign({}, state, {
                    allMessages: {
                        searchValues: state.allMessages.searchValues,
                        values: [...state.allMessages.values, ...allMessages],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.allMessages.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    allMessages: {
                        searchValues: state.allMessages.searchValues,
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
                        searchValues: state.messageRecipients.searchValues,
                        values: [...messageRecipients],
                        paginationNo: page + 1,
                        emptyPaginationNo: messageRecipients.length ? state.allMessages.emptyPaginationNo : page
                    }
                });
            }
            
            if (messageRecipients.length) {
                return Object.assign({}, state, {
                    messageRecipients: {
                        searchValues: state.messageRecipients.searchValues,
                        values: [...state.messageRecipients.values, ...messageRecipients],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.messageRecipients.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    messageRecipients: {
                        searchValues: state.messageRecipients.searchValues,
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
                    ...state.messageRecipients,
                    errors: ['Error getting message recipients']
                }
            });   
        }
        default:
            return state;
    }
};
