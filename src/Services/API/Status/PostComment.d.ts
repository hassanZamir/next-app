// #region Interface Imports
import { PostCommentPayload, PostCommentResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace PostCommentModel {
    export interface GetPostCommentPayload extends PostCommentPayload {}

    export interface GetPostCommentResponse extends PostCommentResponse {}
}

export { PostCommentModel };
