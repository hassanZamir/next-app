// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { MessagesService, FeedsService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IMessagesPage, IConversationPage, IPersistState, CONVERSATION_RESPONSE, MESSAGE_LIST_ITEM } from "@Interfaces";
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
        let uploadResult = null;
        uploadResult = payload.type === 2 ? await FeedsService.UploadMediaOnStorage({ media_url: payload.meta!.media_urls, blur: true }) : null;
        
        if (uploadResult && !uploadResult.status && payload.type === 2) {
            dispatch({
                payload: "Media upload failed",
                type: ''
            });
            return;
        }

        let result: any = { status: false, response: null};
        if (payload.type === 2) {
            result = await MessagesService.CreateMessage(Object.assign({}, payload, {
                meta: {
                    media_urls: uploadResult!.uploadSuccess,
                    purchase_status: payload.meta!.purchase_status,
                    amount: payload.meta!.amount
                }
            }));
        } else {
            result = await MessagesService.CreateMessage(payload);
        }

        dispatch({
            payload: { conversationMessage: result.status && result.response ? result.response : {} },
            type: result.status && result.response ? ActionConsts.Conversation.CreateMessageSuccess : ActionConsts.Conversation.CreateMessageError
        });
        
        if (result.status && result.response) {
            payload.onSuccessScroll();
        }
    },
    MessageRecieved: (payload: CONVERSATION_RESPONSE) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: { conversationMessage: payload },
            type: ActionConsts.Conversation.PusherMessageRecieved
        });
    },
    NewConversationRecieved: (payload: MESSAGE_LIST_ITEM) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: { conversation: payload },
            type: ActionConsts.Messages.NewConversationRecieved
        });
    },
    ConversationSeen: (payload: IConversationPage.Actions.IGetPOSTConversationSeenPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.ConversationSeen(payload);

        dispatch({
            payload: null,
            type: ActionConsts.Conversation.ConversationSeenSuccess
        });
    },
    BuyMessage: (payload: IConversationPage.Actions.IGetPOSTBuyMessagePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.BuyMessage(payload);

        dispatch({
            payload: { conversationMessage: result.status && result.response ? result.response : {} },
            type: result.status && result.response ? ActionConsts.Conversation.BuyMessageSuccess : ActionConsts.Conversation.BuyMessageError
        });
    },
    UpdateMessageSettings: (payload: IConversationPage.Actions.IGetPOSTMessageSettingPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.UpdateMessageSetting(payload);

        dispatch({
            payload: payload,
            type: result ? ActionConsts.Conversation.UpdateMessageSettingSuccess : ActionConsts.Conversation.UpdateMessageSettingError
        });
    },
    UpdateViewStatus: (payload: IConversationPage.Actions.IGetPOSTUpdateViewStatusPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.UpdateViewStatus(payload);

        dispatch({
            payload: null,
            type: result.status && result.response ? ActionConsts.Conversation.UpdateViewStatusSuccess : ActionConsts.Conversation.UpdateViewStatusError
        });
    }
}
