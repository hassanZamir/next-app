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
        payload: CreatorProfileModel.GetCreatorFeedsPayload
    ): Promise<CreatorProfileModel.GetCreatorProfileResponse> => {
        let response: CreatorProfileModel.GetCreatorProfileResponse;

        try {
            response = await Http.Request<CreatorProfileModel.GetCreatorProfileResponse>(
                "GET",
                "/profile/creator/" + payload.profileId + "/user/" + payload.userId,
                undefined
            );
        } catch (error) {
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
                    isFollower: true
                },
                errors: "Something went wrong"
            };
        }
        return response;
    }
};
