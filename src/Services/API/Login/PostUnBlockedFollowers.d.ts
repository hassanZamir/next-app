// #region Interface Imports
import {
    PostUnBlockedFollowersPayload,
    PostUnBlockedFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostUnBlockedFollowersModel {
    export interface GetPostUnBlockedFollowersPayload
        extends PostUnBlockedFollowersPayload {}

    export interface GetPostUnBlockedFollowersResponse
        extends PostUnBlockedFollowersResponse {}
}

export { PostUnBlockedFollowersModel };
