declare namespace DeleteAccountModel {
    export interface DeleteAccountPayload {
        userId: number;
        authtoken: string;
    }
    export interface DeleteAccountResponse {
        status: boolean;
        error: string;
    }
}

export { DeleteAccountModel };
