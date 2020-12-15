import { MessagesModel, CONVERSATION_RESPONSE } from "@Interfaces";

declare namespace IConversationPage {
    export interface IProps { }

    export interface IStateProps {
        conversation: {
            emptyPaginationNo: number,
            values: CONVERSATION_RESPONSE[],
            paginationNo: number,
            errors: string[]
        }
    }

    namespace Actions {
        export interface IMapGetConversation {
            conversation: CONVERSATION_MESSAGE[],
            page: number
        }
        export interface IMapCreateMessage {
            conversationMessage: CONVERSATION_MESSAGE,
        }
        export interface IMapUpdateViewStatus {
            messageId: number
        }

        export interface IGetGETConversationPayload extends MessagesModel.GetGETConversationPayload { }
        export interface IGetGETConversationResponse extends MessagesModel.GetGETConversationResponse { }

        export interface IGetGETSearchMessagesPayload extends MessagesModel.GetGETSearchMessagesPayload { }
        export interface IGetGETSearchMessagesResponse extends MessagesModel.GetGETSearchMessagesResponse { }

        export interface IGetPOSTCreateMessagePayload extends MessagesModel.GetPOSTCreateMessagePayload {
            images_formData: formData, // used for image input files
            videos_formData: videoFormData, // used for video input files
        }
        export interface IGetPOSTCreateMessageResponse extends MessagesModel.GetPOSTCreateMessageResponse { }

        export interface IGetPOSTCreateBroadcastMessagesPayload extends MessagesModel.GetPOSTCreateBroadcastMessagesPayload { }
        export interface IGetPOSTCreateBroadcastMessagesResponse extends MessagesModel.GetPOSTCreateBroadcastMessagesResponse { }

        export interface IGetPOSTConversationSeenPayload extends MessagesModel.GetPOSTConversationSeenPayload { }
        export interface IGetPOSTConversationSeenResponse extends MessagesModel.GetPOSTConversationSeenResponse { }

        export interface IGetPOSTBuyMessagePayload extends MessagesModel.GetPOSTBuyMessagePayload { }
        export interface IGetPOSTBuyMessageResponse extends MessagesModel.GetPOSTBuyMessageResponse { }

        export interface IGetPOSTMessageSettingPayload extends MessagesModel.GetPOSTMessageSettingPayload { }
        export interface IGetPOSTMessageSettingResponse extends MessagesModel.GetPOSTMessageSettingResponse { }

        export interface IGetPOSTUpdateViewStatusPayload extends MessagesModel.GetPOSTUpdateViewStatusPayload { }
        export interface IGetPOSTUpdateViewStatusResponse extends MessagesModel.GetPOSTUpdateViewStatusResponse { }
    }
}

export { IConversationPage };
