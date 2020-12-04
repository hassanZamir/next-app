export interface GETAllMessagesPayload {
    userId: number,
    page?: number,
    offset?: number,
    authtoken: string,
}