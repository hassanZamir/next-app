// #region Interface Imports
import {
    PostUnRestrictFollowersPayload,
    PostUnRestrictFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostUnRestrictFollowersModel {
    export interface GetPostUnRestrictFollowersPayload
        extends PostUnRestrictFollowersPayload {}

    export interface GetPostUnRestrictFollowersResponse
        extends PostUnRestrictFollowersResponse {}
}

export { PostUnRestrictFollowersModel };
