export type USER_SESSION = {
    id: number;
    name: string;
    username: string;
    email: string;
    country: string;
    birthDate: string;
    isCreator: boolean;
    verifyEmail: number;
    profileImageUrl: string;
    paymentMode: number;
    cardNumber: string;
    cardTitle: string;
    notificationCount: number;
    followersCount: number;
    token: string;
    refreshToken: string;
};

export interface LoginResponse {
    authenticated: boolean;
    status: string;
    session: USER_SESSION;
    errors: string;
}
