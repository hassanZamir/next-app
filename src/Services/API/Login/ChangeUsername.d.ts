declare namespace ChangeUsernameModel {
    export interface ChangeUsernamePayload {
        userId: number;
        newUsername: string;
        authtoken: string;
    }
    export interface ChangeUsernameResponse {
        status: boolean;
        error: string;
    }
}

export { ChangeUsernameModel };

