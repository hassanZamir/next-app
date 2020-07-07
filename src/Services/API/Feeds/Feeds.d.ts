// #region Interface Imports
import { AllFeedsPayload, AllFeedsResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace FeedsModel {
    export interface GetAllFeedsPayload extends AllFeedsPayload {}

    export interface GetAllFeedsResponse extends AllFeedsResponse {}
}

export { FeedsModel };
