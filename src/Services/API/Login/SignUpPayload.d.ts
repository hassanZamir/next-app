export interface SignupPayload {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    birthDate?: string;
    account_created?: boolean;
    [key: string]: string | boolean;
}
