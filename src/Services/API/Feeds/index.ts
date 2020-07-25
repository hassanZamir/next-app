// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { FeedsModel, ProfilesSuggestionModel } from "@Interfaces";
// #endregion Interface Imports

export const FeedsService = {
    GetProfilesSuggestion: async (
        payload: ProfilesSuggestionModel.GetProfilesSuggestionPayload
    ): Promise<ProfilesSuggestionModel.GetProfilesSuggestionResponse> => {
        let response: ProfilesSuggestionModel.GetProfilesSuggestionResponse

        const getQueryParams = (params: any) => {
            let query = '';
            Object.keys(params).forEach((key, index) => {
                if (!index) query += ('?' + key + '=' + params[key])
                else query += ('&' + key + '=' + params[key])
            });
            return query;
        };
        try {
            console.log("lalad ", getQueryParams(payload));
            response = await Http.Request<ProfilesSuggestionModel.GetProfilesSuggestionResponse>(
                "GET",
                "/profiles/suggestion" + getQueryParams(payload),
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    "name": "Sohaib Riaz",
                    "coverImageUrl": " https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/72227.jpg ",
                    "profileImageUrl": " https://storage.cricingif.com/cig-live-images/user-images/262319.png ",
                    "location": "",
                    "bio": "",
                    "followersCount": 3,
                    "contentCount": 0,
                    "imagesCount": 0,
                    "videosCount": 0,
                    "followingFee": 0.0,
                    "userName": "sohaibminhas789"
                }]
            };
        }
        return response;
    },
    GetAllFeeds: async (
        payload: FeedsModel.GetAllFeedsPayload
    ): Promise<FeedsModel.GetAllFeedsResponse> => {
        let response: FeedsModel.GetAllFeedsResponse

        try {
            response = await Http.Request<FeedsModel.GetAllFeedsResponse>(
                "GET",
                "/users/" + payload.userId + "/feed",
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [{
                    name: "sohaib",
                    username: "venotv1234",
                    profileImageUrl: "/images/Capture@2x.png",
                    content_viewer_like: false,
                    id: 7,
                    title: "My First Post",
                    type: 1,
                    mediaUrl: "https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/72227.jpg ",
                    likesCount: 0,
                    commentsCount: 0,
                    tipsCount: 0,
                    timeStamps: "2020-07-09T09:03:28.8766667"
                }, {
                    name: "sohaib",
                    username: "venotv1234",
                    profileImageUrl: "/images/Capture@2x.png",
                    content_viewer_like: false,
                    id: 7,
                    title: "My First Post",
                    type: 1,
                    mediaUrl: " https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/72227.jpg ",
                    likesCount: 0,
                    commentsCount: 0,
                    tipsCount: 0,
                    timeStamps: "2020-07-09T09:03:28.8766667"
                }, {
                    name: "sohaib",
                    username: "venotv1234",
                    profileImageUrl: "/images/Capture@2x.png",
                    content_viewer_like: false,
                    id: 7,
                    title: "My First Post",
                    type: 1,
                    mediaUrl: " https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/72227.jpg ",
                    likesCount: 0,
                    commentsCount: 0,
                    tipsCount: 0,
                    timeStamps: "2020-07-09T09:03:28.8766667"
                }, {
                    name: "sohaib",
                    username: "venotv1234",
                    profileImageUrl: "/images/Capture@2x.png",
                    content_viewer_like: false,
                    id: 7,
                    title: "My First Post",
                    type: 1,
                    mediaUrl: " https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/72227.jpg ",
                    likesCount: 0,
                    commentsCount: 0,
                    tipsCount: 0,
                    timeStamps: "2020-07-09T09:03:28.8766667"
                }]
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
                "/profiles/" + payload.creatorUserName + "/tip",
                undefined,
                {
                    viewerId: payload.viewerId, 
                    amount: payload.amount, 
                    message: payload.message, 
                    contentId: payload.contentId ? payload.contentId : 0 
                }
            );
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
                "/content/" + payload.contentId + "/like",
                undefined,
                {userId: payload.userId}
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    },
    UnLikeFeed: async (
        payload: FeedsModel.GetLikeFeedPayload
    ): Promise<FeedsModel.GetLikeFeedResponse> => {
        let response: FeedsModel.GetLikeFeedResponse

        try {
            response = await Http.Request<FeedsModel.GetLikeFeedResponse>(
                "DELETE",
                "/content/" + payload.contentId + "/like",
                undefined,
                {userId: payload.userId}
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    },
    ReportFeed: async (
        payload: FeedsModel.GetReportFeedPayload
    ): Promise<FeedsModel.GetReportFeedResponse> => {
        let response: FeedsModel.GetReportFeedResponse

        try {
            response = await Http.Request<FeedsModel.GetReportFeedResponse>(
                "POST",
                "/content/" + payload.contentId + "/report",
                undefined,
                { userId: payload.userId, reasonId: payload.reason, contentId: payload.contentId}
            );
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    }
};
