export interface GETConversationPayload {    
    conversationId: number,
    userName: string,
    page?: number,
    offset?: number,
    authtoken: string,
}