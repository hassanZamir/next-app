export type MESSAGE_LIST_ITEM = {
    id: number,
    lastVisited: string,
    message: string,
    name: string,
    participantSeenStatus: boolean,
    profileImageUrl: string,
    /**
    * @deprecated Use `recipientUsername` instead.
    */
    userId: number,
    /**
    * @deprecated Use `recipientUsername` instead.
    */
    userName: string,
    recipientUserName: string
}

export interface GETAllMessagesResponse {
    status: boolean,
    response: MESSAGE_LIST_ITEM[]
}