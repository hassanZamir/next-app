export interface SignupPayload {
    [key: string]: string;
    dateOfBorth?: { date: string; month: string; year: string; };
}
