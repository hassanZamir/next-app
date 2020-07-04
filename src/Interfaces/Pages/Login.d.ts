import { LoginModel } from "@Services/API/Login/Login";

declare namespace ILoginPage {
    export interface IProps {}

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {
        errors: string;
        session: {};
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
