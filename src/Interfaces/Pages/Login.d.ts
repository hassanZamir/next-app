import {
    USER_SESSION,
    CREATOR_PROFILE,
    LoginModel,
    SendResetPasswordEmailModel,
    ChangePasswordModel,
} from "@Interfaces";

declare namespace ILoginPage {
    export interface IProps { }

    export interface IStateProps {
        errors: string;
        session: USER_SESSION;
        creatorProfile: CREATOR_PROFILE;
        sendResetPasswordEmailStatus: string;
        changePasswordStatus: string;
    }

    namespace Actions {
        export interface IMapPayload { }

        export interface IMapResponse { }

        export interface ITokenVerifyPayload extends LoginModel.VerifyTokenPayload { }
        export interface ITokenVerifyResponse extends LoginModel.VerifyTokenResponse { }

        export interface IGetLoginPayload extends LoginModel.GetLoginPayload {
            params: {};
        }
        export interface IGetLoginResponse
            extends LoginModel.GetLoginResponse { }

        export interface IGetSendResetPasswordEmailPayload
            extends SendResetPasswordEmailModel.GetSendResetPasswordEmailPayload { }
        export interface IGetSendResetPasswordEmailResponse
            extends SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse { }

        export interface IGetChangePasswordPayload
            extends ChangePasswordModel.GetChangePasswordPayload { }
        export interface IGetChangePasswordResponse
            extends ChangePasswordModel.GetChangePasswordResponse { }
        export interface IPutPasswordPayload
            extends ChangePasswordModel.PutPasswordPayload { }
        export interface IPutPasswordResponse
            extends ChangePasswordModel.PutPasswordResponse { }
    }
}

export { ILoginPage };
