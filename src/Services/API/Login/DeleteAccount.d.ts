declare namespace DeleteAccountModel {
    export interface DeleteAccountPayload {
        userId: number;
        // recaptchaToken?: string;
    }
    export interface DeleteAccountResponse {
        status: boolean;
        error: string;
    }
}

export { DeleteAccountModel };
