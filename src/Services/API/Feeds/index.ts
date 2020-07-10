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
                    mediaUrl: "/images/photo@2x.png",
                    profileImageUrl: "/images/Capture@2x.png",
                    contentLiked: false
                }, {
                    id: 2,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png",
                    profileImageUrl: "/images/Capture@2x.png",
                    contentLiked: false
                }, {
                    id: 3,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png",
                    profileImageUrl: "/images/Capture@2x.png",
                    contentLiked: true
                }, {
                    id: 4,
                    creatorId: 1,
                    type: 1,
                    title: "Hey Response, I am content",
                    username: "Juggenrut",
                    likes: 200,
                    comments: 20,
                    time: "12:30",
                    mediaUrl: "/images/photo@2x.png",
                    profileImageUrl: "/images/Capture@2x.png",
                    contentLiked: true
                }],
                errors: "Something went wrong"
            };
        }
        return response;
    },
    TipFeed: async (
        payload: FeedsModel.GetTipFeedPayload
    ): Promise<FeedsModel.GetTipFeedResponse> => {
        let response: FeedsModel.GetTipFeedResponse

        try {
            response = await Http.Request<FeedsModel.GetTipFeedResponse>(
                "POST",
                "/content/tip",
                undefined,
                {...payload}
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                errors: "Something went wrong"
            };
        }
        return response;
    },
    LikeFeed: async (
        payload: FeedsModel.GetLikeFeedPayload
    ): Promise<FeedsModel.GetLikeFeedResponse> => {
        let response: FeedsModel.GetLikeFeedResponse

        try {
            response = await Http.Request<FeedsModel.GetLikeFeedResponse>(
                "POST",
                "/content/likes",
                undefined,
                {...payload}
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: true,
                errors: "Something went wrong"
            };
        }
        return response;
    }
};
