// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    // IBankingInfoPage,
    IFollowersInfoPage,
    CREATOR_PROFILE,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFollowersInfoPage.IStateProps = {
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    defaultFollowersInformation: {},
    followerType: 0,
    showPersonalInformation: false
};

export const FollowersInfoReducer = (
    state = INITIAL_STATE,
    action: IAction<IFollowersInfoPage.Actions.IMapGetFollowersInformation & any>
) => {
    switch (action.type) {
        case ActionConsts.FollowersInfo.GetFollowersInfoSuccess: {
            let FollowersInformation = action.payload.followersInformation;
            let type = action.payload.type;
            return Object.assign({}, state, {
                defaultFollowersInformation: FollowersInformation,
                followerType: type,
            });
        }
        case ActionConsts.FollowersInfo.GetFollowersInfoError: {
            return Object.assign({}, state, {
                errors: ["Error getting personal information"],
            });
        }
        default:
            return state;
    }
};
