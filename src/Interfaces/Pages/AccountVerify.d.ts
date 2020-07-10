import { AccountVerifyModel } from "@Interfaces";

declare namespace IAccountVerifyPage {
    export interface IProps {}

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {
        loading: boolean;
        message: {
            text: string;
            type: string;
        }
    }

    namespace Actions {
        export interface IGetAccountVerifyPayload extends AccountVerifyModel.GetAccountVerifyPayload {}

        export interface IGetAccountVerifyResponse extends AccountVerifyModel.GetAccountVerifyResponse {}
    }
}

export { IAccountVerifyPage };
