// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE = {};


export const HomeReducer = (
    state = INITIAL_STATE,
    action: IAction<{}>
) => {
    switch (action.type) {
        case ActionConsts.Home.SetReducer:
            return {
                ...state,
                ...action.payload,
            };

        case ActionConsts.Home.ResetReducer:
            return INITIAL_STATE;

        default:
            return state;
    }
};
