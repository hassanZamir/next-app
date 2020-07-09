export type USER_SESSION  = {
    id: string;
    name: string;
    username: string;
    email: string;
    country: string;
    birthDate: string;
    isCreator: false
}

export interface LoginResponse {
    authenticated: boolean;
    status: string;
    session: USER_SESSION,
    errors: string;
}
