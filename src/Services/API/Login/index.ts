// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { LoginModel, SignUpModel, AccountVerifyModel, SendResetPasswordEmailModel, ChangePasswordModel, PostPersonalInformationModel } from "@Interfaces";
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
        } catch (error) {
            response = {
                status: "false",
                session: {
                    id: 0,
                    name: '',
                    username: '',
                    profileImageUrl: '',
                    email: '',
                    country: '',
                    birthDate: '',
                    isCreator: false,
                    verifyEmail: 0,
                    paymentMode: 0,
                    cardNumber: '',
                    cardTitle: ''
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
                {...payload}
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
                "/accounts/verify",
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
    },
    SendResetPasswordEmail: async (
        payload: SendResetPasswordEmailModel.GetSendResetPasswordEmailPayload
    ): Promise<SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse> => {
        let response: SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse;
        try {
            response = await Http.Request<SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse>(
                "POST",
                "/accounts/password/reset",
                undefined,
                {...payload}
            );
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong"
            };
        }
        return response;
    },
    ChangePassword: async (
        payload: ChangePasswordModel.GetChangePasswordPayload
    ): Promise<ChangePasswordModel.GetChangePasswordResponse> => {
        let response: ChangePasswordModel.GetChangePasswordResponse;
        try {
            response = await Http.Request<ChangePasswordModel.GetChangePasswordResponse>(
                "POST",
                "/accounts/password/update",
                undefined,
                {...payload}
            );
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong"
            };
        }
        return response;
    },
    PostPersonalInformation: async (
        payload: PostPersonalInformationModel.GetPostPersonalInformationPayload
    ): Promise<PostPersonalInformationModel.GetPostPersonalInformationResponse> => {
        let response: PostPersonalInformationModel.GetPostPersonalInformationResponse;
        try {
            response = await Http.Request<PostPersonalInformationModel.GetPostPersonalInformationResponse>(
                "POST",
                "/accounts/" + payload.userId + "/banking",
                undefined,
                {...payload}
            );
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong"
            };
        }
        return response;
    }
};
