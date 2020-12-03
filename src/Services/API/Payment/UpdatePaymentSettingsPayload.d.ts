export interface UpdateUserPaymentSettingsPayload {
    paymentMode?: number;
    defaultCard?: number;
    userId: number;
    authtoken: string;
}