// #region Interface Imports
import { GETAllMessagesPayload, GETAllMessagesResponse,
    GETMessageRecipientsPayload, GETMessageRecipientsResponse,
    GETSearchMessagesPayload, GETSearchMessagesResponse,
    POSTConversationCreateThreadPayload, POSTConversationCreateThreadResponse,
    GETConversationPayload, GETConversationResponse,
    POSTCreateMessagePayload, POSTCreateMessageResponse,
    POSTConversationSeenPayload, POSTConversationSeenResponse,
    POSTBuyMessagePayload, POSTBuyMessageResponse,
    POSTMessageSettingPayload, POSTMessageSettingResponse,
    POSTUpdateViewStatusPayload, POSTUpdateViewStatusResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace MessagesModel {
    export interface GetGETAllMessagesPayload extends GETAllMessagesPayload {}
    export interface GetGETAllMessagesResponse extends GETAllMessagesResponse {}

    export interface GetGETMessageRecipientsPayload extends GETMessageRecipientsPayload {}
    export interface GetGETMessageRecipientsResponse extends GETMessageRecipientsResponse {}

    export interface GetGETSearchMessagesPayload extends GETSearchMessagesPayload {}
    export interface GetGETSearchMessagesResponse extends GETSearchMessagesResponse {}

    export interface GetPOSTConversationCreateThreadPayload extends POSTConversationCreateThreadPayload {}
    export interface GetPOSTConversationCreateThreadResponse extends POSTConversationCreateThreadResponse {}

    export interface GetGETConversationPayload extends GETConversationPayload {}
    export interface GetGETConversationResponse extends GETConversationResponse {}

    export interface GetPOSTCreateMessagePayload extends POSTCreateMessagePayload {}
    export interface GetPOSTCreateMessageResponse extends POSTCreateMessageResponse {}

    export interface GetPOSTConversationSeenPayload extends POSTConversationSeenPayload {}
    export interface GetPOSTConversationSeenResponse extends POSTConversationSeenResponse {}

    export interface GetPOSTBuyMessagePayload extends POSTBuyMessagePayload {}
    export interface GetPOSTBuyMessageResponse extends POSTBuyMessageResponse {}

    export interface GetPOSTMessageSettingPayload extends POSTMessageSettingPayload {}
    export interface GetPOSTMessageSettingResponse extends POSTMessageSettingResponse {}

    export interface GetPOSTUpdateViewStatusPayload extends POSTUpdateViewStatusPayload {}
    export interface GetPOSTUpdateViewStatusResponse extends POSTUpdateViewStatusResponse {}
}

export { MessagesModel };