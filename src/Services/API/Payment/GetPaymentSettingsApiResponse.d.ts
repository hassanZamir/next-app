export type PAYMENT_CARD = {
    id: number;
    userId: number;
    cardNumber: string;
    cardTitle: string;
    cvc: number;
    expMonth: number;
    expYear: number;
    cardType: string;
}
export type PAYMENT_USER_SETTINGS = {
    paymentMode: number;
    defaultCard: number;
}
export type PAYMENT_USER_WALLET = {
    balance: number;
}

export interface GetPaymentSettingsApiResponse {
    status: boolean;
    response: {
        userSettings: PAYMENT_USER_SETTINGS;
        userWallet: PAYMENT_USER_WALLET;
        userCard: PAYMENT_CARD[];
    }
}