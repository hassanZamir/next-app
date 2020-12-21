// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import {
    LoginModel,
    SignUpModel,
    AccountVerifyModel,
    SendResetPasswordEmailModel,
    ChangePasswordModel,
    PostPersonalInformationModel,
    GETPersonalInformationModel,
    GETFollowersInformationModel,
    PostRestrictFollowersModel,
    PostUnRestrictFollowersModel,
    PostBlockedFollowersModel,
    PostUnBlockedFollowersModel,
    PostFavouriteFollowersModel,
    PostUnFavouriteFollowersModel,
    GETFollowingInformationModel,
    PUTRecurringFollowingModel,
    DeleteAccountModel,
    USER_SESSION,
} from "@Interfaces";
// #endregion Interface Imports

export const LoginService = {
    TokenVerify: async (payload: LoginModel.VerifyTokenPayload): Promise<LoginModel.VerifyTokenResponse> => {
        let result: LoginModel.VerifyTokenResponse;
        const session: USER_SESSION = payload.session;

        try {
            result = await Http.UserAuthRequest<LoginModel.VerifyTokenResponse>(
                "POST",
                `/accounts/${session.id}/auth/verify`,
                session.token,
                undefined,
                session
            )
        }
        catch (error) {
            if (error.status == 401) {
                console.info("Session Expired, Trying Token Refresh...");
                try {
                    //refresh the token
                    result = await Http.UserAuthRequest<LoginModel.VerifyTokenResponse>(
                        "POST",
                        `/accounts/${session.id}/auth/refresh`,
                        session.token,
                        undefined,
                        {
                            token: session.token,
                            refreshToken: session.refreshToken
                        }
                    )
                } catch (error) {
                    console.info("Token refresh failed. Please log in again.");
                    result = {
                        status: false,
                        authenticated: false,
                        error: error,
                        session: null
                    }
                }
            }
            else {
                result = {
                    status: false,
                    authenticated: false,
                    error: error,
                    session: null
                }
                return result;
            }
        }
        return result;
    },
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
                    notificationCount: 0,
                    id: 0,
                    name: "",
                    username: "",
                    profileImageUrl: "",
                    email: "",
                    country: "",
                    birthDate: "",
                    isCreator: false,
                    verifyEmail: 0,
                    paymentMode: 0,
                    cardNumber: "",
                    cardTitle: "",
                    followersCount: 0,
                    token: "",
                    refreshToken: "",
                },
                authenticated: false,
                errors: "Something went wrong",
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
                { ...payload }
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: "false",
                account_created: false,
                errors: {
                    network: [
                        {
                            meassage: "Something Went Wrong.",
                            code: "network_error",
                        },
                    ],
                },
            };
        }
        return response;
    },
    AccountVefify: async (
        payload: AccountVerifyModel.GetAccountVerifyPayload
    ): Promise<AccountVerifyModel.GetAccountVerifyResponse> => {
        let response: AccountVerifyModel.GetAccountVerifyResponse;

        try {
            response = await Http.Request<
                AccountVerifyModel.GetAccountVerifyResponse
            >("POST", "/accounts/verify", undefined, { ...payload });
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },
    SendResetPasswordEmail: async (
        payload: SendResetPasswordEmailModel.GetSendResetPasswordEmailPayload
    ): Promise<
        SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse
    > => {
        let response: SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse;
        try {
            response = await Http.Request<
                SendResetPasswordEmailModel.GetSendResetPasswordEmailResponse
            >("POST", "/accounts/password/reset", undefined, { ...payload });
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },
    ChangePassword: async (
        payload: ChangePasswordModel.GetChangePasswordPayload
    ): Promise<ChangePasswordModel.GetChangePasswordResponse> => {
        let response: ChangePasswordModel.GetChangePasswordResponse;
        try {
            response = await Http.Request<
                ChangePasswordModel.GetChangePasswordResponse
            >("POST", "/accounts/password/update", undefined, { ...payload });
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },
    // ChangePasswordFromSettings: async (
    //     payload: ChangePasswordModel.PutPasswordPayload
    // ): Promise<ChangePasswordModel.PutPasswordResponse> => {
    //     let response: ChangePasswordModel.PutPasswordResponse;
    //     try {
    //         response = await Http.Request<
    //             ChangePasswordModel.PutPasswordResponse
    //         >("PUT", "api/accounts/password", undefined, { ...payload });
    //     } catch (error) {
    //         response = {
    //             status: false,
    //             error: "Something went wrong",
    //         };
    //     }
    //     return response;
    // },

    DeleteAccount: async (
        payload: DeleteAccountModel.DeleteAccountPayload
    ): Promise<DeleteAccountModel.DeleteAccountResponse> => {
        let response: DeleteAccountModel.DeleteAccountResponse;
        try {
            response = await Http.Request<
                DeleteAccountModel.DeleteAccountResponse
            >("DELETE", "api/accounts", undefined, { ...payload });
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },

    PutRecurringFollower: async (
        payload: PUTRecurringFollowingModel.GetPUTRecurringFollowingPayload
    ): Promise<PUTRecurringFollowingModel.PUTRecurringFollowingResponse> => {
        let restructurePayload: any = {};
        restructurePayload["autoRenew"] = payload["autoRenew"];
        restructurePayload["userId"] = payload["userId"];

        let response: PUTRecurringFollowingModel.PUTRecurringFollowingResponse;
        try {
            response = await Http.UserAuthRequest<
                PUTRecurringFollowingModel.PUTRecurringFollowingResponse
            >("PUT", `/users/${payload.username}/auto-renewal`, payload.authtoken, undefined, {
                ...restructurePayload,
            });
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },
    PostPersonalInformation: async (
        payload: PostPersonalInformationModel.GetPostPersonalInformationPayload
    ): Promise<
        PostPersonalInformationModel.GetPostPersonalInformationResponse
    > => {
        let response: PostPersonalInformationModel.GetPostPersonalInformationResponse;
        const { authtoken, ...rest } = payload;
        let restPayload = { ...rest };
        try {
            response = await Http.UserAuthRequest<
                PostPersonalInformationModel.GetPostPersonalInformationResponse
            >("POST", "/accounts/" + payload.userId + "/banking", payload.authtoken, undefined, {
                restPayload
            });
        } catch (error) {
            response = {
                status: false,
                error: "Something went wrong",
            };
        }
        return response;
    },
    GetPersonalInformation: async (
        payload: GETPersonalInformationModel.GetGETPersonalInformationPayload
    ): Promise<
        GETPersonalInformationModel.GetGETPersonalInformationResponse
    > => {
        let response: GETPersonalInformationModel.GetGETPersonalInformationResponse;
        try {
            response = await Http.UserAuthRequest<
                GETPersonalInformationModel.GetGETPersonalInformationResponse
            >("GET", "/accounts/" + payload.userid + "/banking", payload.authtoken);
        } catch (error) {
            response = {
                status: false,
                response: {
                    firstName: "",
                    lastName: "",
                    street: "",
                    city: "",
                    state: "",
                    postCode: 11111,
                    country: "",
                    dob: "",
                    docType: 1,
                    docPhoto: "",
                    docUserPhoto: "",
                    docNumber: "",
                    docExpiry: "",
                },
            };
        }
        return response;
    },
    GetFollowersInformation: async (
        payload: GETFollowersInformationModel.GetGETFollowersInformationPayload
    ): Promise<
        GETFollowersInformationModel.GetGETFollowersInformationResponse
    > => {
        let response: GETFollowersInformationModel.GetGETFollowersInformationResponse;
        try {
            response = await Http.UserAuthRequest<
                GETFollowersInformationModel.GetGETFollowersInformationResponse
            >(
                "GET",
                `/users/${payload.username}/followers?type=` + payload.type,
                payload.authtoken
            );
        } catch (error) {
            response = {
                status: false,
                type: 0,
                response: {
                    name: "",
                    username: "",
                    profileImageUrl: "",
                    coverImageUrl: "",
                    favourite: false,
                    currentSubscriptionFee: 0,
                    startDate: "",
                    renewDate: "",
                    recurringFollower: true,
                    earnings: {
                        tips: 0.0,
                        messages: 0.0,
                        subscription: 0.0,
                    },
                },
            };
        }
        return response;
    },
    GetFollowingInformation: async (
        payload: GETFollowingInformationModel.GetGETFollowingInformationPayload
    ): Promise<
        GETFollowingInformationModel.GetGETFollowingInformationResponse
    > => {
        console.log(payload);
        const filter = payload.filterUsername ? `&filterUsername=${payload.filterUsername}` : "";
        let response: GETFollowingInformationModel.GetGETFollowingInformationResponse;
        try {
            response = await Http.UserAuthRequest<
                GETFollowingInformationModel.GetGETFollowingInformationResponse
            >(
                "GET",
                `/users/${payload.username}/followings?type=${payload.type}${filter}`,
                payload.authtoken
            );
        } catch (error) {
            response = {
                status: false,
                type: 0,
                response: {
                    state: 0,
                    username: "",
                    name: "",
                    isFollowing: false,
                    profileImageUrl: "",
                    coverImageUrl: "",
                    subscription: {},
                },
            };
        }
        return response;
    },
    PostRestrictFollower: async (
        payload: PostRestrictFollowersModel.GetPostRestrictFollowersPayload
    ): Promise<PostRestrictFollowersModel.GetPostRestrictFollowersResponse> => {
        let response: PostRestrictFollowersModel.GetPostRestrictFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostRestrictFollowersModel.GetPostRestrictFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/restrict`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
    PostUnRestrictFollower: async (
        payload: PostUnRestrictFollowersModel.GetPostUnRestrictFollowersPayload
    ): Promise<
        PostUnRestrictFollowersModel.GetPostUnRestrictFollowersResponse
    > => {
        let response: PostUnRestrictFollowersModel.GetPostUnRestrictFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostUnRestrictFollowersModel.GetPostUnRestrictFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/unrestrict`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
    PostBlockedFollower: async (
        payload: PostBlockedFollowersModel.GetPostBlockedFollowersPayload
    ): Promise<PostBlockedFollowersModel.GetPostBlockedFollowersResponse> => {
        let response: PostBlockedFollowersModel.GetPostBlockedFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostBlockedFollowersModel.GetPostBlockedFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/block`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
    PostUnBlockedFollower: async (
        payload: PostUnBlockedFollowersModel.GetPostUnBlockedFollowersPayload
    ): Promise<
        PostUnBlockedFollowersModel.GetPostUnBlockedFollowersResponse
    > => {
        let response: PostUnBlockedFollowersModel.GetPostUnBlockedFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostUnBlockedFollowersModel.GetPostUnBlockedFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/unblock`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
    PostFavouriteFollower: async (
        payload: PostFavouriteFollowersModel.GetPostFavouriteFollowersPayload
    ): Promise<
        PostFavouriteFollowersModel.GetPostFavouriteFollowersResponse
    > => {
        let response: PostFavouriteFollowersModel.GetPostFavouriteFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostFavouriteFollowersModel.GetPostFavouriteFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/favourite`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
    PostUnFavouriteFollower: async (
        payload: PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersPayload
    ): Promise<
        PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersResponse
    > => {
        let response: PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersResponse;
        try {
            response = await Http.UserAuthRequest<
                PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersResponse
            >(
                "POST",
                `/users/${payload.username}/unfavourite`,
                payload.authtoken,
                undefined,
                {
                    ...payload,
                }
            );
        } catch (error) {
            response = {
                response: {
                    type: "",
                    title: "",
                    status: "string",
                    traceId: "string",
                },
            };
        }
        return response;
    },
};
