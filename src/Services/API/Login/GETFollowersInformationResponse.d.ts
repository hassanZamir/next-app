export interface GETFollowersInformationResponse {
    status: boolean;
    response: {
        name: string;
        username: string;
        profileImageUrl: string;
        coverImageUrl: string;
        favourite: boolean;
        currentSubscriptionFee: number;
        startDate: string;
        renewDate: string;
        recurringFollower: boolean;
        earnings: object;
    };
    type: number;
}
