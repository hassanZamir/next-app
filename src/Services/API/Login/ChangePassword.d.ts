// #region Interface Imports
import { ChangePasswordPayload, ChangePasswordResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace ChangePasswordModel {
    export interface GetChangePasswordPayload extends ChangePasswordPayload {}

    export interface GetChangePasswordResponse extends ChangePasswordResponse {}
}

export { ChangePasswordModel };
