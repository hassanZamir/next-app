declare namespace CheckUserProfileFollowingModel {
    export interface CheckUserProfileFollowingPayload {
        authtoken: string;
        userId: number;
        creatorUsername: string;
    }

    export interface CheckUserProfileFollowingResponse {
        status: boolean;
        response: {
            isFollower: bool
        };
        errors: {};
    }
}

export { CheckUserProfileFollowingModel }