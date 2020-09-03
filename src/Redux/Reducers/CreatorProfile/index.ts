// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IProfilePage, FEED, CREATOR_PROFILE, mediaUrl } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IProfilePage.IStateProps = {
    emptyPageNoFeeds: 9999,
    emptyPageNoImage: 9999,
    emptyPageNoVideo: 9999,
    mediaGallary: new Array<mediaUrl>(),
    errors: '',
    creatorProfile: <CREATOR_PROFILE>{},
    creatorFeeds: new Array<FEED>(),
    followers: []
};

export const CreatorProfileReducer = (
    state = INITIAL_STATE,
    action: IAction<IProfilePage.Actions.IMapCreatorFeedsResponse & 
        IProfilePage.Actions.IMapCreatorProfileResponse & 
        IProfilePage.Actions.IMapProfileFollowersResponse &
        IProfilePage.Actions.IMapMediaGallaryResponse>
) => {
    switch (action.type) {
        // case ActionConsts.CreatorProfile.TabChanged: {
        //     return Object.assign({}, state, {
        //         mediaGallary: [],
        //         creatorFeeds: [],
        //         errors: ""
        //     });
        // }
        case ActionConsts.CreatorProfile.GetMediaGallarySuccess: {
            let { mediaGallary, type, page } = action.payload!;

            if (mediaGallary.length) {
                return Object.assign({}, state, {
                    mediaGallary: [...state.mediaGallary, ...mediaGallary],
                    errors: ""
                });
            } else {
                if (type === 1) return Object.assign({}, state, { emptyPageNoImage: page });
                if (type === 2) return Object.assign({}, state, { emptyPageNoVideo: page });
            }
        }
        case ActionConsts.CreatorProfile.GetMediaGallaryError: {
            return Object.assign({}, state, {
                errors: "Error getting media gallary."
            });
        }
        case ActionConsts.CreatorProfile.GetProfileFollowersSuccess: {
            let { followers, hasFollowed, hasUnFollowed } = action.payload!;

            return Object.assign({}, state, {
                followers: followers,
                creatorProfile: Object.assign({}, state.creatorProfile, {
                    followersCount: hasFollowed ? state.creatorProfile.followersCount + 1 
                    : hasUnFollowed ? state.creatorProfile.followersCount - 1 
                    : state.creatorProfile.followersCount
                })
            });
        }
        case ActionConsts.CreatorProfile.GetProfileFollowersError: {
            return Object.assign({}, state, {
                errors: "Something went wrong.",
                followers: []
            });
        }
        case ActionConsts.CreatorProfile.GetCreatorProfileSuccess: {
            let { profile } = action.payload!;

            return Object.assign({}, state, {
                creatorProfile: profile
            });
        }
        case ActionConsts.CreatorProfile.GetCreatorProfileError: {
            return Object.assign({}, state, {
                errors: "Something went wrong.",
                creatorProfile: {}
            });
        }
        case ActionConsts.CreatorProfile.GetCreatorFeedsSuccess: {
            let { feeds, page } = action.payload!;

            if (feeds.length) {
                return Object.assign({}, state, {
                    creatorFeeds: [...state.creatorFeeds, ...feeds]
                });
            } else {
                return Object.assign({}, state, { emptyPageNoFeeds: page });
            }   
        }
        case ActionConsts.CreatorProfile.GetCreatorFeedsError: {
            return Object.assign({}, state, {
                errors: "Something went wrong.",
                creatorFeeds: []
            });
        }
        default:
            return state;
    }
};
