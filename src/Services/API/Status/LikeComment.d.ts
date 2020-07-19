// #region Interface Imports
import { LikeCommentPayload, LikeCommentResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace LikeCommentModel {
    export interface GetLikeCommentPayload extends LikeCommentPayload {}

    export interface GetLikeCommentResponse extends LikeCommentResponse {}
}

export { LikeCommentModel };
