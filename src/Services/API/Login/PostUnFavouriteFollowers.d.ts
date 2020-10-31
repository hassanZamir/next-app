// #region Interface Imports
import {
    PostFavouriteFollowersPayload,
    PostFavouriteFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostFavouriteFollowersModel {
    export interface GetPostFavouriteFollowersPayload
        extends PostFavouriteFollowersPayload {}

    export interface GetPostFavouriteFollowersResponse
        extends PostFavouriteFollowersResponse {}
}

export { PostFavouriteFollowersModel };
