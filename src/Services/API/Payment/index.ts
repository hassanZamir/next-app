// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import {
    OnBecomeCreatorModel,
    PaymentSettingsModel,
    AddCardModel,
    UpdatePaymentSettingsModel,
    AddFundsToWalletModel,
} from "@Interfaces";
// #endregion Interface Imports

export const PaymentService = {
    FormDigest: async (payload: PaymentSettingsModel.IPaymentFormdigestPayload): Promise<PaymentSettingsModel.IPaymentFormdigestResponse> => {
        let response: PaymentSettingsModel.IPaymentFormdigestResponse;
        try {
            response = await Http.FEAPIRequest<PaymentSettingsModel.IPaymentFormdigestResponse>(
                'POST',
                "/api/formdigest",
                undefined,
                { ...payload }
            );
        } catch (error) {
            response = {
                status: false,
                data: {
                    formdigest: ""
                },
                error: "Something went wrong"

            }
        }
        return response;
    },
    GetPaymentSettings: async (
        payload: PaymentSettingsModel.GetPaymentSettingsPayload
    ): Promise<PaymentSettingsModel.GetPaymentSettingsResponse> => {
        let response: PaymentSettingsModel.GetPaymentSettingsResponse;

        try {
            response = await Http.UserAuthRequest<PaymentSettingsModel.GetPaymentSettingsResponse>(
                "GET",
                "/user-payment/" + payload.userId,
                payload.authtoken
            );
        } catch (error) {
            response = {
                status: true,
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0,
                    },
                    userWallet: {
                        balance: 0.0,
                    },
                    userCard: [
                        {
                            id: 2,
                            userId: 10,
                            cardNumber: "12345678910112",
                            cardTitle: "John",
                            cvc: 1234,
                            expMonth: 12,
                            expYear: 10,
                            cardType: "",
                        },
                    ],
                },
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
                {
                    cardTitle: payload.cardTitle,
                    cardNumber: payload.cardNumber,
                    expMonth: payload.expMonth,
                    expYear: payload.expYear,
                    cvc: payload.cvc,
                }
            );
        } catch (error) {
            response = {
                status: false,
                error: "Api Failed",
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0,
                    },
                    userWallet: {
                        balance: 0,
                    },
                    userCard: [],
                },
            };
        }
        return response;
    },
    UpdatePaymentSettings: async (
        payload: UpdatePaymentSettingsModel.GetUpdatePaymentSettingsPayload
    ): Promise<UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse> => {
        let response: UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse;
        let params = <{ paymentMode: number; defaultCard: number }>{};

        payload.paymentMode && (params.paymentMode = payload.paymentMode);
        payload.defaultCard && (params.defaultCard = payload.defaultCard);
        try {
            response = await Http.UserAuthRequest<UpdatePaymentSettingsModel.GetUpdatePaymentSettingsResponse>(
                "POST",
                "/user-payment/" + payload.userId,
                payload.authtoken,
                undefined,
                params
            );
        } catch (error) {
            response = {
                status: false,
                error: "Api Failed",
                response: {
                    userSettings: {
                        paymentMode: 0,
                        defaultCard: 0,
                    },
                    userWallet: {
                        balance: 0,
                    },
                    userCard: [],
                },
            };
        }
        return response;
    },
    AddFundsToWallet: async (
        payload: AddFundsToWalletModel.GetAddFundsToWalletPayload
    ): Promise<AddFundsToWalletModel.GetAddFundsToWalletResponse> => {
        let response: AddFundsToWalletModel.GetAddFundsToWalletResponse;

        try {
            response = await Http.UserAuthRequest<AddFundsToWalletModel.GetAddFundsToWalletResponse>(
                "POST",
                "/user-payment/" + payload.userId + "/wallet",
                payload.authtoken,
                undefined,
                { amount: payload.amount }
            );
        } catch (error) {
            response = {
                status: false,
                balance: 0.0,
            };
        }
        return response;
    },
    OnBecomeCreator: async (
        payload: OnBecomeCreatorModel.GetOnBecomeCreatorPayload
    ): Promise<OnBecomeCreatorModel.GetOnBecomeCreatorResponse> => {
        let response: OnBecomeCreatorModel.GetOnBecomeCreatorResponse;

        try {
            response = await Http.Request<
                OnBecomeCreatorModel.GetOnBecomeCreatorResponse
            >("POST", "/profiles/" + payload.userName + "/upgrade", undefined);
        } catch (error) {
            response = {
                status: false,
            };
        }
        return response;
    },
};
