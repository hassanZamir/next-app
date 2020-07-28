import {PAYMENT_USER_SETTINGS, PAYMENT_USER_WALLET, PAYMENT_CARD} from "@Interfaces";

export interface UpdatePaymentSettingsResponse {
    status: boolean;
    error: string;
    response: {
        userSettings: PAYMENT_USER_SETTINGS;
        userWallet: PAYMENT_USER_WALLET;
        userCard: PAYMENT_CARD[];
    }
}