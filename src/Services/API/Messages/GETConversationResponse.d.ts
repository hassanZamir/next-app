export type CONVERSATION_MESSAGE = {
    id: number,
    lastVisited: string,
    userId: number,
    profileImageUrl: string,
    userName: string,
    name: string,
    message: string,
    participantSeenStatus: boolean
}
export interface GETConversationResponse {
    status: boolean,
    response: CONVERSATION_MESSAGE[]
}