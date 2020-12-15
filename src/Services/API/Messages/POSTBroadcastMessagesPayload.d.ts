export interface POSTCreateBroadcastMessagesPayload {
    recipients: string[],
    message: {
        authtoken: string;
        conversationId?: string;
        senderId: number;
        type: number;
        message: string;
        sentAt: string;
        authtoken: string;
        meta?: {
            media_urls: [{
                url: string,
                thumbnailUrl: string,
                media_type: string
            }],
            purchase_status: boolean,
            amount: number,
            view_status: boolean
        } & TIP_MESSAGE;
    }
}