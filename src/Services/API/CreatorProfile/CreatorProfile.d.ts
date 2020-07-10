// #region Interface Imports
import { 
    CreatorProfilePayload, 
    CreatorProfileResponse, 
    CreatorFeedsPayload, 
    CreatorFeedsResponse,
    FollowProfilePayload,
    FollowProfileResponse

} from "@Interfaces"; 
// #endregion Interface Imports

declare namespace CreatorProfileModel {
    export interface GetCreatorProfilePayload extends CreatorProfilePayload {}
    export interface GetCreatorProfileResponse extends CreatorProfileResponse {}

    export interface GetCreatorFeedsPayload extends CreatorFeedsPayload {}
    export interface GetCreatorFeedsResponse extends CreatorFeedsResponse {}

    export interface GetFollowProfilePayload extends FollowProfilePayload {}
    export interface GetFollowProfileResponse extends FollowProfileResponse {}
}

export { CreatorProfileModel };
