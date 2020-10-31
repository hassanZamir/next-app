// #region Interface Imports
import {
    GETFollowingInformationPayload,
    GETFollowingInformationResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace GETFollowingInformationModel {
    export interface GetGETFollowingInformationPayload
        extends GETFollowingInformationPayload {}

    export interface GetGETFollowingInformationResponse
        extends GETFollowingInformationResponse {}
}

export { GETFollowingInformationModel };
