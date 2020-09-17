import { MessagesModel, CONVERSATION_MESSAGE } from "@Interfaces";

declare namespace IConversationPage {
    export interface IProps {}
    
    export interface IStateProps {
        conversation: {
            emptyPaginationNo: number,
            values: CONVERSATION_MESSAGE[],
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
        
        export interface IGetGETConversationPayload extends MessagesModel.GetGETConversationPayload {}
        export interface IGetGETConversationResponse extends MessagesModel.GetGETConversationResponse {}

        export interface IGetPOSTCreateMessagePayload extends MessagesModel.GetPOSTCreateMessagePayload {}
        export interface IGetPOSTCreateMessageResponse extends MessagesModel.GetPOSTCreateMessageResponse {}

        export interface IGetPOSTCreateMessageResponse extends MessagesModel.GetPOSTCreateMessageResponse {}
    }
}

export { IConversationPage };
