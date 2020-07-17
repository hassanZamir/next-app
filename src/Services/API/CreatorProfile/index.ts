// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { CreatorProfileModel } from "@Interfaces";
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
    GetCreatorProfile: async (
        payload: CreatorProfileModel.GetCreatorProfilePayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<CreatorProfileModel.GetCreatorProfileResponse>(
                "GET",
                "s/profiles/" + payload.username,
                undefined
            );
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
                    followingFee: 0.0
                }
            };
        }
        return response;
    },
    // FollowProfile: async (
    //     payload: CreatorProfileModel.GetFollowProfilePayload
    // ): Promise<CreatorProfileModel.GetFollowProfileResponse> => {
    //     let response: CreatorProfileModel.GetFollowProfileResponse;

    //     try {
    //         response = await Http.Request<CreatorProfileModel.GetFollowProfileResponse>(
    //             "POST",
    //             "/profile/follow",
    //             undefined,
    //             {...payload}
    //         );
    //     } catch (error) {
    //         debugger;
    //         response = {
    //             status: false,
    //             profile: {
    //                 id: 1,
    //                 name: "Joseph Denly",
    //                 totalContent: 250,
    //                 totalImages: 200,
    //                 totalVideos: 50,
    //                 totalFollowers: 156000,
    //                 totalFollowing: 2000,
    //                 showFollowers: true,
    //                 bio: "Hello YES!!!",
    //                 coverImageUrl: "/images/5.jpg",
    //                 profileImageUrl: "/images/Capture@2x.png",
    //                 address: "San Fransisco, CA",
    //                 isFollower: payload.shouldFollow
    //             },
    //             errors: "Something went wrong"
    //         };
    //     }
    //     return response;
    // }
};
