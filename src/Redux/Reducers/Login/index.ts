// #region Local Imports
import { ActionConsts } from "@Definitions";
import Router from "next/router";
// #endregion Local Imports

// #region Interface Imports
import { IAction, ILoginPage, USER_SESSION, IProfilePage, CREATOR_PROFILE } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: ILoginPage.IStateProps = {
    errors: '',
    session: <USER_SESSION>{},
    creatorProfile: <CREATOR_PROFILE>{},
    sendResetPasswordEmailStatus: '',
    resetPasswordStatus: ''
};

const getInitialState = () => {
    try {
        const loggedIn = (typeof window !== "undefined" ? window.localStorage.getItem('persist:root') : false);
        if (loggedIn) {
            return JSON.parse(JSON.parse(loggedIn).loginSuccess)
        }        
    } catch(e) {
        return INITIAL_STATE;
    } finally {
        return INITIAL_STATE;
    }
}

export const LoginSuccessReducer = (
    state = getInitialState(),
    action: IAction<ILoginPage.Actions.IGetLoginResponse>
) => {
    switch (action.type) {
        case ActionConsts.Login.SetUserPayload: {
            let { session } = action.payload!;
            Router.push("/");

            return Object.assign({}, state, {
                errors: "",
                session: session
            });
        }
        default:
            return state;
    }
};

export const LoginErrorReducer = (
    state = INITIAL_STATE,
    action: IAction<ILoginPage.Actions.IGetLoginResponse & 
        IProfilePage.Actions.IGetCreatorProfileResponse & 
        ILoginPage.Actions.IGetSendResetPasswordEmailResponse &
        ILoginPage.Actions.IGetChangePasswordResponse>
    ) => {
    switch (action.type) {
        case ActionConsts.Login.ChangePasswordSuccess: {
            return Object.assign({}, state, {
                resetPasswordStatus: 'success'
            });
        }
        case ActionConsts.Login.ChangePasswordError: {
            return Object.assign({}, state, {
                resetPasswordStatus: 'error'
            });
        }
        case ActionConsts.Login.SendResetPasswordEmailSuccess: {
            return Object.assign({}, state, {
                sendResetPasswordEmailStatus: 'success'
            });
        }
        case ActionConsts.Login.SendResetPasswordEmailError: {
            return Object.assign({}, state, {
                sendResetPasswordEmailStatus: 'error',
            });
        }
        case ActionConsts.Login.GetCreatorProfileSuccess: {
            let { profile } = action.payload!;

            return Object.assign({}, state, {
                creatorProfile: profile
            });
        }
        case ActionConsts.Login.GetCreatorProfileError: {
            let { errors } = action.payload!;

            return Object.assign({}, state, {
                errors: errors ? errors : "Couldn't load creator profile.",
            });
        }
        case ActionConsts.Login.SetLoginError: {
            let { errors } = action.payload!;

            return Object.assign({}, state, {
                errors: errors ? errors : "Authentication failed for these credentials.",
                session: {}
            });
        }
        default:
            return state;
    }
};
