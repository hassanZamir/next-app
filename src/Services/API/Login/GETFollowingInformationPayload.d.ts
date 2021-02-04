export interface GETFollowingInformationPayload {
    authtoken: string;
    userId: number;
    username: string;
    type: number;
    filterUsername?: string
    page?: number;
}
