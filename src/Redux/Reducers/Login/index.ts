// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, ILoginPage } from "@Interfaces";
import { debug } from "webpack";
import { act } from "@Test/utils";
// #endregion Interface Imports

const INITIAL_STATE: ILoginPage.IStateProps = {
    errors: '',
    session: {}
};

export const LoginReducer = (
    state = INITIAL_STATE,
    action: IAction<ILoginPage.Actions.IGetLoginResponse>
) => {
    switch (action.type) {
        case ActionConsts.Login.SetUserPayload: {
            let { session } = action.payload!;
            localStorage.setItem("user", JSON.stringify(session));

            return Object.assign({}, state, {
                errors: "",
                session: session
            });
        }
        case ActionConsts.Login.SetLoginError: {
            let { errors } = action.payload!;

            return Object.assign({}, state, {
                errors: errors ? errors : "Authentication failed for these credentials",
                session: {}
            });
        }
        default:
            return state;
    }
};