import { USER_SESSION, CREATOR_PROFILE, LoginModel, SendResetPasswordEmailModel } from "@Interfaces";

declare namespace ILoginPage {
    export interface IProps {}

    export interface IStateProps {
        errors: string;
        session: USER_SESSION;
        creatorProfile: CREATOR_PROFILE;
        sendResetPasswordEmailStatus: string;
    }

    namespace Actions {
        export interface IMapPayload {}

        export interface IMapResponse {}

        export interface IGetLoginPayload extends LoginModel.GetLoginPayload { params: {}; }
        export interface IGetLoginResponse extends LoginModel.GetLoginResponse {}

        export interface IGetSendResetPasswordPayload extends SendResetPasswordEmailModel.GetSendResetPasswordPayload {}
        export interface IGetSendResetPasswordResponse extends SendResetPasswordEmailModel.GetSendResetPasswordResponse {}
    }
}

export { ILoginPage };
