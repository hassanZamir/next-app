// #region Interface Imports
import { GETAllMessagesPayload, GETAllMessagesResponse,
    GETMessageRecipientsPayload, GETMessageRecipientsResponse,
    POSTConversationCreateThreadPayload, POSTConversationCreateThreadResponse,
    GETConversationPayload, GETConversationResponse,
    POSTCreateMessagePayload, POSTCreateMessageResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace MessagesModel {
    export interface GetGETAllMessagesPayload extends GETAllMessagesPayload {}
    export interface GetGETAllMessagesResponse extends GETAllMessagesResponse {}

    export interface GetGETMessageRecipientsPayload extends GETMessageRecipientsPayload {}
    export interface GetGETMessageRecipientsResponse extends GETMessageRecipientsResponse {}

    export interface GetPOSTConversationCreateThreadPayload extends POSTConversationCreateThreadPayload {}
    export interface GetPOSTConversationCreateThreadResponse extends POSTConversationCreateThreadResponse {}

    export interface GetGETConversationPayload extends GETConversationPayload {}
    export interface GetGETConversationResponse extends GETConversationResponse {}

    export interface GetPOSTCreateMessagePayload extends POSTCreateMessagePayload {}
    export interface GetPOSTCreateMessageResponse extends POSTCreateMessageResponse {}
}

export { MessagesModel };