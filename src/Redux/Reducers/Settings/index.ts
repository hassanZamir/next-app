// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    ISettingsPage,
    CREATOR_PROFILE,
    IProfilePage,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: ISettingsPage.IStateProps = {
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    showPersonalInformation: false,
    defaultPersonalInformation: {},
};

export const SettingsReducer = (
    state = INITIAL_STATE,
    action: IAction<
        IProfilePage.Actions.IMapCreatorProfileResponse &
            ISettingsPage.Actions.IMapGetPersonalInformation
    >
) => {
    switch (action.type) {
        case ActionConsts.Settings.GetBankingInfoSuccess: {
            let { personalInformation } = action.payload!;
            return Object.assign({}, state, {
                defaultPersonalInformation: personalInformation,
            });
        }
        case ActionConsts.Settings.GetBankingInfoError: {
            return Object.assign({}, state, {
                errors: ["Error getting personal information"],
            });
        }
        case ActionConsts.Settings.GetUserProfileSuccess: {
            let { profile } = action.payload!;
            return Object.assign({}, state, {
                creatorProfile: profile,
                showPersonalInformation:
                    profile.coverImageUrl && profile.profileImageUrl,
            });
        }
        case ActionConsts.Settings.GetUserProfileError: {
            return Object.assign({}, state, {
                creatorProfile: {},
                errors: ["Error getting profile"],
            });
        }
        case ActionConsts.Settings.UploadProfileImagesError: {
            return Object.assign({}, state, {
                errors: ["Error uploading profile images"],
            });
        }
        case ActionConsts.Settings.PostBankingInfoSuccess: {
            return Object.assign({}, state, {
                errors: [],
                success: ["Successfuly added banking info"],
            });
        }
        case ActionConsts.Settings.PostBankingInfoError: {
            return Object.assign({}, state, {
                errors: [action.payload!, "Error adding banking info"],
                success: [],
            });
        }
        // case ActionConsts.BankingInfo.UpdateUserProfileSuccess: {
        //     let { profile } = action.payload!;

        //     return Object.assign({}, state, {
        //         creatorProfile: profile,
        //         showPersonalInformation: profile.coverImageUrl && profile.profileImageUrl
        //     });
        // }
        case ActionConsts.Settings.UpdateUserProfileError: {
            return Object.assign({}, state, {
                errors: ["Error occured updating profile information"],
            });
        }
        default:
            return state;
    }
};
