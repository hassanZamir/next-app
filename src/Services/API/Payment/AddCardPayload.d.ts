export interface AddCardPayload {
    cardTitle: string;
    cardNumber: string;
    expMonth: number;
    expYear: string;
    cvc: string;

    poboxNumber: number;
    state: string;
    city: string;
    country: string;

    userId: number;
    authtoken: string;
    email: string;
}
