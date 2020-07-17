// #region Interface Imports
import { SendResetPasswordEmailPayload, SendResetPasswordEmailResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace SendResetPasswordEmailModel {
    export interface GetSendResetPasswordEmailPayload extends SendResetPasswordEmailPayload {}

    export interface GetSendResetPasswordEmailResponse extends SendResetPasswordEmailResponse {}
}

export { SendResetPasswordEmailModel };
