// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { PaymentService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IPayment } from "@Interfaces";
// #endregion Interface Imports

export const PaymentActions = {
    GetPaymentSettings: (payload: IPayment.Actions.IGetPaymentSettingsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await PaymentService.GetPaymentSettings(payload);

        dispatch({
            payload: { paymentSettings: result.status ? result.response : null },
            type: result.status ? ActionConsts.Payment.GetPaymentSettingsSuccess : ActionConsts.Payment.GetPaymentSettingsError
        });
    },
    AddCard: (payload: IPayment.Actions.IGetAddCardPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await PaymentService.AddCard(payload);
debugger;
        if (result.status) {
            dispatch({
                payload: { paymentSettings: result.response },
                type: ActionConsts.Payment.UpdatePaymentInfoInSession
            })
        }
        dispatch({
            payload: result.status ? { paymentSettings: result.response } : {error: result.error} ,
            type: result.status ? ActionConsts.Payment.AddCardSuccess : ActionConsts.Payment.AddCardError
        });
    }
};
