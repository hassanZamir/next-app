// #region Local Imports
import { ActionConsts } from "@Definitions";
import Router from "next/router";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IAccountVerifyPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IAccountVerifyPage.IStateProps = {
    loading: false,
    message: {
        text: '',
        type: ''
    }
};

export const AccountVerifyReducer = (
    state = INITIAL_STATE,
    action: IAction<IAccountVerifyPage.Actions.IGetAccountVerifyResponse>
) => {
    switch (action.type) {
        case ActionConsts.AccountVerify.SetLoading: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case ActionConsts.AccountVerify.AccountVerifySuccess: {
            return Object.assign({}, state, {
                loading: false,
                message: {
                    text: 'Account verified successfuly',
                    type: 'success'
                }
            });
        }
        case ActionConsts.AccountVerify.AccountVerifyError: {
            let { error } = action.payload!;

            return Object.assign({}, state, {
                loading: false,
                message: {
                    text: error || "Account can't be verified. Please try again",
                    type: 'error'
                }
            });
        }
        default:
            return state;
    }
};
