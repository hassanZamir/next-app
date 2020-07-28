import { PaymentSettingsModel, AddCardModel, UpdatePaymentSettingsModel, AddFundsToWalletModel } from "@Interfaces";

declare namespace IPayment {
    export interface IProps {}

    export interface IStateProps {
        paymentSettingsError: string;
        addCardError: string;
        paymentSettings: {
            userSettings: PAYMENT_USER_SETTINGS,
            userWallet: PAYMENT_USER_WALLET,
            userCard: PAYMENT_CARD[]
        }
    }

    namespace Actions {
        export interface IMapPaymentSettingsResponse {
            error: string;
            paymentSettings: {
                userSettings: PAYMENT_USER_SETTINGS,
                userWallet: PAYMENT_USER_WALLET,
                userCard: PAYMENT_CARD[]
            }
        }

        export interface IMapAddFundsToWalletResponse {
            error: string;
            balance: number;
        }

        export interface IGetPaymentSettingsPayload extends PaymentSettingsModel.GetPaymentSettingsPayload {}
        export interface IGetPaymentSettingsResponse extends PaymentSettingsModel.GetPaymentSettingsResponse {}

        export interface IGetAddCardPayload extends AddCardModel.GetAddCardPayload {}
        export interface IGetAddCardResponse extends AddCardModel.GetAddCardResponse {}

        export interface IGetUpdatePaymentSettingsPayload extends UpdatePaymentSettingsModel.GetUpdatePaymentSettingsPayload {}
        export interface IGetUpdatePaymentSettingsResponse extends UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse {}

        export interface IGetAddFundsToWalletPayload extends AddFundsToWalletModel.GetAddFundsToWalletPayload {}
        export interface IGetAddFundsToWalletResponse extends AddFundsToWalletModel.GetAddFundsToWalletResponse {}
    }
}

export { IPayment };
