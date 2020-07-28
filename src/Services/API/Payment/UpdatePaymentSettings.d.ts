// #region Interface Imports
import { UpdateUserPaymentSettingsPayload, UpdatePaymentSettingsResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace UpdatePaymentSettingsModel {
    export interface GetUpdatePaymentSettingsPayload extends UpdateUserPaymentSettingsPayload {}
    export interface GetUpdatePaymentSettingsResponse extends UpdatePaymentSettingsResponse {}

}

export { UpdatePaymentSettingsModel };
