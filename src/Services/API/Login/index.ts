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
} from "@Interfaces";
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
    PutRecurringFollower: async (
        payload: PUTRecurringFollowingModel.GetPUTRecurringFollowingPayload
    ): Promise<PUTRecurringFollowingModel.PUTRecurringFollowingResponse> => {
        let restructurePayload: any = {};
        restructurePayload["autoRenew"] = payload["autoRenew"];
        restructurePayload["userId"] = payload["userId"];

        let response: PUTRecurringFollowingModel.PUTRecurringFollowingResponse;
        try {
            response = await Http.Request<
                PUTRecurringFollowingModel.PUTRecurringFollowingResponse
            >("PUT", `/users/${payload.username}/auto-renewal`, undefined, {
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
        try {
            response = await Http.Request<
                PostPersonalInformationModel.GetPostPersonalInformationResponse
            >("POST", "/accounts/" + payload.userId + "/banking", undefined, {
                ...payload,
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
            response = await Http.Request<
                GETPersonalInformationModel.GetGETPersonalInformationResponse
            >("GET", "/accounts/" + payload.userId + "/banking");
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
                    country: "pakistan",
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
                `/profiles/${payload.username}/followers?type=` + payload.type,
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
        let response: GETFollowingInformationModel.GetGETFollowingInformationResponse;
        try {
            response = await Http.UserAuthRequest<
                GETFollowingInformationModel.GetGETFollowingInformationResponse
            >(
                "GET",
                `/users/${payload.username}/followings?type=` + payload.type,
                payload.authtoken,
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
            response = await Http.Request<
                PostRestrictFollowersModel.GetPostRestrictFollowersResponse
            >("POST", `/users/${payload.username}/restrict`, undefined, {
                ...payload,
            });
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
            response = await Http.Request<
                PostUnRestrictFollowersModel.GetPostUnRestrictFollowersResponse
            >("POST", `/users/${payload.username}/unrestrict`, undefined, {
                ...payload,
            });
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
            response = await Http.Request<
                PostBlockedFollowersModel.GetPostBlockedFollowersResponse
            >("POST", `/users/${payload.username}/block`, undefined, {
                ...payload,
            });
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
            response = await Http.Request<
                PostUnBlockedFollowersModel.GetPostUnBlockedFollowersResponse
            >("POST", `/users/${payload.username}/unblock`, undefined, {
                ...payload,
            });
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
            response = await Http.Request<
                PostFavouriteFollowersModel.GetPostFavouriteFollowersResponse
            >("POST", `/users/${payload.username}/favourite`, undefined, {
                ...payload,
            });
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
            response = await Http.Request<
                PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersResponse
            >("POST", `/users/${payload.username}/unfavourite`, undefined, {
                ...payload,
            });
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
