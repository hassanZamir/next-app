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
        
        const { userId } = payload;
        try {
            response = await Http.Request<MessagesModel.GetGETAllMessagesResponse>(
                "GET",
                "/users/" + userId + "/messages",
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    id: 0,
                    username: "",
                    name: "",
                    profilePic: "",
                    message: "",
                    lastUpdated: "",
                    participantSeenStatus: false
                }]
            };
        }
        return response;
    }
}