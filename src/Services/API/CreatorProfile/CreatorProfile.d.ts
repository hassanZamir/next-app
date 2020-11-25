// #region Interface Imports
import {
    CreatorProfilePayload,
    CreatorProfileResponse,
    CreatorFeedsPayload,
    CreatorFeedsResponse,
    FollowProfilePayload,
    FollowProfileResponse,
    PostCreatorProfilePayload,
    PostCreatorProfileResponse,
    UploadProfileImagesPayload,
    UploadProfileImagesResponse,
    UploadSettingsProfileImagesPayload,
    UploadSettingsProfileImagesResponse,
    GETMediaGallaryPayload,
    GETMediaGallaryResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace CreatorProfileModel {
    export interface GetCreatorProfilePayload extends CreatorProfilePayload {}
    export interface GetCreatorProfileResponse extends CreatorProfileResponse {}

    export interface GetCreatorFeedsPayload extends CreatorFeedsPayload {}
    export interface GetCreatorFeedsResponse extends CreatorFeedsResponse {}

    export interface GetFollowProfilePayload extends FollowProfilePayload {}
    export interface GetFollowProfileResponse extends FollowProfileResponse {}

    export interface GetPostCreatorProfilePayload
        extends PostCreatorProfilePayload {}
    export interface GetPostCreatorProfileResponse
        extends PostCreatorProfileResponse {}

    export interface GetUploadProfileImagesPayload
        extends UploadProfileImagesPayload {}
    export interface GetUploadProfileImagesResponse
        extends UploadProfileImagesResponse {}

    export interface GetUploadSettingsProfileImagesPayload
        extends UploadSettingsProfileImagesPayload {}
    export interface GetUploadSettingsProfileImagesResponse
        extends UploadSettingsProfileImagesResponse {}

    export interface GetGETMediaGallaryPayload extends GETMediaGallaryPayload {}
    export interface GetGETMediaGallaryResponse
        extends GETMediaGallaryResponse {}
}

export { CreatorProfileModel };
