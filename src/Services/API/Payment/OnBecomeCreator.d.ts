// #region Interface Imports
import { OnBecomeCreatorPayload, OnBecomeCreatorResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace OnBecomeCreatorModel {
    export interface GetOnBecomeCreatorPayload extends OnBecomeCreatorPayload {}
    export interface GetOnBecomeCreatorResponse extends OnBecomeCreatorResponse {}

}

export { OnBecomeCreatorModel };
