export type CONVERSATION_MESSAGE = {
    conversationId: number,
    id: number,
    message: string,
    recipientId: number,
    senderId: number,
    sentAt: string
    type: number
}
export interface GETConversationResponse {
    status: boolean,
    response: CONVERSATION_MESSAGE[]
}