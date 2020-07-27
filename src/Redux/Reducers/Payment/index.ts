// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IPayment, PAYMENT_USER_SETTINGS, PAYMENT_CARD, PAYMENT_USER_WALLET  } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IPayment.IStateProps = {
    error: '',
    paymentSettings: {
        userSettings: <PAYMENT_USER_SETTINGS>{},
        userWallet: <PAYMENT_USER_WALLET>{},
        userCard: []
    }
};

export const PaymentReducer = (
    state = INITIAL_STATE,
    action: IAction<IPayment.Actions.IMapPaymentSettingsResponse>
    ) => {
    switch (action.type) {
        case ActionConsts.Payment.GetPaymentSettingsSuccess: {
            const { paymentSettings } = action.payload!;
            return Object.assign({}, state, {
                paymentSettings: paymentSettings
            });
        }
        case ActionConsts.Payment.GetPaymentSettingsError: {
            return Object.assign({}, state, {
                error: 'Error getting payment settings'
            });
        }
        case ActionConsts.Payment.AddCardSuccess: {
            const { paymentSettings } = action.payload!;
            console.log("paymentSettings", paymentSettings);
            return Object.assign({}, state, {
                paymentSettings: paymentSettings
            });
        }
        case ActionConsts.Payment.AddCardError: {
            const { error } = action.payload!;
            return Object.assign({}, state, {
                error: error || 'Error Adding Card'
            });
        }
        default:
            return state;
    }
};
