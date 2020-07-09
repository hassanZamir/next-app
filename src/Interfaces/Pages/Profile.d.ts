import { CreatorProfileModel } from "@Services/API/CreatorProfile/CreatorProfile";
import { FEED, CREATOR_PROFILE } from "@Interfaces";

declare namespace IProfilePage {
    export interface IProps {}

    export interface IStateProps {
        errors: '',
        creatorProfile: CREATOR_PROFILE,
        creatorFeeds: FEED[]
    }

    namespace Actions {
        export interface IGetCreatorProfilePayload extends CreatorProfileModel.GetCreatorProfilePayload {}
        export interface IGetCreatorProfileResponse extends CreatorProfileModel.GetCreatorProfileResponse {}

        export interface IGetCreatorFeedsPayload extends CreatorProfileModel.GetCreatorFeedsPayload {}
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse {}

        export interface IFilterFeedsPayload {
            key: number;
        }
        export interface IGetCreatorFeedsResponse extends CreatorProfileModel.GetCreatorFeedsResponse {}
    }
}

export { IProfilePage };
