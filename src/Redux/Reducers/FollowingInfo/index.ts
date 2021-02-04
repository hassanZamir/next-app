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
    defaultFollowingInformation: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0
    },
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
            let page = action.payload.page
            // console.log(type);
            // return Object.assign({}, state, {
            //     defaultFollowingInformation: FollowingInformation,
            //     followingType: type,
            // });

            // let FollowersInformation = action.payload.followersInformation;
            // let type = action.payload.type;
            // let page = action.payload.page;

            if (!page) {
                return Object.assign({}, state, {
                    defaultFollowingInformation: {
                        values: [...FollowingInformation],
                        paginationNo: state.defaultFollowingInformation.paginationNo + 1,
                        emptyPaginationNo: FollowingInformation.length ? state.defaultFollowingInformation.paginationNo : state.defaultFollowingInformation.emptyPaginationNo
                    },
                    followingType: type
                });
            }

            if (FollowingInformation.length) {
                return Object.assign({}, state, {
                    defaultFollowingInformation: {
                        values: [...FollowingInformation, ...state.defaultFollowingInformation.values],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.defaultFollowingInformation.paginationNo
                    },
                    followingType: type
                });
            } else {
                return Object.assign({}, state, {
                    defaultFollowingInformation: {
                        emptyPaginationNo: state.defaultFollowingInformation.paginationNo,
                        values: state.defaultFollowingInformation.values,
                        paginationNo: page
                    },
                    followingType: type
                });
            }
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
