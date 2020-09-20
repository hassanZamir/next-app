export type NOTIFICATION_STATS = {
    notifications_unseen_counter: number,
    likes_unseen_counter: number,
    comments_unseen_counter: number,
    conversation_unseen_counter: number
}

export interface GETNotificationStatsResponse {
    status: boolean,
    response: NOTIFICATION_STATS
}