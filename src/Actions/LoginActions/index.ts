// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService, CreatorProfileService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage, ILoginPage, IAccountVerifyPage, IProfilePage } from "@Interfaces";
// #endregion Interface Imports

export const LoginActions = {
    UserLogin: (payload: ILoginPage.Actions.IGetLoginPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.Login({
            params: payload.params,
        });
        
        dispatch({
            payload: result,
            type: result.authenticated ? ActionConsts.Login.SetUserPayload : ActionConsts.Login.SetLoginError
        });
    },
    UserLogout: () => async (
        dispatch: Dispatch
    ) => {
        debugger;
        dispatch({
            payload: {},
            type: ActionConsts.Login.DoLogout
        });
    },
    UserSignUp: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.SignUp(payload);
        
        const errors = Object.keys(result.errors).map((key) => {
            if (result.errors[key].length > 0)
                return {
                    field: key,
                    message: result.errors[key][0].message || result.errors[key][0].meassage
                };
        })
        .filter((elem) => { return elem; });
        
        dispatch({
            payload: result.account_created && errors.length <= 0 ? payload : { errors: errors },
            type: result.account_created && errors.length <= 0 ? ActionConsts.SignUp.SignUpSuccess : ActionConsts.SignUp.SignUpError
        });
    },
    checkUserNameAvailability: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async () => {
        const result = await LoginService.SignUp(payload);
        
        const errors = Object.keys(result.errors).map((key) => {
            if (result.errors[key].length > 0)
                return {
                    field: key,
                    message: result.errors[key][0].message || result.errors[key][0].meassage
                };
        })
        .filter((elem) => { return elem; });
        
        return {
            errors: errors.length <= 0 ? [] : errors,
        }
    },
    AccountVerify: (payload: IAccountVerifyPage.Actions.IGetAccountVerifyPayload) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            type: ActionConsts.AccountVerify.SetLoading,
            payload: null
        });
        
        const result = await LoginService.AccountVefify(payload);
    
        dispatch({
            payload: result,
            type: result.status ? ActionConsts.AccountVerify.AccountVerifySuccess : ActionConsts.AccountVerify.AccountVerifyError
        });
    },
    GetCreatorProfile: (payload: IProfilePage.Actions.IGetCreatorProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetCreatorProfile(payload);
        
        dispatch({
            payload: { profile: result.response },
            type: result.status ? ActionConsts.Login.GetCreatorProfileSuccess : ActionConsts.Login.GetCreatorProfileError
        });
    },
    SendResetPasswordEmail: (payload: ILoginPage.Actions.IGetSendResetPasswordEmailPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.SendResetPasswordEmail(payload);
        
        dispatch({
            payload: result,
            type: result.status ? ActionConsts.Login.SendResetPasswordEmailSuccess : ActionConsts.Login.SendResetPasswordEmailError
        });
    },
    onCloseResetPasswordModal: () => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: null,
            type: ActionConsts.Login.onCloseResetPasswordModal
        });
    },
    ChangePassword: (payload: ILoginPage.Actions.IGetChangePasswordPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.ChangePassword(payload);
        
        dispatch({
            payload: result,
            type: result.status ? ActionConsts.Login.ChangePasswordSuccess : ActionConsts.Login.ChangePasswordError
        });
    }
};
