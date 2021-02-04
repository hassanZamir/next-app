export interface GETFollowersInformationPayload {
    authtoken: string;
    userId: number;
    username: string;
    type: number;
    page?: number;
}
