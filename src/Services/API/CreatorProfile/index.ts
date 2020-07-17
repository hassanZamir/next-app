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
                "/content/creator/" + payload.profileId + "/user/" + payload.userId,
                undefined
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
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
                    type: 2,
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
                    contentLiked: false
                }, {
                    id: 1,
                    creatorId: 1,
                    type: 2,
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
                status: false,
                profile: {
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
                },
                errors: "Something went wrong"
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
                "/profile/follow",
                undefined,
                {...payload}
            );
        } catch (error) {
            debugger;
            response = {
                status: false,
                profile: {
                    id: 1,
                    name: "Joseph Denly",
                    totalContent: 250,
                    totalImages: 200,
                    totalVideos: 50,
                    totalFollowers: 156000,
                    totalFollowing: 2000,
                    showFollowers: true,
                    bio: "Hello YES!!!",
                    coverImageUrl: "/images/5.jpg",
                    profileImageUrl: "/images/Capture@2x.png",
                    address: "San Fransisco, CA",
                    isFollower: payload.shouldFollow
                },
                errors: "Something went wrong"
            };
        }
        return response;
    }
};
