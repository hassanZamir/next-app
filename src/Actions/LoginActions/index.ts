// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage, ILoginPage } from "@Interfaces";
import Router from "next/router";
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

        if (result.authenticated) Router.push("/");
    },
    UserSignUp: (payload: ISignUpPage.Actions.IGetSignUpPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.SignUp({
            params: payload.params,
        });
        
        debugger;
        dispatch({
            payload: result,
            type: result.account_created ? ActionConsts.SignUp.SignUpSuccess : ActionConsts.SignUp.SignUpError
        });
    }
};
