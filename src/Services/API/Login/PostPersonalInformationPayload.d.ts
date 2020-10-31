export interface PostPersonalInformationPayload {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    postCode: number;
    country: string;
    dob: string;
    docType: number;
    docPhoto: string;
    docUserPhoto: string;
    docNumber: string;
    docExpiry: string;
    explicitContent: boolean;
    media_url: any[];
    userId: number;
}
