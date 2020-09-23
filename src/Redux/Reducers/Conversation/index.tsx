// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IConversationPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IConversationPage.IStateProps = {
    conversation: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0,
        errors: ['']
    }
};

export const ConversationReducer = (
        state = INITIAL_STATE,
        action: IAction<IConversationPage.Actions.IMapGetConversation
            & IConversationPage.Actions.IMapCreateMessage> 
) => {
    switch (action.type) {
        case ActionConsts.Conversation.BuyMessageSuccess: {
            const { conversationMessage } = action.payload!;

            return Object.assign({}, state, {
                conversation: {
                    values: state.conversation.values.map((msg) => {
                        if (msg.id === conversationMessage.id)
                            return conversationMessage
                        return msg;
                    }),
                    paginationNo: state.conversation.paginationNo,
                    emptyPaginationNo: state.conversation.emptyPaginationNo
                }
                // conversation: {
                //     values: [...state.conversation.values, conversationMessage],
                //     paginationNo: state.conversation.paginationNo,
                //     emptyPaginationNo: state.conversation.emptyPaginationNo
                // }
            });
        }
        case ActionConsts.Conversation.BuyMessageError: {
            const { conversationMessage } = action.payload!;

            return Object.assign({}, state, {
                conversation: {
                    values: state.conversation.values,
                    paginationNo: state.conversation.paginationNo,
                    emptyPaginationNo: state.conversation.emptyPaginationNo
                }
            });
        }
        case ActionConsts.Conversation.PusherMessageRecieved: {
            const { conversationMessage } = action.payload!;

            return Object.assign({}, state, {
                conversation: {
                    values: [...state.conversation.values, conversationMessage],
                    paginationNo: state.conversation.paginationNo,
                    emptyPaginationNo: state.conversation.emptyPaginationNo
                }
            });
        }
        case ActionConsts.Conversation.CreateMessageSuccess: {
            const { conversationMessage } = action.payload!;

            return Object.assign({}, state, {
                conversation: {
                    values: [...state.conversation.values, conversationMessage],
                    paginationNo: state.conversation.paginationNo,
                    emptyPaginationNo: state.conversation.emptyPaginationNo
                }
            });
        }
        case ActionConsts.Conversation.CreateMessageError: {
            return Object.assign({}, state, {
                conversation: {
                    values: state.conversation.values,
                    paginationNo: state.conversation.paginationNo,
                    emptyPaginationNo: state.conversation.emptyPaginationNo
                }
            });
        }
        case ActionConsts.Conversation.GetConversationSuccess: {
            const { conversation, page } = action.payload!;

            if (!page) {
                return Object.assign({}, state, {
                    conversation: {
                        values: [...conversation],
                        paginationNo: page + 1,
                        emptyPaginationNo: conversation.length ? state.conversation.emptyPaginationNo : page
                    }
                });
            }
            
            if (conversation.length) {
                return Object.assign({}, state, {
                    conversation: {
                        values: [...conversation, ...state.conversation.values],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.conversation.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    conversation: {
                        emptyPaginationNo: page,
                        values: state.conversation.values,
                        paginationNo: page
                    }
                });
            }
        }
        case ActionConsts.Conversation.GetConversationError: {
            return Object.assign({}, state, {
                conversation: {
                    ...state.conversation,
                    errors: ['Error getting conversation']
                }
            });   
        }
        default:
            return state;
    }
};