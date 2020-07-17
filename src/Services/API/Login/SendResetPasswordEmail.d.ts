// #region Interface Imports
import { SendResetPasswordPayload, SendResetPasswordResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace SendResetPasswordEmailModel {
    export interface GetSendResetPasswordPayload extends SendResetPasswordPayload {}

    export interface GetSendResetPasswordResponse extends SendResetPasswordResponse {}
}

export { SendResetPasswordEmailModel };
