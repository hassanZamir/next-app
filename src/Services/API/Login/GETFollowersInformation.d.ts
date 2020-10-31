// #region Interface Imports
import {
    GETFollowersInformationPayload,
    GETFollowersInformationResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace GETFollowersInformationModel {
    export interface GetGETFollowersInformationPayload
        extends GETFollowersInformationPayload {}

    export interface GetGETFollowersInformationResponse
        extends GETFollowersInformationResponse {}
}

export { GETFollowersInformationModel };
