export interface CreatorProfilePayload {
    [key: string]: string;
    username: string;
}

export interface CreatorFeedsPayload {
    [key: string]: string | number;
    profileId: string;
    userId: number;
}