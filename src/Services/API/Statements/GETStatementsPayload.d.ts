export interface GETStatementsPayload {
    userId: number,
    source?: number,
    type?: number,
    dateStart?: Date,
    dateEnd?: Date,
    authtoken: string,
}