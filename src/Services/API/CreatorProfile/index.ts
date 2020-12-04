// #region Local Imports
import { Http, getQueryParams } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { CreatorProfileModel, ProfileFollowersModel, CheckUserProfileFollowingModel, UserCreatorProfileModel } from "@Interfaces";
// #endregion Interface Imports

export const CreatorProfileService = {
    CheckUserProfileFollowing: async (
        payload: CheckUserProfileFollowingModel.CheckUserProfileFollowingPayload
    ): Promise<CheckUserProfileFollowingModel.CheckUserProfileFollowingResponse> => {
        let response: CheckUserProfileFollowingModel.CheckUserProfileFollowingResponse;
        var { authtoken, ...params } = payload;
        try {
            response = await Http.UserAuthRequest<CheckUserProfileFollowingModel.CheckUserProfileFollowingResponse>(
                "GET",
                `/users/${payload.userId}/followings/${payload.creatorUsername}/active`,
                authtoken,
            );
        } catch (error) {
            response = {
                status: false,
                errors: "Something went wrong",
                response: {
                    isFollower: null
                },
            };
        }
        return response;
    },
    GetCreatorFeeds: async (
        payload: CreatorProfileModel.GetCreatorFeedsPayload
    ): Promise<CreatorProfileModel.GetCreatorFeedsResponse> => {
        let response: CreatorProfileModel.GetCreatorFeedsResponse;

        try {
            response = await Http.UserAuthRequest<
                CreatorProfileModel.GetCreatorFeedsResponse
            >(
                "GET",
                "/profiles/" +
                payload.username +
                "/content?type=" +
                payload.type +
                "&page=" +
                payload.page +
                "&offset=" +
                payload.offset +
                "&viewer=" +
                payload.viewer,
                payload.authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [
                    {
                        name: "sohaib",
                        username: "venotv1234",
                        profileImageUrl: "/images/Capture@2x.png",
                        content_viewer_like: false,
                        id: 7,
                        title: "My First Post",
                        media_url: [
                            {
                                url: "72227.jpg",
                                token:
                                    "?sp=rl&st=2020-07-30T17:05:23Z&se=2020-08-03T17:05:00Z&sv=2019-12-12&sr=b&sig=d7k6fJNCcn%2FUjsWMy8lHnHiL2syjG2fJsTFeeOZ0gK0%3D",
                                type: 1,
                            },
                        ],
                        medialist: [],
                        likesCount: 0,
                        commentsCount: 0,
                        tipsCount: 0,
                        timeStamp: "2020-07-09T09:03:28.8766667",
                    },
                    {
                        name: "sohaib",
                        username: "venotv1234",
                        profileImageUrl: "/images/Capture@2x.png",
                        content_viewer_like: false,
                        id: 7,
                        title: "My First Post",
                        media_url: [
                            {
                                url: "72227.jpg",
                                token:
                                    "?sp=rl&st=2020-07-30T17:05:23Z&se=2020-08-03T17:05:00Z&sv=2019-12-12&sr=b&sig=d7k6fJNCcn%2FUjsWMy8lHnHiL2syjG2fJsTFeeOZ0gK0%3D",
                                type: 1,
                            },
                        ],
                        medialist: [],
                        likesCount: 0,
                        commentsCount: 0,
                        tipsCount: 0,
                        timeStamp: "2020-07-09T09:03:28.8766667",
                    },
                    {
                        name: "sohaib",
                        username: "venotv1234",
                        profileImageUrl: "/images/Capture@2x.png",
                        content_viewer_like: false,
                        id: 7,
                        title: "My First Post",
                        media_url: [
                            {
                                url: "72227.jpg",
                                token:
                                    "?sp=rl&st=2020-07-30T17:05:23Z&se=2020-08-03T17:05:00Z&sv=2019-12-12&sr=b&sig=d7k6fJNCcn%2FUjsWMy8lHnHiL2syjG2fJsTFeeOZ0gK0%3D",
                                type: 1,
                            },
                        ],
                        medialist: [],
                        likesCount: 0,
                        commentsCount: 0,
                        tipsCount: 0,
                        timeStamp: "2020-07-09T09:03:28.8766667",
                    },
                    {
                        name: "sohaib",
                        username: "venotv1234",
                        profileImageUrl: "/images/Capture@2x.png",
                        content_viewer_like: false,
                        id: 7,
                        title: "My First Post",
                        media_url: [
                            {
                                url: "72227.jpg",
                                token:
                                    "?sp=rl&st=2020-07-30T17:05:23Z&se=2020-08-03T17:05:00Z&sv=2019-12-12&sr=b&sig=d7k6fJNCcn%2FUjsWMy8lHnHiL2syjG2fJsTFeeOZ0gK0%3D",
                                type: 1,
                            },
                        ],
                        medialist: [],
                        likesCount: 0,
                        commentsCount: 0,
                        tipsCount: 0,
                        timeStamp: "2020-07-09T09:03:28.8766667",
                    },
                ],
            };
        }
        return response;
    },
    /**
    * @deprecated Use GetActiveCreatorProfile instead
    */
    GetCreatorProfile: async (
        payload: CreatorProfileModel.GetCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<
                CreatorProfileModel.GetCreatorProfileResponse
            >("GET", `/creators/${payload.username}/profiles`, undefined);
        } catch (error) {
            response = {
                status: false,
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
                    followingFee: 0.0,
                    userName: "sohaibminhas789",
                },
            };
        }
        return response;
    },
    GetActiveCreatorProfile: async (
        payload: CreatorProfileModel.GetCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<
                CreatorProfileModel.GetCreatorProfileResponse
            >("GET", `/creators/${payload.username}/profile`, undefined);
        } catch (error) {
            response = {
                status: false,
                response: {
                    name: "",
                    coverImageUrl: "",
                    profileImageUrl: "",
                    location: "",
                    bio: "",
                    followersCount: 0,
                    contentCount: 0,
                    imagesCount: 0,
                    videosCount: 0,
                    followingFee: 0.0,
                    userName: "",
                },
            };
        }
        return response;
    },
    GetUserCreatorProfile: async (payload: UserCreatorProfileModel.GetUserCreatorProfilePayload): Promise<UserCreatorProfileModel.GetUserCreatorProfileResponse> => {
        let result: UserCreatorProfileModel.GetUserCreatorProfileResponse;
        try {
            result = await Http.UserAuthRequest<UserCreatorProfileModel.GetUserCreatorProfileResponse>(
                "GET",
                `/users/${payload.userid}/profile`,
                payload.authtoken
            );
        } catch (error) {
            result = {
                status: false,
                errors: error,
            }
        }

        return result;
    },
    PostCreatorProfile: async (
        payload: CreatorProfileModel.GetPostCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetPostCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetPostCreatorProfileResponse;

        const { username, ...rest } = payload;
        try {
            response = await Http.Request<
                CreatorProfileModel.GetPostCreatorProfileResponse
            >("POST", "/profiles/" + username, undefined, { ...rest });
        } catch (error) {
            response = {
                status: false,
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
                    followingFee: 0.0,
                    userName: "sohaibminhas789",
                },
            };
        }
        return response;
    },
    GetProfileFollowers: async (
        payload: ProfileFollowersModel.GetProfileFollowersPayload
    ): Promise<ProfileFollowersModel.GetProfileFollowersResponse> => {
        let response: ProfileFollowersModel.GetProfileFollowersResponse;

        try {
            response = await Http.UserAuthRequest<
                ProfileFollowersModel.GetProfileFollowersResponse
            >(
                "GET",
                "/profiles/" + payload.username + "/followers?userId=" + payload.userId,
                payload.authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: false,
                response: [
                    {
                        userId: 10,
                    },
                ],
            };
        }
        return response;
    },
    FollowProfile: async (
        payload: CreatorProfileModel.GetFollowProfilePayload
    ): Promise<CreatorProfileModel.GetFollowProfileResponse> => {
        let response: CreatorProfileModel.GetFollowProfileResponse;

        try {
            response = await Http.UserAuthRequest<
                CreatorProfileModel.GetFollowProfileResponse
            >("POST", "/profiles/" + payload.username + "/follow", payload.authtoken, undefined, {
                userId: payload.userId,
            });
        } catch (error) {
            response = {
                status: false,
                response: [],
            };
        }
        return response;
    },
    UnFollowProfile: async (
        payload: CreatorProfileModel.GetFollowProfilePayload
    ): Promise<CreatorProfileModel.GetFollowProfileResponse> => {
        let response: CreatorProfileModel.GetFollowProfileResponse;

        try {
            response = await Http.UserAuthRequest<
                CreatorProfileModel.GetFollowProfileResponse
            >(
                "DELETE",
                "/profiles/" + payload.username + "/follow",
                payload.authtoken,
                undefined,
                { userId: payload.userId }
            );
        } catch (error) {
            response = {
                status: false,
                response: [],
            };
        }
        return response;
    },
    GetMediaGallary: async (
        payload: CreatorProfileModel.GetGETMediaGallaryPayload
    ): Promise<CreatorProfileModel.GetGETMediaGallaryResponse> => {
        let response: CreatorProfileModel.GetGETMediaGallaryResponse;

        const { authtoken, username, ...restPayload } = payload;
        try {
            response = await Http.UserAuthRequest<
                CreatorProfileModel.GetGETMediaGallaryResponse
            >(
                "GET",
                "/profiles/" +
                username +
                "/gallery" +
                getQueryParams({ ...restPayload }),
                authtoken
            );
        } catch (error) {
            response = {
                status: false,
                response: [],
            };
        }
        return response;
    },
};
