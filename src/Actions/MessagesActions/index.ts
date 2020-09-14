// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { MessagesService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IMessagesPage, NOTIFICATION } from "@Interfaces";
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
    CreateConversation: (payload: IMessagesPage.Actions.IGetPOSTConversationCreateThreadPayload) => async () => {
        const result = await MessagesService.CreateConversation(payload);
        return result;
    }
}
