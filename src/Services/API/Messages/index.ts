// #region Local Imports
import { Http, getQueryParams } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { MessagesModel } from "@Interfaces";
// #endregion Interface Imports

export const MessagesService = {
    GetAllMessages: async (
        payload: MessagesModel.GetGETAllMessagesPayload
    ): Promise<MessagesModel.GetGETAllMessagesResponse> => {
        let response: MessagesModel.GetGETAllMessagesResponse;
        
        const { userId, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETAllMessagesResponse>(
                "GET",
                "/user/" + userId + "/conversations" + getQueryParams({ ...rest }),
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    id: 5,
                    lastVisited: "2020-09-12T14:17:10.5233333",
                    message: "Hello buddy",
                    name: "Sohaib Riaz",
                    participantSeenStatus: true,
                    profileImageUrl: "",
                    userId: 130,
                    userName: "sohaib1"
                }]
            };
        }
        return response;
    },
    GetMessageRecipients: async (
        payload: MessagesModel.GetGETMessageRecipientsPayload
    ): Promise<MessagesModel.GetGETMessageRecipientsResponse> => {
        let response: MessagesModel.GetGETMessageRecipientsResponse;
        
        const { userId, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETMessageRecipientsResponse>(
                "GET",
                "/users/" + userId + "/recipients" + getQueryParams({ ...rest }),
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    id: 118,
                    name: "venotest2",
                    userName: "venotest2",
                    profileImageUrl: "images/c106f040-e959-11ea-8146-29d65498973d.17?sv=2018-03-28&sr=b&sig=srPW3Ku6gvkPy9jNX5oGezLs9AEHTfGQ5O0w%2BhP4eEc%3D&st=2020-09-14T17%3A15%3A07Z&se=2020-09-14T17%3A20%3A07Z&sp=r"
                }]
            };
        }
        return response;
    },
    CreateConversation: async (
        payload: MessagesModel.GetPOSTConversationCreateThreadPayload
    ): Promise<MessagesModel.GetPOSTConversationCreateThreadResponse> => {
        let response: MessagesModel.GetPOSTConversationCreateThreadResponse;
        
        try {
            response = await Http.Request<MessagesModel.GetPOSTConversationCreateThreadResponse>(
                "POST",
                "/conversation/create-thread",
                undefined,
                {...payload}
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    id: 5,
                    lastVisited: "2020-09-12T14:17:10.5233333",
                    message: "Hello buddy",
                    name: "Sohaib Riaz",
                    participantSeenStatus: true,
                    profileImageUrl: "",
                    userId: 130,
                    userName: "sohaib1",
                    conversationSettings: {
                        favourite: true,
                        isBlocked: false,
                        isRestricted: false,
                        isFollower: false
                    }
                }
            };
        }
        return response;
    },
    GetConversation: async (
        payload: MessagesModel.GetGETConversationPayload
    ): Promise<MessagesModel.GetGETConversationResponse> => {
        let response: MessagesModel.GetGETConversationResponse;
        
        const { userName, conversationId, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETConversationResponse>(
                "GET",
                "/users/" + userName + "/conversation/" + conversationId + getQueryParams({ ...rest }),
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    conversationId: 14,
                    id: 11,
                    message: "ass",
                    recipientId: 0,
                    senderId: 112,
                    sentAt: "2020-08-16T00:00:00",
                    type: 1
                }]
            };
        }
        return response;
    },
    CreateMessage: async (
        payload: MessagesModel.GetPOSTCreateMessagePayload
    ): Promise<MessagesModel.GetPOSTCreateMessageResponse> => {
        let response: MessagesModel.GetPOSTCreateMessageResponse;

        const { conversationId, meta, senderId, type, message, sentAt } = payload;
        let _payload = {};
        if (type > 1 && type < 4) {
            _payload = {
                senderId: senderId,
                type: type,
                message: message,
                sentAt: sentAt,
                meta: meta
            }
        } else {
            _payload = {
                senderId: senderId,
                type: type,
                message: message,
                sentAt: sentAt
            }
        }
        try {
            response = await Http.Request<MessagesModel.GetPOSTCreateMessageResponse>(
                "POST",
                "/conversation/" + conversationId,
                undefined,
                _payload
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    id: 2,
                    recipientId: 112,
                    conversationId: 14,
                    senderId: 117,
                    type: 3,
                    message: "hello",
                    sentAt: "2020-08-21",
                    meta: {
                        amount: 12,
                        tipMsg: "optional msg send by user",
                        tipId: 11,
                        userId: 135
                    }
                }
            };
        }
        return response;
    },
    ConversationSeen: async (
        payload: MessagesModel.GetPOSTConversationSeenPayload
    ): Promise<MessagesModel.GetPOSTConversationSeenResponse> => {
        let response: MessagesModel.GetPOSTConversationSeenResponse;
        
        try {
            response = await Http.Request<MessagesModel.GetPOSTConversationSeenResponse>(
                "POST",
                "/conversation/seen",
                undefined,
                { ...payload }
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    },
    BuyMessage: async (
        payload: MessagesModel.GetPOSTBuyMessagePayload
    ): Promise<MessagesModel.GetPOSTBuyMessageResponse> => {
        let response: MessagesModel.GetPOSTBuyMessageResponse;

        const { messageId, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetPOSTBuyMessageResponse>(
                "POST",
                "/conversation-message/" + messageId + "/buy",
                undefined,
                { ...rest }
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    id: 2,
                    recipientId: 112,
                    conversationId: 14,
                    senderId: 117,
                    type: 3,
                    message: "hello",
                    sentAt: "2020-08-21",
                    meta: {
                        amount: 12,
                        tipMsg: "optional msg send by user",
                        tipId: 11,
                        userId: 135
                    }
                }
            };
        }
        return response;
    },
    UpdateMessageSetting: async (
        payload: MessagesModel.GetPOSTMessageSettingPayload
    ): Promise<MessagesModel.GetPOSTMessageSettingResponse> => {
        let response: MessagesModel.GetPOSTMessageSettingResponse;

        const { userName, apiRouteKey, ...recipientUsername } = payload;
        try {
            response = await Http.Request<MessagesModel.GetPOSTMessageSettingResponse>(
                "POST",
                "/users/" + userName + "/" + apiRouteKey,
                undefined,
                { ...recipientUsername }
            );
        } catch (error) {
            response = { status: false };
        }
        return response;
    },
    UpdateViewStatus: async (
        payload: MessagesModel.GetPOSTUpdateViewStatusPayload
    ): Promise<MessagesModel.GetPOSTUpdateViewStatusResponse> => {
        let response: MessagesModel.GetPOSTUpdateViewStatusResponse;

        const { messageId } = payload;
        try {
            response = await Http.Request<MessagesModel.GetPOSTUpdateViewStatusResponse>(
                "POST",
                "/conversation-messages/" + messageId + "/view",
                undefined
            );
        } catch (error) {
            response = { 
                status: false,
                response: false
            };
        }
        return response;
    },
    Search: async (
        payload: MessagesModel.GetGETSearchMessagesPayload
    ): Promise<MessagesModel.GetGETSearchMessagesResponse> => {
        let response: MessagesModel.GetGETSearchMessagesResponse;

        const { username, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETSearchMessagesResponse>(
                "GET",
                "/users/" + username + "/conversation/search" + getQueryParams({ ...rest }),
                undefined
            );
        } catch (error) {
            response = { 
                status: true,
                response: [{
                    id: 118,
                    name: "venotest2",
                    userName: "venotest2",
                    profileImageUrl: "images/c106f040-e959-11ea-8146-29d65498973d.17?sv=2018-03-28&sr=b&sig=srPW3Ku6gvkPy9jNX5oGezLs9AEHTfGQ5O0w%2BhP4eEc%3D&st=2020-09-14T17%3A15%3A07Z&se=2020-09-14T17%3A20%3A07Z&sp=r"
                }]
            };
        }
        return response;
    }
}