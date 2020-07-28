// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { PaymentSettingsModel, AddCardModel, UpdatePaymentSettingsModel, AddFundsToWalletModel } from "@Interfaces";
// #endregion Interface Imports

export const PaymentService = {
    GetPaymentSettings: async (
        payload: PaymentSettingsModel.GetPaymentSettingsPayload
    ): Promise<PaymentSettingsModel.GetPaymentSettingsResponse> => {
        let response: PaymentSettingsModel.GetPaymentSettingsResponse;

        try {
            response = await Http.Request<PaymentSettingsModel.GetPaymentSettingsResponse>(
                "GET",
                "/user-payment/" + payload.userId,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0
                    },
                    userWallet: {
                        balance: 220.0
                    },
                    userCard: [{
                        id: 2,
                        userId: 10,
                        cardNumber: "12345678910112",
                        cardTitle: "sohaib",
                        cvc: 1234,
                        expMonth: 12,
                        expYear: 10,
                        cardType: ""
                    }]
                }
            };
        }
        return response;
    },
    AddCard: async (
        payload: AddCardModel.GetAddCardPayload
    ): Promise<AddCardModel.GetAddCardResponse> => {
        let response: AddCardModel.GetAddCardResponse;

        try {
            response = await Http.Request<AddCardModel.GetAddCardResponse>(
                "POST",
                "/user-payment/" + payload.userId + "/cards",
                undefined,
                { cardTitle: payload.cardTitle, cardNumber: payload.cardNumber, expMonth: payload.expMonth, 
                expYear: payload.expYear, cvc: payload.cvc}
            );
        } catch (error) {
            response = {
                status: false,
                error: 'Api Failed',
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0
                    },
                    userWallet: {
                        balance: 0
                    },
                    userCard: []
                }
            };
        }
        return response;
    },
    UpdatePaymentSettings: async (
        payload: UpdatePaymentSettingsModel.GetUpdatePaymentSettingsPayload
    ): Promise<UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse> => {
        let response: UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse;
        let params = <{paymentMode: number, defaultCard: number }>{};

        payload.paymentMode && (params.paymentMode = payload.paymentMode);
        payload.defaultCard && (params.defaultCard = payload.defaultCard);
        debugger;
        try {
            response = await Http.Request<UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse>(
                "POST",
                "/user-payment/" + payload.userId,
                undefined,
                params
            );
        } catch (error) {
            response = {
                status: false,
                error: 'Api Failed',
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0
                    },
                    userWallet: {
                        balance: 0
                    },
                    userCard: []
                }
            };
        }
        return response;
    },
    AddFundsToWallet: async (
        payload: AddFundsToWalletModel.GetAddFundsToWalletPayload
    ): Promise<AddFundsToWalletModel.GetAddFundsToWalletResponse> => {
        let response: AddFundsToWalletModel.GetAddFundsToWalletResponse;
        
        try {
            response = await Http.Request<AddFundsToWalletModel.GetAddFundsToWalletResponse>(
                "POST",
                "/user-payment/" + payload.userId + "/wallet",
                undefined,
                { amount: payload.amount }
            );
        } catch (error) {
            response = {
                status: false,
                balance: 0.00
            };
        }
        return response;
    }
};
