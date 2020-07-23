import { AllCommentsModel, COMMENT, PostCommentModel, LikeCommentModel } from "@Interfaces";

declare namespace IStatusPage {
    export interface IProps {}

    export interface IStateProps {
        comments: COMMENT[];
        error: string;
    }

    namespace Actions {
        export interface IMapAllComments {
            comments: COMMENT[]
            pageNo: number;
        }
        export interface IMapPostComment {
            comment: COMMENT
        }
        export interface IMapLikeComment {
            commentId: number;
            like: boolean;
        }
        
        export interface IGetAllCommentsPayload extends AllCommentsModel.GetAllCommentsPayload {}
        export interface IGetAllCommentsResponse extends AllCommentsModel.GetAllCommentsResponse {}

        export interface IGetPostCommentPayload extends PostCommentModel.GetPostCommentPayload {}
        export interface IGetPostCommentResponse extends PostCommentModel.GetPostCommentResponse {}

        export interface IGetLikeCommentPayload extends LikeCommentModel.GetLikeCommentPayload {}
        export interface IGetLikeCommentResponse extends LikeCommentModel.GetLikeCommentResponse {}
    }
}

export { IStatusPage };
