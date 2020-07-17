// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { CreatorProfileModel, ProfileFollowersModel } from "@Interfaces";
// #endregion Interface Imports

export const CreatorProfileService = {
    GetCreatorFeeds: async (
        payload: CreatorProfileModel.GetCreatorFeedsPayload
    ): Promise<CreatorProfileModel.GetCreatorFeedsResponse> => {
        let response: CreatorProfileModel.GetCreatorFeedsResponse;

        try {
            response = await Http.Request<CreatorProfileModel.GetCreatorFeedsResponse>(
                "GET",
                "/profiles/" + payload.username + "/content?type=" + payload.type + 
                '&page=' + payload.page + '&offset=' + payload.offset + '&viewer=' + payload.viewer,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
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
    GetCreatorProfile: async (
        payload: CreatorProfileModel.GetCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<CreatorProfileModel.GetCreatorProfileResponse>(
                "GET",
                "/profiles/" + payload.username,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
                response: {
                    name: "sohaib",
                    coverImageUrl: "/images/5.jpg",
                    profileImageUrl: "/images/Capture@2x.png",
                    location: "Pakistan",
                    bio: "technology Geek",
                    followersCount: 0,
                    contentCount: 0,
                    imagesCount: 0,
                    videosCount: 0,
                    followingFee: 0.0
                }
            };
        }
        return response;
    },
    GetProfileFollowers: async (
        payload: ProfileFollowersModel.GetProfileFollowersPayload
    ): Promise<ProfileFollowersModel.GetProfileFollowersResponse> => {
        let response: ProfileFollowersModel.GetProfileFollowersResponse;

        try {
            response = await Http.Request<ProfileFollowersModel.GetProfileFollowersResponse>(
                "GET",
                "/profiles/" + payload.username + "/followers?userId=" + payload.userId,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
                response: [{
                    userId: 10
                }]
            };
        }
        return response;
    },
    FollowProfile: async (
        payload: CreatorProfileModel.GetFollowProfilePayload
    ): Promise<CreatorProfileModel.GetFollowProfileResponse> => {
        let response: CreatorProfileModel.GetFollowProfileResponse;

        try {
            response = await Http.Request<CreatorProfileModel.GetFollowProfileResponse>(
                "POST",
                "/profiles/" + payload.username + '/' + (payload.shouldFollow ? 'follow' : 'unfollow'),
                undefined,
                {userId: payload.userId}
            );
        } catch (error) {
            debugger;
            response = {
                status: true,
                response: []
            };
        }
        return response;
    }
};
