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

        const { userId, authtoken, ...rest } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetGETAllMessagesResponse
            >(
                "GET",
                `/users/${userId}/messages${getQueryParams({ ...rest })}`,
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [
                    {
                        id: 0,
                        lastVisited: "",
                        message: "",
                        name: "",
                        participantSeenStatus: true,
                        profileImageUrl: "",
                        userId: 0,
                        userName: "",
                        recipientUserName: "",
                    },
                ],
            };
        }
        return response;
    },
    GetMessageRecipients: async (
        payload: MessagesModel.GetGETMessageRecipientsPayload
    ): Promise<MessagesModel.GetGETMessageRecipientsResponse> => {
        let response: MessagesModel.GetGETMessageRecipientsResponse;

        const { userId, authtoken, ...rest } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetGETMessageRecipientsResponse
            >(
                "GET",
                `/users/${userId}/recipients${getQueryParams({ ...rest })}`,
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [
                    {
                        id: 0,
                        name: "tv",
                        userName: "tv",
                        profileImageUrl:
                            "images/ss-e959-11ea-8146-29d65498973d.17?sv=2018-03-28&sr=b&sig=srPW3Ku6gvkPy9jNX5oGezLs9AEHTfGQ5O0w%2BhP4eEc%3D&st=2020-09-14T17%3A15%3A07Z&se=2020-09-14T17%3A20%3A07Z&sp=r",
                    },
                ],
            };
        }
        return response;
    },
    CreateConversation: async (
        payload: MessagesModel.GetPOSTConversationCreateThreadPayload
    ): Promise<MessagesModel.GetPOSTConversationCreateThreadResponse> => {
        let response: MessagesModel.GetPOSTConversationCreateThreadResponse;
        const {authtoken, ...rest}= payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTConversationCreateThreadResponse
            >(
                "POST",
                "/conversations",
                authtoken,
                undefined,
                { ...rest }
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    id: 0,
                    lastVisited: "",
                    message: "",
                    name: "",
                    participantSeenStatus: true,
                    profileImageUrl: "",
                    userId: 0,
                    userName: "",
                    recipientUserName: "",
                    userConversationSettings: {
                        isFavourite: true,
                        isBlocked: false,
                        isRestricted: false,
                        isFollower: false,
                        state: 1,
                    },
                    creatorConversationSettings: {
                        isFavourite: true,
                        isBlocked: false,
                        isRestricted: false,
                        isFollower: false,
                        state: 1,
                    },
                },
            };
        }
        return response;
    },
    GetConversation: async (
        payload: MessagesModel.GetGETConversationPayload
    ): Promise<MessagesModel.GetGETConversationResponse> => {
        let response: MessagesModel.GetGETConversationResponse;

        const { userName, conversationId, authtoken, ...rest } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetGETConversationResponse
            >(
                "GET",
                `/users/${userName}/conversation/${conversationId}${getQueryParams(
                    { ...rest }
                )}`,
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [
                    {
                        conversationId: 14,
                        id: 11,
                        message: "test",
                        recipientId: 0,
                        senderId: 112,
                        sentAt: "2020-08-16T00:00:00",
                        type: 1,
                    },
                ],
            };
        }
        return response;
    },
    CreateBroadcast: async (
        payload: MessagesModel.GetPOSTCreateBroadcastMessagesPayload
    ): Promise<MessagesModel.GetPOSTCreateBroadcastMessagesResponse> => {
        let response: MessagesModel.GetPOSTCreateBroadcastMessagesResponse;

        const {
            conversationId,
            meta,
            senderId,
            authtoken,
            type,
            message,
            sentAt,
        } = payload.message;
        let _payload = {};
        if (type > 1 && type < 4) {
            _payload = {
                senderId,
                type,
                message,
                sentAt,
                meta,
            };
        } else {
            _payload = {
                senderId,
                type,
                message,
                sentAt,
            };
        }
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTCreateBroadcastMessagesResponse
            >(
                "POST",
                `/broadcasts`,
                authtoken,
                undefined,
                { recipients: payload.recipients, message: payload.message }
            );
        } catch (error) {
            response = {
                status: false,
                response: {}
            };
        }
        return response;
    },
    CreateMessage: async (
        payload: MessagesModel.GetPOSTCreateMessagePayload
    ): Promise<MessagesModel.GetPOSTCreateMessageResponse> => {
        let response: MessagesModel.GetPOSTCreateMessageResponse;

        const {
            conversationId,
            meta,
            senderId,
            authtoken,
            type,
            message,
            sentAt,
        } = payload;
        let _payload = {};
        if (type > 1 && type < 4) {
            _payload = {
                senderId,
                type,
                message,
                sentAt,
                meta,
            };
        } else {
            _payload = {
                senderId,
                type,
                message,
                sentAt,
            };
        }
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTCreateMessageResponse
            >(
                "POST",
                `/conversation/${conversationId}`,
                authtoken,
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
                        userId: 135,
                    },
                },
            };
        }
        return response;
    },
    ConversationSeen: async (
        payload: MessagesModel.GetPOSTConversationSeenPayload
    ): Promise<MessagesModel.GetPOSTConversationSeenResponse> => {
        let response: MessagesModel.GetPOSTConversationSeenResponse;

        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTConversationSeenResponse
            >("POST", "/conversation/seen", payload.authtoken, undefined, {
                ...payload,
            });
        } catch (error) {
            response = {
                status: false,
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
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTBuyMessageResponse
            >(
                "POST",
                `/conversation-message/${messageId}/buy`,
                payload.authtoken,
                undefined,
                {
                    ...rest,
                });
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
                        userId: 135,
                    },
                },
            };
        }
        return response;
    },
    UpdateMessageSetting: async (
        payload: MessagesModel.GetPOSTMessageSettingPayload
    ): Promise<MessagesModel.GetPOSTMessageSettingResponse> => {
        let response: MessagesModel.GetPOSTMessageSettingResponse;

        const { userName, apiRouteKey, authtoken, ...recipientUsername } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTMessageSettingResponse
            >("POST", `/users/${userName}/${apiRouteKey}`, authtoken, undefined, {
                ...recipientUsername,
            });
        } catch (error) {
            response = { status: false };
        }
        return response;
    },
    UpdateViewStatus: async (
        payload: MessagesModel.GetPOSTUpdateViewStatusPayload
    ): Promise<MessagesModel.GetPOSTUpdateViewStatusResponse> => {
        let response: MessagesModel.GetPOSTUpdateViewStatusResponse;

        const { messageId, authtoken } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetPOSTUpdateViewStatusResponse
            >(
                "POST",
                `/conversation-messages/${messageId}/view`,
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: false,
            };
        }
        return response;
    },
    Search: async (
        payload: MessagesModel.GetGETSearchMessagesPayload
    ): Promise<MessagesModel.GetGETSearchMessagesResponse> => {
        let response: MessagesModel.GetGETSearchMessagesResponse;

        const { username, authtoken, ...rest } = payload;
        try {
            response = await Http.UserAuthRequest<
                MessagesModel.GetGETSearchMessagesResponse
            >(
                "GET",
                `/users/${username}/conversation/search${getQueryParams({
                    ...rest,
                })}`,
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
                response: [
                    {
                        id: 118,
                        name: "",
                        userName: "",
                        profileImageUrl:
                            "images/c106f040-e959-11ea-8146-29d65498973d.17?sv=2018-03-28&sr=b&sig=srPW3Ku6gvkPy9jNX5oGezLs9AEHTfGQ5O0w%2BhP4eEc%3D&st=2020-09-14T17%3A15%3A07Z&se=2020-09-14T17%3A20%3A07Z&sp=r",
                    },
                ],
            };
        }
        return response;
    },
};
