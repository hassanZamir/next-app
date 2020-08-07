// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IFeedsPage, IFeed, FEED } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFeedsPage.IStateProps = {
    errors: '',
    postContentStatus: 'default',
    feeds: [],
    profilesSuggestion: []
};

export const FeedsReducer = (
    state = INITIAL_STATE,
    action: IAction<IFeedsPage.Actions.IMapAllFeedsResponse 
        & IFeed.Actions.IMapLikefeed
        & IFeedsPage.Actions.IMapProfilesSuggestionResponse
        & IFeedsPage.Actions.IMapPostContentResponse>
) => {
    switch (action.type) {
        case ActionConsts.Feeds.PostContentSuccess: {
            let { feed } = action.payload!;

            return Object.assign({}, state, {
                feeds: [feed[0], ...state.feeds],
                errors: '',
                postContentStatus: 'success'
            });
        }
        case ActionConsts.Feeds.PostContentError: {
            return Object.assign({}, state, {
                errors: 'Post content failed',
                postContentStatus: 'error'
            });
        }
        case ActionConsts.Feeds.UploadMediaError: {
            return Object.assign({}, state, {
                errors: action.payload || 'Upload media failed'
            });
        }
        case ActionConsts.Feeds.ProfilesSuggestionSuccess: {
            let { profiles } = action.payload!;

            return Object.assign({}, state, {
                profilesSuggestion: profiles,
                errors: ''
            });
        }
        case ActionConsts.Feeds.ProfilesSuggestionError: {
            return Object.assign({}, state, {
                errors: "Error getting profiles suggestion"
            });
        }
        case ActionConsts.Feeds.GetAllFeedsSuccess: {
            let { feeds } = action.payload!;

            return Object.assign({}, state, {
                feeds: feeds,
                errors: ''
            });
        }
        case ActionConsts.Feeds.GetAllFeedsError: {
            return Object.assign({}, state, {
                errors: "Something went wrong.",
                feeds: []
            });
        }
        case ActionConsts.Feeds.LikeFeedSuccess: {
            let { contentId, like } = action.payload!;
            const { feeds } = state;

            const _updatedFeeds = feeds.map((feed) => {
                if (feed.id === contentId) {
                    feed.content_viewer_like = (like ? true : false);
                    like ? feed.likesCount++ : feed.likesCount--
                }
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

