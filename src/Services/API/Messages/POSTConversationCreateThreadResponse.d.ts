import { MESSAGE_LIST_ITEM } from "@Interfaces";

export interface  CONVERSATION_THREAD extends MESSAGE_LIST_ITEM {
    conversationSettings: {
        favourite: boolean,
        isBlocked: boolean,
        isRestricted: boolean,
        isFollower: boolean,
        [key: string]: boolean
    }
}

export interface POSTConversationCreateThreadResponse {
    status: boolean,
    response: CONVERSATION_THREAD
}
