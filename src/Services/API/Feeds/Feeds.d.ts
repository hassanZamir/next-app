// #region Interface Imports
import { AllFeedsPayload, AllFeedsResponse, TipFeedPayload, TipFeedResponse, LikeFeedPayload, LikeFeedResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace FeedsModel {
    export interface GetAllFeedsPayload extends AllFeedsPayload {}
    export interface GetAllFeedsResponse extends AllFeedsResponse {}

    export interface GetTipFeedPayload extends TipFeedPayload {}
    export interface GetTipFeedResponse extends TipFeedResponse {}

    export interface GetLikeFeedPayload extends LikeFeedPayload {}
    export interface GetLikeFeedResponse extends LikeFeedResponse {}
}

export { FeedsModel };
