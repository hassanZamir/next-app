// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    // IBankingInfoPage,
    IFollowingInfoPage,
    CREATOR_PROFILE,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFollowingInfoPage.IStateProps = {
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    defaultFollowingInformation: {},
    followingType: 0,
    showPersonalInformation: false
};

export const FollowingInfoReducer = (
    state = INITIAL_STATE,
    action: IAction<IFollowingInfoPage.Actions.IMapGetFollowingInformation &
        any>
) => {
    switch (action.type) {
        case ActionConsts.FollowingInfo.GetFollowingInfoSuccess: {
            let FollowingInformation = action.payload.followingInformation;
            let type = action.payload.type;
            // console.log(type);
            return Object.assign({}, state, {
                defaultFollowingInformation: FollowingInformation,
                followingType: type,
            });
        }
        case ActionConsts.FollowingInfo.GetFollowingInfoError: {
            return Object.assign({}, state, {
                errors: ["Error getting personal information"],
            });
        }
        default:
            return state;
    }
};
