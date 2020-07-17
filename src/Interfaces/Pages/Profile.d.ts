import { FEED, CREATOR_PROFILE, CreatorProfileModel, ProfileFollowersModel } from "@Interfaces";

declare namespace IProfilePage {
    export interface IProps {}

    export interface IStateProps {
        errors: '',
        creatorProfile: CREATOR_PROFILE,
        creatorFeeds: FEED[],
        followers: {userId: number}[]
    }

    namespace Actions {
        export interface IMapCreatorProfileResponse {
            profile: CreatorProfileModel.GetCreatorProfileResponse
        }

        export interface IMapCreatorFeedsResponse {
            feeds: CreatorProfileModel.GetCreatorFeedsResponse
        }

        export interface IMapProfileFollowersResponse {
            followers: ProfileFollowersModel.GetProfileFollowersResponse
        }

        export interface IGetCreatorProfilePayload extends CreatorProfileModel.GetCreatorProfilePayload {}
        export interface IGetCreatorProfileResponse extends CreatorProfileModel.GetCreatorProfileResponse {}

        export interface IGetCreatorFeedsPayload extends CreatorProfileModel.GetCreatorFeedsPayload {}
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse {}

        export interface IGetFollowProfilePayload extends CreatorProfileModel.GetFollowProfilePayload {}
        export interface IGetFollowProfileResponse extends CreatorProfileModel.GetFollowProfileResponse {}

        export interface IGetProfileFollowersPayload extends ProfileFollowersModel.GetProfileFollowersPayload {}
        export interface IGetProfileFollowersResponse extends ProfileFollowersModel.GetProfileFollowersResponse {}

        export interface IFilterFeedsPayload { key: number;}
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse {}
    }
}

export { IProfilePage };
