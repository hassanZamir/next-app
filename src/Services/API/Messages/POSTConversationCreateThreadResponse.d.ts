import { MESSAGE_LIST_ITEM } from "@Interfaces";

export interface CONVERSATION_THREAD extends MESSAGE_LIST_ITEM {
    /**
     * @deprecated Use userConversationSettings and creatorConversationSettings
     */
    conversationSettings?: {
        favourite: boolean,
        isBlocked: boolean,
        isRestricted: boolean,
        isFollower: boolean,
        [key?: string]: boolean
    },
    userConversationSettings: {
        isFavourite: boolean,
        isBlocked: boolean,
        isRestricted: boolean,
        isFollower: boolean,
        state: number, // subscriptionState - 0 = No record,  1 = active , 2 = deactive 
        // [key?: string]: boolean // used in persist reducer

    },
    creatorConversationSettings: {
        isFavourite: boolean,
        isBlocked: boolean,
        isRestricted: boolean,
        isFollower: boolean,
        state: number, // subscriptionState - 0 = No record,  1 = active , 2 = deactive 
        // [key?: string]: boolean // used in persist reducer 
    }

}

export interface POSTConversationCreateThreadResponse {
    status: boolean,
    error?: any,
    response: CONVERSATION_THREAD
}
