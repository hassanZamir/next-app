// #region Interface Imports
import { GetPaymentSettingsApiPayload, GetPaymentSettingsApiResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace PaymentSettingsModel {
    export interface GetPaymentSettingsPayload extends GetPaymentSettingsApiPayload { }
    export interface GetPaymentSettingsResponse extends GetPaymentSettingsApiResponse { }

    export interface IPaymentFormdigestPayload {
        type: number;
        followingFee: string;
        followingPeriod: number;
        currencyCode: string; // string instead of number  due to object literal issue
        recurringPrice: string;
        recurringPeriod: number;
        rebills: number;
    }
    export interface IPaymentFormdigestResponse {
        status: boolean,
        data: {
            formdigest: string;
        },
        error: {}
    }
}

export { PaymentSettingsModel };
