// #region Interface Imports
import {
    GETStatementsPayload,
    GETStatementsResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace GETStatementsModel {
    export interface GetGETStatementsPayload
        extends GETStatementsPayload {}

    export interface GetGETStatementsResponse
        extends GETStatementsResponse {}
}

export { GETStatementsModel };
