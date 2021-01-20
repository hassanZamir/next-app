// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService, CreatorProfileService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import {
    ISignUpPage,
    ILoginPage,
    IAccountVerifyPage,
    IProfilePage,
    ISettingsPage,
    USER_SESSION,
} from "@Interfaces";
// #endregion Interface Imports

export const LoginActions = {
    TokenVerify: (payload: ILoginPage.Actions.ITokenVerifyPayload) => async (dispatch: Dispatch) => {
        let response: ILoginPage.Actions.ITokenVerifyResponse;
        response = await LoginService.TokenVerify(payload);
        const currentSession: USER_SESSION = payload.session;
        const newSession: USER_SESSION = response.session;

        // only reload if the refresh call has happened and we have new refresh token changed
        // avoid null == null on successfull token verify call
        if (response.status && response.authenticated && currentSession.refreshToken
            && newSession.refreshToken && currentSession.refreshToken != newSession.refreshToken) {
            // console.log("ActionTokenVerify: Token Refreshed");
            // reload the site
            dispatch({
                payload: response,
                type: ActionConsts.Login.ReloadPage
            });
        }
        else {
            // console.log("ActionTokenVerify: Token Valid");

            dispatch({
                payload: response,
                type: response.authenticated
                    ? ActionConsts.Login.UpdateSession
                    : ActionConsts.Login.ClearSession,
            });
        }


    },
    UserLogin: (payload: ILoginPage.Actions.IGetLoginPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.Login({
            params: payload.params,
        });

        dispatch({
            payload: result,
            type: result.authenticated
                ? ActionConsts.Login.SetUserPayload
                : ActionConsts.Login.SetLoginError,
        });

        if (result.authenticated)
            dispatch({
                payload: result,
                type: ActionConsts.Login.OnLoginSucess,
            });
    },
    UserLogout: () => async (dispatch: Dispatch) => {
        dispatch({
            payload: {},
            type: ActionConsts.Login.DoLogout,
        });
    },
    UserSignUp: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.SignUp(payload);

        const errors = Object.keys(result.errors)
            .map(key => {
                if (result.errors[key].length > 0)
                    return {
                        field: key,
                        message:
                            result.errors[key][0].message ||
                            result.errors[key][0].meassage,
                    };
            })
            .filter(elem => {
                return elem;
            });

        dispatch({
            payload:
                result.account_created && errors.length <= 0
                    ? payload
                    : { errors: errors },
            type:
                result.account_created && errors.length <= 0
                    ? ActionConsts.SignUp.SignUpSuccess
                    : ActionConsts.SignUp.SignUpError,
        });
    },
    checkUserNameAvailability: (
        payload: ISignUpPage.Actions.IGetSignUpPayload
    ) => async () => {
        const result = await LoginService.SignUp(payload);

        const errors = Object.keys(result.errors)
            .map(key => {
                if (result.errors[key].length > 0)
                    return {
                        field: key,
                        message:
                            result.errors[key][0].message ||
                            result.errors[key][0].meassage,
                    };
            })
            .filter(elem => {
                return elem;
            });

        return {
            errors: errors.length <= 0 ? [] : errors,
        };
    },
    AccountVerify: (
        payload: IAccountVerifyPage.Actions.IGetAccountVerifyPayload
    ) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionConsts.AccountVerify.SetLoading,
            payload: null,
        });

        const result = await LoginService.AccountVefify(payload);

        dispatch({
            payload: result,
            type: result.status
                ? ActionConsts.AccountVerify.AccountVerifySuccess
                : ActionConsts.AccountVerify.AccountVerifyError,
        });
    },
    GetCreatorProfile: (
        payload: IProfilePage.Actions.IGetCreatorProfilePayload
    ) => async (dispatch: Dispatch) => {
        const result = await CreatorProfileService.GetActiveCreatorProfile(payload);

        dispatch({
            payload: { profile: result.response },
            type: result.status
                ? ActionConsts.Login.GetCreatorProfileSuccess
                : ActionConsts.Login.GetCreatorProfileError,
        });
    },
    SendResetPasswordEmail: (
        payload: ILoginPage.Actions.IGetSendResetPasswordEmailPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.SendResetPasswordEmail(payload);

        dispatch({
            payload: result,
            type: result.status
                ? ActionConsts.Login.SendResetPasswordEmailSuccess
                : ActionConsts.Login.SendResetPasswordEmailError,
        });
    },
    onCloseResetPasswordModal: () => async (dispatch: Dispatch) => {
        dispatch({
            payload: null,
            type: ActionConsts.Login.onCloseResetPasswordModal,
        });
    },
    ChangePassword: (
        payload: ILoginPage.Actions.IGetChangePasswordPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.ChangePassword(payload);

        dispatch({
            payload: result,
            type: result.status
                ? ActionConsts.Login.ChangePasswordSuccess
                : ActionConsts.Login.ChangePasswordError,
        });
    },
    ClearChangePasswordStatus: () => async (dispatch: Dispatch) => {
        dispatch({
            payload: "",
            type: ActionConsts.Login.ClearChangePasswordStatus,
        });
    },
    ChangeUsername: (
        payload: ILoginPage.Actions.IPutUsernamePayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.ChangeUsername(payload);

        dispatch({
            payload: result,
            type: result.status
                ? ActionConsts.Login.ChangePasswordSuccess
                : ActionConsts.Login.ChangePasswordError,
        });
    },
    ChangePasswordFromSettings: (
        payload: ILoginPage.Actions.IPutPasswordPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.ChangePasswordUsingOldPassword(payload);

        dispatch({
            payload: result,
            type: result.status
                ? ActionConsts.Login.ChangePasswordFromSettingsSuccess
                : ActionConsts.Login.ChangePasswordFromSettingsError,
        });
    },
};
