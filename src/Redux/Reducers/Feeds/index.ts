// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IFeedsPage, IFeed, FEED, CREATOR_PROFILE } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFeedsPage.IStateProps = {
    errors: '',
    postContentStatus: 'default',
    feeds: {
        paginationNo: 0,
        emptyPageNo: 9999,
        value: []
    },
    newPost: <FEED>{},
    profilesSuggestion: [],
    profilesSuggestionEnd: false,
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
            // console.log("Reducer-payload: ", action.payload);
            const feed = action.payload!.feed;
            // console.log("Reducer-feed: ", feed);
            //console.log("Reducer-feeds: ", state);

            return Object.assign({}, state, {
                newPost: feed ? feed[0] : <FEED>{},
                postContentStatus: feed ? 'success' : 'error'
            });
            // if (!feed) return Object.assign({}, state, {
            //     feeds: {
            //         value: state.feeds.value,
            //         emptyPaginationNo: state.feeds.emptyPageNo,
            //         paginationNo: state.feeds.paginationNo
            //     },
            //     errors: 'Post content failed',
            //     postContentStatus: 'error'
            // // });
            // return Object.assign({}, state, {
            //     feeds.value: state.feeds.value,
            //     errors: 'Post content failed',
            //     postContentStatus: 'error'
            // });
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
            let newProfiles: CREATOR_PROFILE[] = [];

            // avoiding duplicates
            profiles.forEach((item: CREATOR_PROFILE) => {
                if (state.profilesSuggestion.findIndex(x => x.userName == item.userName) === -1)
                    newProfiles.push(item);
            });


            return Object.assign({}, state, {
                profilesSuggestion: [...state.profilesSuggestion, ...newProfiles],
                profilesSuggestionEnd: profiles.length === 0 ? true : false,
                errors: ''
            });
        }
        case ActionConsts.Feeds.ProfilesSuggestionError: {
            return Object.assign({}, state, {
                errors: "Error getting profiles suggestion"
            });
        }
        case ActionConsts.Feeds.GetAllFeedsSuccess: {
            let { feeds, page } = action.payload!;

            if (feeds && feeds.length > 0) {
                return Object.assign({}, state, {
                    feeds: {
                        value: [...state.feeds.value, ...feeds],
                        paginationNo: page + 1,
                        emptyPageNo: state.feeds.paginationNo
                    },
                    errors: ''
                });
            }
            return Object.assign({}, state, {
                feeds: {
                    value: state.feeds.value,
                    paginationNo: page,
                    emptyPageNo: page
                },
                errors: ''
            });
        }
        case ActionConsts.Feeds.GetAllFeedsError: {
            return Object.assign({}, state, {
                errors: "Something went wrong.",
                feeds: state.feeds
            });
        }
        case ActionConsts.Feeds.LikeFeedSuccess: {
            let { contentId, like } = action.payload!;
            const { feeds } = state;

            const _updatedFeeds = feeds.value.map((feed) => {
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

