import { TIP_MESSAGE } from "@Interfaces";

export interface POSTCreateMessagePayload {
    conversationId: number;
    senderId: number;
    type: number;
    message: string;
    sentAt: string;
    meta?: {
        media_urls: [{
            url: string,
            thumbnailUrl: string,
            media_type: string
        }],
        purchase_status: boolean,
        amount: number
    } & TIP_MESSAGE;
    onSuccessScroll: ()=>void;
}