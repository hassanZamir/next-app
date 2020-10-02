import { MessagesModel, MESSAGE_LIST_ITEM, MESSAGE_RECIPIENT } from "@Interfaces";

declare namespace IMessagesPage {
    export interface IProps {}
    
    export interface IStateProps {
        allMessages: {
            emptyPaginationNo: number,
            values: MESSAGE_LIST_ITEM[],
            searchValues: MESSAGE_LIST_ITEM[],
            paginationNo: number,
            errors: string[]
        },
        messageRecipients: {
            emptyPaginationNo: number,
            values: MESSAGE_RECIPIENT[],
            searchValues: MESSAGE_RECIPIENT[],
            paginationNo: number,
            errors: string[]
        }
    }

    namespace Actions {
        export interface IMapAllMessages {
            allMessages: MESSAGE_LIST_ITEM[],
            page: number
        }
        export interface IMapMessageRecipients {
            messageRecipients: MESSAGE_RECIPIENT[],
            page: number
        }
        export interface IMapCreateConversationThread {
            conversation: MESSAGE_LIST_ITEM[]
        }
        export interface IMapNewConversationRecieved {
            conversation: MESSAGE_LIST_ITEM
        }
        export interface IMapSearchMessages {
            searchResult: MESSAGE_LIST_ITEM[] | MESSAGE_RECIPIENT[],
            type: number
        }

        export interface IGetGETAllMessagesPayload extends MessagesModel.GetGETAllMessagesPayload {}
        export interface IGetGETAllMessagesResponse extends MessagesModel.GetGETAllMessagesResponse {}

        export interface IGetGETMessageRecipientsPayload extends MessagesModel.GetGETMessageRecipientsPayload {}
        export interface IGetGETMessageRecipientsResponse extends MessagesModel.GetGETMessageRecipientsResponse {}

        export interface IGetPOSTConversationCreateThreadPayload extends MessagesModel.GetPOSTConversationCreateThreadPayload {}
        export interface IGetPOSTConversationCreateThreadResponse extends MessagesModel.GetPOSTConversationCreateThreadResponse {}
    }
}

export { IMessagesPage };
