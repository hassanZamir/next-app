// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IFeedsPage, IFeed } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFeedsPage.IStateProps = {
    errors: '',
    feeds: []
};

export const FeedsReducer = (
    state = INITIAL_STATE,
    action: IAction<IFeedsPage.Actions.IGetAllFeedsResponse & IFeed.Actions.ILikeFeedPayload>
) => {
    switch (action.type) {
        case ActionConsts.Feeds.GetAllFeedsSuccess: {
            let { feeds } = action.payload!;

            return Object.assign({}, state, {
                feeds: feeds
            });
        }
        case ActionConsts.Feeds.GetAllFeedsError: {
            let { errors } = action.payload!;

            return Object.assign({}, state, {
                errors: errors ? errors : "Authentication failed for these credentials",
                feeds: []
            });
        }
        case ActionConsts.Feeds.LikeFeedSuccess: {
            let { contentId } = action.payload!;
            const { feeds } = state;

            const _updatedFeeds = feeds.map((feed) => {
                feed.id === contentId && (feed.contentLiked = true)
                return feed;
            });
            return Object.assign({}, state, {
                errors: "",
                feeds: _updatedFeeds
            });
        }
        case ActionConsts.Feeds.LikeFeedError: {
            return state;
        }
        default:
            return state;
    }
};
