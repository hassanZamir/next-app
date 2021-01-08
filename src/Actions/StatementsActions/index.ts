// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { StatementsServices } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IStatementsPage } from "@Interfaces";
// #endregion Interface Imports

export const StatementsAction = {
    GetStatements: (
        payload: IStatementsPage.Actions.IGetGETStatementsPayload
    ) => async (dispatch: Dispatch) => {
        const result = await StatementsServices.GetStatements(payload);
        dispatch({
            payload: {
                StatementsDetail: result.status ? result : [],
            },
            type:
                result.status && result.response
                    ? ActionConsts.Statements.GetStatementsSuccess
                    : ActionConsts.Statements.GetStatementError,
        });
    },
};
