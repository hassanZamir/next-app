import { MESSAGE_LIST_ITEM, MESSAGE_RECIPIENT } from "@Interfaces";

export interface GETSearchMessagesResponse {
    status: boolean,
    response: MESSAGE_LIST_ITEM[] | MESSAGE_RECIPIENT[]
}