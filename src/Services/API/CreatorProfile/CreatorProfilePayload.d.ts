export interface CreatorProfilePayload {
    [key: string]: string | number;
    profileId: string;
    userId: number;
}

export interface CreatorFeedsPayload {
    [key: string]: string | number;
    profileId: string;
    userId: number;
}