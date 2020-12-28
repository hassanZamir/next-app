export interface AddCardPayload {
    cardTitle: string;
    cardNumber: string;
    expMonth: number;
    expYear: string;
    cvc: string;

    fname: string;
    lname: string;
    poboxNumber: number;
    state: string;
    city: string;
    country: string;
    address1: string;
    address2: string;

    userId: number;
    authtoken: string;
    email: string;
}
