export type USER_SESSION  = {
    id: number;
    name: string;
    username: string;
    email: string;
    country: string;
    birthDate: string;
    isCreator: false;
    verifyEmail: number;
}

export interface LoginResponse {
    authenticated: boolean;
    status: string;
    session: USER_SESSION,
    errors: string;
}
