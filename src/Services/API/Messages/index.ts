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
                "/users/" + "117" + "/recipients" + getQueryParams({ ...rest }),
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
                    userName: "sohaib1"
                }
            };
        }
        return response;
    },
    GetConversation: async (
        payload: MessagesModel.GetGETConversationPayload
    ): Promise<MessagesModel.GetGETConversationResponse> => {
        let response: MessagesModel.GetGETConversationResponse;
        
        const { conversationId } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETConversationResponse>(
                "GET",
                "/user/" + conversationId + "/conversations",
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    id: 5,
                    lastVisited: "2020-09-12T14:17:10.5233333",
                    userId:130,
                    profileImageUrl: "",
                    userName: "",
                    name: "Sohaib Riaz",
                    message: "Hello buddy",
                    participantSeenStatus: true
                }]
            };
        }
        return response;
    },
    CreateMessage: async (
        payload: MessagesModel.GetPOSTCreateMessagePayload
    ): Promise<MessagesModel.GetPOSTCreateMessageResponse> => {
        let response: MessagesModel.GetPOSTCreateMessageResponse;
        
        const { conversationId, ...rest } = payload;
        try {
            response = await Http.Request<MessagesModel.GetPOSTCreateMessageResponse>(
                "POST",
                "/conversation/" + conversationId,
                undefined,
                { ...rest }
            );
        } catch (error) {
            response = {
                status: false,
                response: {
                    id: 5,
                    lastVisited: "2020-09-12T14:17:10.5233333",
                    userId:130,
                    profileImageUrl: "",
                    userName: "",
                    name: "Sohaib Riaz",
                    message: "Hello buddy",
                    participantSeenStatus: true
                }
            };
        }
        return response;
    }
}