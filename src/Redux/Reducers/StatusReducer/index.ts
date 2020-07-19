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
            return Object.assign({}, state, {
                comments: comments
            });
        }
        case ActionConsts.Status.GetAllCommentsError: {
            return Object.assign({}, state, {
                error: 'Error occured fetching comments',
                comments: []
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
            const { commentId } = action.payload!;
            const commentsWithLike = state.comments.map((o, i) => {
                if (o.id === commentId) {
                    if (o.likesCount) {
                        o.likesCount++;
                    } else {
                        o.likesCount = 1;
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
