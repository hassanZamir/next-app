import {
    FEED, CREATOR_PROFILE, CreatorProfileModel, ProfileFollowersModel, FEED_MEDIA, CheckUserProfileFollowingModel,
    UserCreatorProfileModel
} from "@Interfaces";
import { USER_CREATOR_PROFILE } from "@Services/API/CreatorProfile/UserCreatorProfile";

declare namespace IProfilePage {
    export interface IProps { }

    export interface IStateProps {
        errors: '',
        creatorProfile: CREATOR_PROFILE,
        creatorFeeds: FEED[],
        mediaGallary: FEED_MEDIA[],
        emptyPageNoFeeds: number,
        emptyPageNoImage: number,
        emptyPageNoVideo: number,
        followers: { userId: number }[],
        isUserFollowingStatus: string, // tracking API request status
        isUserFollowing: bool,

        //  user creator profile  //
        userCreatorProfile: USER_CREATOR_PROFILE,
        // --------------------- //
        isProfileFetching: boolean
    }

    namespace Actions {
        export interface IMapCreatorProfileResponse {
            profile: CREATOR_PROFILE
        }

        export interface IMapCreatorFeedsResponse {
            page: number,
            feeds: FEED[]
        }

        export interface IMapMediaGallaryResponse {
            mediaGallary: FEED_MEDIA[],
            type: number,
            page: number
        }

        export interface IMapProfileFollowersResponse {
            followers: ProfileFollowersModel.GetProfileFollowersResponse,
            hasFollowed?: boolean,
            hasUnFollowed?: boolean
        }

        export interface IGetCreatorProfilePayload extends CreatorProfileModel.GetCreatorProfilePayload { }
        export interface IGetCreatorProfileResponse extends CreatorProfileModel.GetCreatorProfileResponse { }

        export interface IGetUserCreatorProfilePayload extends UserCreatorProfileModel.GetUserCreatorProfilePayload { }
        export interface IGetUserCreatorProfileResponse extends UserCreatorProfileModel.GetUserCreatorProfileResponse { }

        export interface IGetCreatorFeedsPayload extends CreatorProfileModel.GetCreatorFeedsPayload { }
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse { }

        export interface IGetFollowProfilePayload extends CreatorProfileModel.GetFollowProfilePayload { }
        export interface IGetFollowProfileResponse extends CreatorProfileModel.GetFollowProfileResponse { }

        export interface IGetGETMediaGallaryPayload extends CreatorProfileModel.GetGETMediaGallaryPayload { }
        export interface IGetGETMediaGallaryResponse extends CreatorProfileModel.GetGETMediaGallaryResponse { }

        export interface IGetProfileFollowersPayload extends ProfileFollowersModel.GetProfileFollowersPayload { }
        export interface IGetProfileFollowersResponse extends ProfileFollowersModel.GetProfileFollowersResponse { }

        export interface IFilterFeedsPayload { key: number; }
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse { }


        export interface ICheckUserProfileFollowingPayload extends CheckUserProfileFollowingModel.CheckUserProfileFollowingPayload { }
        export interface ICheckUserProfileFollowingResponse extends CheckUserProfileFollowingModel.CheckUserProfileFollowingResponse { }
    }
}

export { IProfilePage };
