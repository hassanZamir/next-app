// #region Local Imports
import { Http, getQueryParams } from "@Services";
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
            response = await Http.Request<
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
    GetCreatorProfile: async (
        payload: CreatorProfileModel.GetCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<
                CreatorProfileModel.GetCreatorProfileResponse
            >("GET", "/profiles/" + payload.username, undefined);
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
            response = await Http.Request<
                ProfileFollowersModel.GetProfileFollowersResponse
            >(
                "GET",
                "/profiles/" +
                    payload.username +
                    "/followers?userId=" +
                    payload.userId,
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
            response = await Http.Request<
                CreatorProfileModel.GetFollowProfileResponse
            >("POST", "/profiles/" + payload.username + "/follow", undefined, {
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
            response = await Http.Request<
                CreatorProfileModel.GetFollowProfileResponse
            >(
                "DELETE",
                "/profiles/" + payload.username + "/follow",
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

        const { username, ...restPayload } = payload;
        console.log(
            "/profiles/" +
                username +
                "/gallery" +
                getQueryParams({ ...restPayload })
        );
        try {
            response = await Http.Request<
                CreatorProfileModel.GetGETMediaGallaryResponse
            >(
                "GET",
                "/profiles/" +
                    username +
                    "/gallery" +
                    getQueryParams({ ...restPayload }),
                undefined
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
