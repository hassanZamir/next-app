export interface GETMediaGallaryPayload {
    username: string;
    type: number;
    page?: number;
    offset?: number;
    authtoken: string;
}