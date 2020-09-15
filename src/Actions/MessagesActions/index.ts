// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { MessagesService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IMessagesPage, IConversationPage, IPersistState } from "@Interfaces";
// #endregion Interface Imports

export const MessagesActions = {
    GetAllMessages: (payload: IMessagesPage.Actions.IGetGETAllMessagesPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.GetAllMessages(payload);

        dispatch({
            payload: { 
                allMessages: result.status && result.response ? result.response : [], 
                page: payload.page ? payload.page : 0
            },
            type: result.status && result.response ? ActionConsts.Messages.GetAllMessagesSuccess : ActionConsts.Messages.GetAllMessagesError
        });
    },
    GetMessageRecipients: (payload: IMessagesPage.Actions.IGetGETMessageRecipientsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.GetMessageRecipients(payload);

        dispatch({
            payload: { 
                messageRecipients: result.status && result.response ? result.response : [], 
                page: payload.page ? payload.page : 0
            },
            type: result.status && result.response ? ActionConsts.Messages.GetMessagesRecipientsSuccess : ActionConsts.Messages.GetMessagesRecipientsError
        });
    },
    CreateConversation: (payload: IMessagesPage.Actions.IGetPOSTConversationCreateThreadPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.CreateConversation(payload);
        
        dispatch({
            payload: { conversation: result.status && result.response ? result.response : {} },
            type: result.status && result.response ? ActionConsts.Messages.SetActiveConversationSuccess : ActionConsts.Messages.SetActiveConversationError
        });
    },
    SetConversation: (payload: IPersistState.Actions.ISetActiveConversation) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: payload,
            type: ActionConsts.Messages.SetActiveConversationSuccess
        });
    },
    GetConversation: (payload: IConversationPage.Actions.IGetGETConversationPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.GetConversation(payload);
        
        dispatch({
            payload: { 
                conversation: result.status && result.response ? result.response : [], 
                page: payload.page ? payload.page : 0
            },
            type: result.status && result.response ? ActionConsts.Conversation.GetConversationSuccess : ActionConsts.Conversation.GetConversationError
        });
    },
    CreateMessage: (payload: IConversationPage.Actions.IGetPOSTCreateMessagePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.CreateMessage(payload);
        
        dispatch({
            payload: { conversationMessage: result.status && result.response ? result.response : {} },
            type: result.status && result.response ? ActionConsts.Conversation.CreateMessageSuccess : ActionConsts.Conversation.CreateMessageError
        });
    }
}
