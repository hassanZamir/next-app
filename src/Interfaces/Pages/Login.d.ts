import { LoginModel } from "@Services/API/Login/Login";
import { USER_SESSION } from "@Interfaces";

declare namespace ILoginPage {
    export interface IProps {}

    export interface IStateProps {
        errors: string;
        session: USER_SESSION;
    }

    namespace Actions {
        export interface IMapPayload {}

        export interface IMapResponse {}

        export interface IGetLoginPayload extends LoginModel.GetLoginPayload {
            params: {};
        }

        export interface IGetLoginResponse extends LoginModel.GetLoginResponse {
        }
    }
}

export { ILoginPage };
