// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { StatusService, FeedsService } from "@Services";
import { IStatusPage } from "@Interfaces";

export const StatusActions = {
    GetComments: (payload: IStatusPage.Actions.IGetAllCommentsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await StatusService.GetAllComments(payload);

        dispatch({
            payload: result.status ? { comments: result.response, pageNo: payload.pageNo } : { comments: [], pageNo: 0 },
            type: result.status ? ActionConsts.Status.GetAllCommentsSuccess : ActionConsts.Status.GetAllCommentsError
        });
    },
    PostComment: (payload: IStatusPage.Actions.IGetPostCommentPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await StatusService.PostComment(payload);

        if (result.status) {
            dispatch({
                payload: {},
                type: result.status ? ActionConsts.Status.UpdatePersistFeedCommentCount : ''
            });
        }
        dispatch({
            payload: result.status ? { comment: result.response } : { comment: {} },
            type: result.status ? ActionConsts.Status.PostCommentSuccess : ActionConsts.Status.PostCommentError
        });
    },
    LikeComment: (payload: IStatusPage.Actions.IGetLikeCommentPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await StatusService.LikeComment(payload);

        dispatch({
            payload: result.status ? { commentId: payload.commentId, like: true } : { commentId: null },
            type: result.status ? ActionConsts.Status.LikeCommentSuccess : ActionConsts.Status.LikeCommentError
        });
    },
    UnLikeComment: (payload: IStatusPage.Actions.IGetLikeCommentPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await StatusService.UnLikeComment(payload);

        dispatch({
            payload: result.status ? { commentId: payload.commentId, like: false } : { commentId: null },
            type: result.status ? ActionConsts.Status.LikeCommentSuccess : ActionConsts.Status.LikeCommentError
        });
    },
    GetFeed: (payload: IStatusPage.Actions.IGetGetFeedPayload) => async (dispatch: Dispatch) => {
        const result = await FeedsService.GetFeed(payload);

        dispatch({
            payload: { feed: result.status && result.response ? result.response : {} },
            type: ActionConsts.Feeds.SetPolledPersistFeed
        });
    }
};