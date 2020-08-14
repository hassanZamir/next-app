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
    UpdatePaymentSettings: (payload: IPayment.Actions.IGetUpdatePaymentSettingsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await PaymentService.UpdatePaymentSettings(payload);
        if (result.status) {
            dispatch({
                payload: { paymentSettings: result.response },
                type: ActionConsts.Payment.UpdatePaymentInfoInSession
            });
        }
        dispatch({
            payload: result.status ? { paymentSettings: result.response } : {error: "Error updating card info"} ,
            type: result.status ? ActionConsts.Payment.UpdatePaymentSettingsSuccess : ActionConsts.Payment.UpdatePaymentSettingsError
        });
    },
    AddCard: (payload: IPayment.Actions.IGetAddCardPayload, onAddCardSuccess: ()=>void) => async (
        dispatch: Dispatch
    ) => {
        const result = await PaymentService.AddCard(payload);
        if (result.status) {
            dispatch({
                payload: { paymentSettings: result.response },
                type: ActionConsts.Payment.UpdatePaymentInfoInSession
            });
            onAddCardSuccess();
        }
        dispatch({
            payload: result.status ? { paymentSettings: result.response } : {error: result.error} ,
            type: result.status ? ActionConsts.Payment.AddCardSuccess : ActionConsts.Payment.AddCardError
        });
    },
    AddFundsToWallet: (payload: IPayment.Actions.IGetAddFundsToWalletPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await PaymentService.AddFundsToWallet(payload);
        
        dispatch({
            payload: result.status ? { balance: result.balance } : { error: "Error adding funds to wallet" } ,
            type: result.status ? ActionConsts.Payment.AddFundsToWalletSuccess : ActionConsts.Payment.AddFundsToWalletError
        });
    },
    OnModalClosePaymentSettings: () => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: null,
            type: ActionConsts.Payment.OnModalClosePaymentSettings
        });
    },
    // OnBecomeCreator: (payload: IPayment.Actions.IGetOnBecomeCreatorPayload) => async (
    //     dispatch: Dispatch
    // ) => {
    //     const result = await PaymentService.OnBecomeCreator(payload);
    //     dispatch({
    //         payload: null,
    //         type: result.status ? ActionConsts.Payment.OnBecomeCreatorSuccess : ''
    //     });
    // }
};
