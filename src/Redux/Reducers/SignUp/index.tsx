// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, ISignUpPage } from "@Interfaces";
// #endregion Interface Imports

import Router from "next/router";
const INITIAL_STATE: ISignUpPage.IStateProps = {
    successMessage: '',
    errors: {
        field: '',
        message: ''
    }
};

export const SignUpReducer = (
    state = INITIAL_STATE,
    action: IAction<ISignUpPage.Actions.IGetSignUpResponse & ISignUpPage.Actions.IGetSignUpPayload>
) => {
    switch (action.type) {
        case ActionConsts.SignUp.SignUpSuccess: {
            const { email } = action.payload!;
            
            Router.push({
                pathname: '/login',
                query: { modal: 'check-your-email', email: email },
            });
            return Object.assign({}, state, {
                successMessage: "A verification email has been sent at " + email + ". Please verify your email and login.",
                errors: {
                    field: '',
                    message: ''
                }
            });
        }
        case ActionConsts.SignUp.SignUpError: {
            let { errors } = action.payload!;
            
            return Object.assign({}, state, {
                errors: errors[0],
                successMessage: ''
            });
        }
        default:
            return state;
    }
};
