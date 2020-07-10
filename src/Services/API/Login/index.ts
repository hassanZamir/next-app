// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { LoginModel, SignUpModel, AccountVerifyModel } from "@Interfaces";
import { async } from "q";
// #endregion Interface Imports

export const LoginService = {
    Login: async (
        payload: LoginModel.GetLoginPayload
    ): Promise<LoginModel.GetLoginResponse> => {
        let response: LoginModel.GetLoginResponse;

        try {
            response = await Http.Request<LoginModel.GetLoginResponse>(
                "POST",
                "/accounts/login",
                undefined,
                payload.params
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: "false",
                session: {
                    id: 0,
                    name: '',
                    username: '',
                    email: '',
                    country: '',
                    birthDate: '',
                    isCreator: false
                },
                authenticated: false,
                errors: "Something went wrong"
            };
        }
        return response;
    },
    SignUp: async (
        payload: SignUpModel.GetSignUpPayload
    ): Promise<SignUpModel.GetSignUpResponse> => {
        let response: SignUpModel.GetSignUpResponse;

        try {
            response = await Http.Request<SignUpModel.GetSignUpResponse>(
                "POST",
                "/accounts/register",
                undefined,
                payload.params
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: "false",
                account_created: false,
                errors: {
                    "network": [
                        {
                            "meassage": "Something Went Wrong.",
                            "code": "network_error"
                        }
                    ]
                }
            };
        }
        return response;
    },
    AccountVefify: async (
        payload: AccountVerifyModel.GetAccountVerifyPayload
    ): Promise<AccountVerifyModel.GetAccountVerifyResponse> => {
        let response: AccountVerifyModel.GetAccountVerifyResponse;

        try {
            response = await Http.Request<AccountVerifyModel.GetAccountVerifyResponse>(
                "POST",
                "/user/email/verify",
                undefined,
                {...payload}
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong"
            };
        }
        return response;
    }
};
