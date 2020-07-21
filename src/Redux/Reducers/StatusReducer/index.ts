// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IStatusPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IStatusPage.IStateProps = {
    error: '',
    comments: []
};

export const StatusReducer = (
        state = INITIAL_STATE,
        action: IAction<IStatusPage.Actions.IMapAllComments & 
            IStatusPage.Actions.IMapPostComment &
            IStatusPage.Actions.IMapLikeComment>
    ) => {
    switch (action.type) {
        case ActionConsts.Status.GetAllCommentsSuccess: {
            const { comments } = action.payload!;
            if (comments)
                return Object.assign({}, state, {
                    comments: [...state.comments, ...comments]
                });
            else
                return state;
        }
        case ActionConsts.Status.GetAllCommentsError: {
            return Object.assign({}, state, {
                error: 'Error occured fetching comments',
                comments: state.comments
            });
        }
        case ActionConsts.Status.PostCommentSuccess: {
            const { comment } = action.payload!;
            return Object.assign({}, state, {
                comments: comment ? [...state.comments, comment] : state.comments
            });
        }
        case ActionConsts.Status.PostCommentError: {
            return Object.assign({}, state, {
                error: "Error occured adding comment"
            });
        }
        case ActionConsts.Status.LikeCommentSuccess: {
            const { commentId, like } = action.payload!;
            const commentsWithLike = state.comments.map((o, i) => {
                if (o.id === commentId) {
                    if (o.likesCount) {
                        like ? o.likesCount++ : o.likesCount--;
                        like ? o.content_viewer_like = true : o.content_viewer_like = false;
                    } else {
                        o.likesCount = 1;
                        o.content_viewer_like = true;
                    }
                }
                return o;
            });
            return Object.assign({}, state, {
                comments: commentsWithLike
            });
        }
        case ActionConsts.Status.LikeCommentError: {
            return Object.assign({}, state, {
                error: "Error occured liking comment"
            });
        }
        default:
            return state;
    }
};
