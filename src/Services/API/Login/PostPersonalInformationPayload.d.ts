export interface PostPersonalInformationPayload {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    postCode: number;
    country: string;
    dob: string;
    explicitContent: boolean;
    userId: number;
    authtoken: string;
}
