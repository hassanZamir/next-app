// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    IStatementsPage,
    CREATOR_PROFILE,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IStatementsPage.IStateProps = {
    loading: true,
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    defaultStatementsInformation: {},
};

export const StatementsReducer = (
    state = INITIAL_STATE,
    action: IAction<IStatementsPage.Actions.IMapGetStatements & any>
) => {
    switch (action.type) {
        case ActionConsts.Statements.GetStatementsSuccess: {
            let StatementsDetail = action.payload.StatementsDetail;
            return Object.assign({}, state, {
                loading: false,
                defaultStatementsInformation: StatementsDetail,
            });
        }
        case ActionConsts.Statements.GetStatementError: {
            return Object.assign({}, state, {
                loading: false,
                errors: ["Error getting transactions"],
            });
        }
        case ActionConsts.Statements.ClearDefaultStatements: {
            return Object.assign({}, state, {
                loading: true,
                defaultStatementsInformation: {},
                errors: [""],
            });
        }
        default:
            return state;
    }
};
