// #region Interface Imports
import {
    PostRestrictFollowersPayload,
    PostRestrictFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostRestrictFollowersModel {
    export interface GetPostRestrictFollowersPayload
        extends PostRestrictFollowersPayload {}

    export interface GetPostRestrictFollowersResponse
        extends PostRestrictFollowersResponse {}
}

export { PostRestrictFollowersModel };
