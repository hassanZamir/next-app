// #region Interface Imports
import { SignupPayload, SignUpResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace SignUpModel {
    export interface GetSignUpPayload { params: SignupPayload; }

    export interface GetSignUpResponse extends SignUpResponse {}
}

export { SignUpModel };
