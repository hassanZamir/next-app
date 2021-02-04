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
    defaultFollowersInformation: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0
    },
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
            let page = action.payload.page;

            if (!page) {
                return Object.assign({}, state, {
                    defaultFollowersInformation: {
                        values: [...FollowersInformation],
                        paginationNo: state.defaultFollowersInformation.paginationNo + 1,
                        emptyPaginationNo: FollowersInformation.length ? state.defaultFollowersInformation.paginationNo : state.defaultFollowersInformation.emptyPaginationNo
                    },
                    followingType: type
                });
            }

            if (FollowersInformation.length) {
                return Object.assign({}, state, {
                    defaultFollowersInformation: {
                        values: [...FollowersInformation, ...state.defaultFollowersInformation.values],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.defaultFollowersInformation.paginationNo
                    },
                    followingType: type
                });
            } else {
                return Object.assign({}, state, {
                    defaultFollowersInformation: {
                        emptyPaginationNo: state.defaultFollowersInformation.paginationNo,
                        values: state.defaultFollowersInformation.values,
                        paginationNo: page
                    },
                    followingType: type
                });
            }
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
