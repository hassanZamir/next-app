// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IPayment, PAYMENT_USER_SETTINGS, PAYMENT_CARD, PAYMENT_USER_WALLET  } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IPayment.IStateProps = {
    paymentSettingsError: '',
    addCardError: '',
    paymentSettings: {
        userSettings: <PAYMENT_USER_SETTINGS>{},
        userWallet: <PAYMENT_USER_WALLET>{},
        userCard: []
    }
};

export const PaymentReducer = (
    state = INITIAL_STATE,
    action: IAction<IPayment.Actions.IMapPaymentSettingsResponse
        & IPayment.Actions.IMapAddFundsToWalletResponse>
    ) => {
    switch (action.type) {
        case ActionConsts.Payment.AddFundsToWalletSuccess: {
            const { balance } = action.payload!;
            return Object.assign({}, state, {
                paymentSettings: {userWallet: balance},
                paymentSettingsError: ''
            });
        }
        case ActionConsts.Payment.AddFundsToWalletError: {
            const { error } = action.payload!;
            return Object.assign({}, state, {
                paymentSettingsError: error || 'Error adding funds to wallet'
            });
        }
        case ActionConsts.Payment.UpdatePaymentSettingsSuccess: {
            const { paymentSettings } = action.payload!;
            return Object.assign({}, state, {
                paymentSettings: paymentSettings,
                paymentSettingsError: ''
            });
        }
        case ActionConsts.Payment.UpdatePaymentSettingsError: {
            const { error } = action.payload!;
            return Object.assign({}, state, {
                paymentSettingsError: error || 'Error updating payment info'
            });
        }
        case ActionConsts.Payment.GetPaymentSettingsSuccess: {
            const { paymentSettings } = action.payload!;
            return Object.assign({}, state, {
                paymentSettings: paymentSettings,
                paymentSettingsError: ''
            });
        }
        case ActionConsts.Payment.GetPaymentSettingsError: {
            return Object.assign({}, state, {
                paymentSettingsError: 'Error getting payment settings'
            });
        }
        case ActionConsts.Payment.AddCardSuccess: {
            const { paymentSettings } = action.payload!;
            return Object.assign({}, state, {
                paymentSettings: paymentSettings,
                addCardError: ''
            });
        }
        case ActionConsts.Payment.AddCardError: {
            const { error } = action.payload!;
            return Object.assign({}, state, {
                addCardError: error || 'Error Adding Card'
            });
        }
        case ActionConsts.Payment.OnModalClosePaymentSettings: {
            return Object.assign({}, state, {
                addCardError: '',
                paymentSettingsError: ''
            });
        }
        default:
            return state;
    }
};
