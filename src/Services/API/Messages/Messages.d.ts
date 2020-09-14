// #region Interface Imports
import { GETAllMessagesPayload, GETAllMessagesResponse,
    GETMessageRecipientsPayload, GETMessageRecipientsResponse,
    POSTConversationCreateThreadPayload, POSTConversationCreateThreadResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace MessagesModel {
    export interface GetGETAllMessagesPayload extends GETAllMessagesPayload {}
    export interface GetGETAllMessagesResponse extends GETAllMessagesResponse {}

    export interface GetGETMessageRecipientsPayload extends GETMessageRecipientsPayload {}
    export interface GetGETMessageRecipientsResponse extends GETMessageRecipientsResponse {}

    export interface GetPOSTConversationCreateThreadPayload extends POSTConversationCreateThreadPayload {}
    export interface GetPOSTConversationCreateThreadResponse extends POSTConversationCreateThreadResponse {}
}

export { MessagesModel };