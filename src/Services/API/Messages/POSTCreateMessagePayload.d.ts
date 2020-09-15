export interface POSTCreateMessagePayload {
    conversationId: number;
    senderId: number;
    type: number;
    message: string;
    sentAt: string;
}