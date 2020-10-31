export interface FollowProfilePayload {
    authtoken: string;
    username: string;
    userId: number;
    shouldFollow: boolean;
}
