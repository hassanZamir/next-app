// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { FeedsModel } from "@Interfaces";
// #endregion Interface Imports

export const FeedsService = {
    GetAllFeeds: async (
        payload: FeedsModel.GetAllFeedsPayload
    ): Promise<FeedsModel.GetAllFeedsResponse> => {
        let response: FeedsModel.GetAllFeedsResponse

        try {
            response = await Http.Request<FeedsModel.GetAllFeedsResponse>(
                "GET",
                "/user/feeds",
                undefined
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: "false",
                feeds: [{
                    id: 1,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png"
                }, {
                    id: 1,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png"
                }, {
                    id: 1,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png"
                }, {
                    id: 1,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png"
                }],
                errors: "Something went wrong"
            };
        }
        return response;
    }
};
