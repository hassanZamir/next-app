export interface LoginResponse {
    authenticated: boolean;
    status: string;
    session: {
        id?: number;
        name?: string;
        email?: string;
    },
    errors: string;
}
