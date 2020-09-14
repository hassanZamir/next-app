// #region Interface Imports
import { GETAllMessagesPayload, GETAllMessagesResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace MessagesModel {
    export interface GetGETAllMessagesPayload extends GETAllMessagesPayload {}
    export interface GetGETAllMessagesResponse extends GETAllMessagesResponse {}
}

export { MessagesModel };