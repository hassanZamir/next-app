// #region Local Imports
import { Http, getQueryParams } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import {  GETStatementsModel } from "@Interfaces";
// #endregion Interface Imports

export const StatementsServices = {
    GetStatements: async (
        payload: GETStatementsModel.GetGETStatementsPayload
    ): Promise<GETStatementsModel.GetGETStatementsResponse> => {
        let response: GETStatementsModel.GetGETStatementsResponse;

        const { userId, authtoken, ...rest } = payload;
      
        try {
            response = await Http.UserAuthRequest<GETStatementsModel.GetGETStatementsResponse>(
                "GET",
                "/user-transactions/" + userId + getQueryParams({ ...rest }),
                authtoken,
                undefined
            );
        } catch (error) {
            response = {
                status: true,
                response: {
                    data: {
                        summary: {
                            balance: 0.0,
                            pending: 0.0,
                        },
                        transactions: {
                            transactionid: "",
                            transactionCategory: 1,
                            transactionType: 1,
                            transactionHeading: "",
                            transactionTitle: "",
                            transactionDescription: "",
                            transactionTimestamp: "",
                            transactionMode: 1,
                            transactionAmount: 1,
                            transactionStatus: 1,
                        },
                    },
                }
            };
        }
        return response;
    },
}