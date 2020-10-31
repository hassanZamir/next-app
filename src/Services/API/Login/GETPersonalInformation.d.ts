// #region Interface Imports
import {
    GETPersonalInformationPayload,
    GETPersonalInformationResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace GETPersonalInformationModel {
    export interface GetGETPersonalInformationPayload
        extends GETPersonalInformationPayload {}

    export interface GetGETPersonalInformationResponse
        extends GETPersonalInformationResponse {}
}

export { GETPersonalInformationModel };
