// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { BankAccountService, LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IBankingInfoPage } from "@Interfaces";
// #endregion Interface Imports

export const BankingInfoActions = {
    GetBankAccountInfo: (payload: IBankingInfoPage.Actions.IGetBankAccountInfoPayload) => async (dispatch: Dispatch) => {
        const result = await BankAccountService.GetBankAccountInfo(payload);
        dispatch({
            payload:
                result.status && !result.errors
                    ? "Success"
                    : result.errors,
            type: result.status
                ? ActionConsts.BankingInfo.GetBankAccountInfoSuccess
                : ActionConsts.BankingInfo.GetBankAccountInfoError,
        });
    },
    PostBankAccountInfo: (payload: IBankingInfoPage.Actions.IPostBankAccountInfoPayload) => async (dispatch: Dispatch) => {
        const result = await BankAccountService.PostBankAccountInfo(payload);
        dispatch({
            payload:
                result.status && !result.errors
                    ? "Success"
                    : result.errors,
            type: result.status
                ? ActionConsts.BankingInfo.PostBankAccountInfoSuccess
                : ActionConsts.BankingInfo.PostBankAccountInfoError,
        });
    },
    PostPersonalInformation: (
        payload: IBankingInfoPage.Actions.IGetPostPersonalInformationPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostPersonalInformation(payload);
        dispatch({
            payload:
                result.status && !result.error
                    ? "Success"
                    : result.error,
            type: result.status
                ? ActionConsts.BankingInfo.PostBankingInfoSuccess
                : ActionConsts.BankingInfo.PostBankingInfoError,
        });
    },
    GetPersonalInformation: (payload: IBankingInfoPage.Actions.IGetGETPersonalInformationPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await LoginService.GetPersonalInformation(payload);
        dispatch({
            payload: { personalInformation: result.status && result.response ? result.response : {} },
            type: result.status && result.response ? ActionConsts.BankingInfo.GetBankingInfoSuccess : null
        });
    }
}