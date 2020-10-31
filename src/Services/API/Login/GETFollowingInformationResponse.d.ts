export interface GETFollowingInformationResponse {
    status: boolean;
    response: {
        state: number;
        username: string;
        name: string;
        isFollowing: boolean;
        profileImageUrl: string;
        coverImageUrl: string;
        subscription: object;
    };
    type: number;
}
