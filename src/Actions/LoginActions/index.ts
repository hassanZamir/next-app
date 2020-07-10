// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage, ILoginPage } from "@Interfaces";
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
    UserSignUp: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.SignUp({
            params: payload.params,
        });
        
        const errors = Object.keys(result.errors).map((key) => {
            if (result.errors[key].length > 0)
                return {
                    field: key,
                    message: result.errors[key][0].message || result.errors[key][0].meassage
                };
        })
        .filter((elem) => { return elem; });
        
        dispatch({
            payload: result.account_created && errors.length <= 0 ? result : {errors: errors},
            type: result.account_created && errors.length <= 0 ? ActionConsts.SignUp.SignUpSuccess : ActionConsts.SignUp.SignUpError
        });
    },
    checkUserNameAvailability: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async () => {
        const result = await LoginService.SignUp({
            params: payload.params,
        });
        
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
    }
};
