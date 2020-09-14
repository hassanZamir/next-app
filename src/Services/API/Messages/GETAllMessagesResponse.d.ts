export type MESSAGE_LIST_ITEM = {
    id: number,
    username: string,
    name: string,
    profilePic: string,
    message: string,
    lastUpdated: string,
    participantSeenStatus: boolean
}

export interface GETAllMessagesResponse {
    status: boolean,
    response: MESSAGE_LIST_ITEM[]
}