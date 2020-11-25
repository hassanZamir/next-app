export interface CreatorProfilePayload {
    [key: string]: string;
    username: string;
}

export interface CreatorFeedsPayload {
    authtoken: string;
    [key: string]: string | number;
    username: string;
    type: number;
    page: number;
    offset: number;
    viewer: number;
}
