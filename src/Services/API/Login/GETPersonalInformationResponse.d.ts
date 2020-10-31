export interface GETPersonalInformationResponse {
    status: boolean;
    response: {
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
    };
}
