export interface GETNotificationPayload {
    key?: string,
    type: number,
    userId: number,
    page?: number,
    offset?: number,
    authtoken: string,
}