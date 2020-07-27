// #region Interface Imports
import { GetPaymentSettingsApiPayload, GetPaymentSettingsApiResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace PaymentSettingsModel {
    export interface GetPaymentSettingsPayload extends GetPaymentSettingsApiPayload {}
    export interface GetPaymentSettingsResponse extends GetPaymentSettingsApiResponse {}

}

export { PaymentSettingsModel };
