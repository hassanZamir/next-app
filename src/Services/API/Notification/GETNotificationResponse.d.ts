export type NOTIFICATION = {
    id: number,
    userId: number,
    type: number,
    commentId: number,
    contentId: number,
    name: string,
    commentText: string,
    tipAmount: number,
    profileImageUrl: string,
    seen: boolean,
    timeStamp: string
}
export interface GETNotificationResponse {
    status: boolean,
    response: NOTIFICATION[]
}