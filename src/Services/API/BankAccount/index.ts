import { IBankingInfoPage } from "@Interfaces";
import { Http } from "../Http";

export const BankAccountService = {
    PostBankAccountInfo: async (
        payload: IBankingInfoPage.Actions.IPostBankAccountInfoPayload
    ): Promise<IBankingInfoPage.Actions.IPostBankAccountInfoResponse> => {
        let response: IBankingInfoPage.Actions.IPostBankAccountInfoResponse;
        let { authtoken, ...params } = payload;
        try {
            response = await Http.UserAuthRequest<IBankingInfoPage.Actions.IPostBankAccountInfoResponse>(
                "POST",
                `/accounts/${payload.userId}/banking`,
                authtoken,
                undefined,
                { ...params }
            );
        } catch (error) {
            response = {
                status: false,
                errors: "Something went wrong",
                response: {},
            };
        }
        return response;
    },
    GetBankAccountInfo: async (
        payload: IBankingInfoPage.Actions.IGetBankAccountInfoPayload
    ): Promise<IBankingInfoPage.Actions.IGetBankAccountInfoResponse> => {
        let response: IBankingInfoPage.Actions.IGetBankAccountInfoResponse;
        let { authtoken, ...params } = payload;
        try {
            response = await Http.UserAuthRequest<IBankingInfoPage.Actions.IGetBankAccountInfoResponse>(
                "GET",
                `/accounts/${payload.userid}/banking`,
                authtoken
            );
        } catch (error) {
            response = {
                status: false,
                errors: "Something went wrong",
                response: {
                    bankTitle: "",
                    bankType: "",
                    bankName: "",
                    bankAccount: 0,
                    bankCode: "",
                    bankAddress: "",
                    bankCity: "",
                    bankState: "",
                    bankCountry: "",
                    bankPostalCode: "",
                    state: 0
                },
            };
        }
        return response;
    },
}