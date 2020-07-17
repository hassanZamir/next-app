// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IProfilePage, FEED, CREATOR_PROFILE } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IProfilePage.IStateProps = {
    errors: '',
    creatorProfile: <CREATOR_PROFILE>{},
    creatorFeeds: new Array<FEED>(),
    followers: []
};

export const CreatorProfileReducer = (
    state = INITIAL_STATE,
    action: IAction<IProfilePage.Actions.IMapCreatorFeedsResponse & 
        IProfilePage.Actions.IMapCreatorProfileResponse & 
        IProfilePage.Actions.IMapProfileFollowersResponse>
) => {
    switch (action.type) {
        case ActionConsts.CreatorProfile.GetProfileFollowersSuccess: {
            let { followers } = action.payload!;

            return Object.assign({}, state, {
                followers: followers
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
            let { feeds } = action.payload!;

            return Object.assign({}, state, {
                creatorFeeds: feeds
            });
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
