// #region Interface Imports
import {
    PostUnFavouriteFollowersPayload,
    PostUnFavouriteFollowersResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PostUnFavouriteFollowersModel {
    export interface GetPostUnFavouriteFollowersPayload
        extends PostUnFavouriteFollowersPayload {}

    export interface GetPostUnFavouriteFollowersResponse
        extends PostUnFavouriteFollowersResponse {}
}

export { PostUnFavouriteFollowersModel };
