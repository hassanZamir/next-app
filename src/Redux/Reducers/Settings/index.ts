// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    ISettingsPage,
    IProfilePage,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: ISettingsPage.IStateProps = {
    httpStatus: "idle"
};

export const SettingsReducer = (
    state = INITIAL_STATE,
    action: IAction<
        ISettingsPage.Actions.IUpdateHttpStatus
        & IProfilePage.Actions.IMapCreatorProfileResponse
    >
) => {
    switch (action.type) {
        case ActionConsts.Settings.UpdateHttpStatus: {
            const httpStatus = action.payload!;
            return Object.assign({}, state, {
                httpStatus: httpStatus,
            });
        }
        case ActionConsts.Settings.UpdateUserProfileError: {
            return Object.assign({}, state, {
                editProfileActionStatus: "error",
                editProfileActionResponse: "Profile information update failed. Please try again later.",
            });
        }
        case ActionConsts.Settings.UpdateUserProfileSuccess: {
            return Object.assign({}, state, {
                editProfileActionStatus: "success",
                editProfileActionResponse: "Profile information successfully updated.",
            });
        }
        default:
            return state;
    }
};
