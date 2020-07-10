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
    action: IAction<ISignUpPage.Actions.IGetSignUpResponse>
) => {
    switch (action.type) {
        case ActionConsts.SignUp.SignUpSuccess: {
            return Object.assign({}, state, {
                successMessage: "A verification email has been sent to use. Please verify."
            });
        }
        case ActionConsts.SignUp.SignUpError: {
            let { errors } = action.payload!;
            
            return Object.assign({}, state, {
                errors: errors[0]
            });
        }
        default:
            return state;
    }
};
