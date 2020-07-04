export interface SignUpResponse {
    account_created: boolean;
    status: string;
    errors: { [key: string]: [{ [key: string]: value; }] };
}
