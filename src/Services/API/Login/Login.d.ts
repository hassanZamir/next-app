// #region Interface Imports
import { LoginPayload, LoginResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace LoginModel {
    export interface GetLoginPayload { params: LoginPayload; }

    export interface GetLoginResponse extends LoginResponse {}
}

export { LoginModel };
