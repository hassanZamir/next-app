// #region Interface Imports
import { ReportFeedPayload, ReportFeedResponse, AllFeedsPayload, AllFeedsResponse, TipFeedPayload, TipFeedResponse, LikeFeedPayload, LikeFeedResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace FeedsModel {
    export interface GetAllFeedsPayload extends AllFeedsPayload {}
    export interface GetAllFeedsResponse extends AllFeedsResponse {}

    export interface GetTipFeedPayload extends TipFeedPayload {}
    export interface GetTipFeedResponse extends TipFeedResponse {}

    export interface GetLikeFeedPayload extends LikeFeedPayload {}
    export interface GetLikeFeedResponse extends LikeFeedResponse {}

    export interface GetReportFeedPayload extends ReportFeedPayload {}
    export interface GetReportFeedResponse extends ReportFeedResponse {}
}

export { FeedsModel };
