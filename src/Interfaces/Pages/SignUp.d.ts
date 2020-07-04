import { SignUpModel } from "@Services/API/Login/SignUp";

declare namespace ISignUpPage {
    export interface IProps {}

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {
        errors: string;
    }

    namespace Actions {
        export interface IMapPayload {}

        export interface IMapResponse {}

        export interface IGetSignUpPayload extends SignUpModel.GetSignUpPayload {
            params: {};
        }

        export interface IGetSignUpResponse extends SignUpModel.GetSignUpResponse {}
    }
}

export { ISignUpPage };
