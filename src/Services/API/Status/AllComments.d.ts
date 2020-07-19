// #region Interface Imports
import { AllCommentsPayload, AllCommentsResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace AllCommentsModel {
    export interface GetAllCommentsPayload extends AllCommentsPayload {}

    export interface GetAllCommentsResponse extends AllCommentsResponse {}
}

export { AllCommentsModel };
