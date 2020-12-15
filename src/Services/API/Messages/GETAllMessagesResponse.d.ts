export type MESSAGE_LIST_ITEM = {
    id: number,
    lastVisited: string,
    message: string,
    name: string,
    participantSeenStatus: boolean,
    profileImageUrl: string,
    /**
    * @deprecated Use `userName` instead.
    */
    userId: number,
    userName: string
}

export interface GETAllMessagesResponse {
    status: boolean,
    response: MESSAGE_LIST_ITEM[]
}