// #region Interface Imports
import { ChangePasswordPayload, ChangePasswordResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace ChangePasswordModel {
    export interface GetChangePasswordPayload extends ChangePasswordPayload { }
    export interface GetChangePasswordResponse extends ChangePasswordResponse { }

    export interface PutPasswordPayload {
        userId: number;
        oldPassword: string;
        newPassword: string;
        authtoken: string;
    }
    export interface PutPasswordResponse {
        status: boolean;
        error: string;
    }
}

export { ChangePasswordModel };