// #region Interface Imports
import { 
    CreatorProfilePayload, 
    CreatorProfileResponse, 
    CreatorFeedsPayload, 
    CreatorFeedsResponse 
} from "@Interfaces"; 
// #endregion Interface Imports

declare namespace CreatorProfileModel {
    export interface GetCreatorProfilePayload extends CreatorProfilePayload {}

    export interface GetCreatorProfileResponse extends CreatorProfileResponse {}

    export interface GetCreatorFeedsPayload extends CreatorFeedsPayload {}

    export interface GetCreatorFeedsResponse extends CreatorFeedsResponse {}
}

export { CreatorProfileModel };
