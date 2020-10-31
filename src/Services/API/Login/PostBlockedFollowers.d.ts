// #region Interface Imports
import {
    PostBlockedFollowersPayload,
    PostBlockedFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostBlockedFollowersModel {
    export interface GetPostBlockedFollowersPayload
        extends PostBlockedFollowersPayload {}

    export interface GetPostBlockedFollowersResponse
        extends PostBlockedFollowersResponse {}
}

export { PostBlockedFollowersModel };
