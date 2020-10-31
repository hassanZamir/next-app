export interface TipFeedPayload {
    creatorUserName: string;
    contentId?: number;
    viewerId: number;
    message: string;
    amount: number;
    authtoken: string;
}