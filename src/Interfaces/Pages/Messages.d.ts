import { MessagesModel, MESSAGE_LIST_ITEM } from "@Interfaces";

declare namespace IMessagesPage {
    export interface IProps {}
    
    export interface IStateProps {
        allMessages: {
            emptyPaginationNo: number,
            values: MESSAGE_LIST_ITEM[],
            paginationNo: number
        }
        errors: string[]
    }

    namespace Actions {
        export interface IMapAllMessages {
            allMessages: NOTIFICATION[],
            page: number
        }

        export interface IGetGETAllMessagesPayload extends MessagesModel.GetGETAllMessagesPayload {}
        export interface IGetGETAllMessagesResponse extends MessagesModel.GetGETAllMessagesResponse {}
    }
}

export { IMessagesPage };
