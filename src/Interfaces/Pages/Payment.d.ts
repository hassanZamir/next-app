import { PaymentSettingsModel, AddCardModel } from "@Interfaces";

declare namespace IPayment {
    export interface IProps {}

    export interface IStateProps {
        error: string;
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

        export interface IGetPaymentSettingsPayload extends PaymentSettingsModel.GetPaymentSettingsPayload {}
        export interface IGetPaymentSettingsResponse extends PaymentSettingsModel.GetPaymentSettingsResponse {}

        export interface IGetAddCardPayload extends AddCardModel.GetAddCardPayload {}
        export interface IGetAddCardResponse extends AddCardModel.GetAddCardResponse {}
    }
}

export { IPayment };
