// #region Interface Imports
import { AccountVerifyPayload, AccountVerifyResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace AccountVerifyModel {
    export interface GetAccountVerifyPayload extends AccountVerifyPayload{}

    export interface GetAccountVerifyResponse extends AccountVerifyResponse {}
}

export { AccountVerifyModel };
