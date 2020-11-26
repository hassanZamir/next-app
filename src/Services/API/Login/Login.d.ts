// #region Interface Imports
import { LoginPayload, LoginResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace LoginModel {
    export interface GetLoginPayload { params: LoginPayload; }
    export interface GetLoginResponse extends LoginResponse { }

    export interface VerifyTokenPayload {
        session: USER_SESSION;
    }
    export interface VerifyTokenResponse {
        status: boolean;
        authenticated: boolean;
        session: USER_SESSION;
        error: {}
    }

}

export { LoginModel };
