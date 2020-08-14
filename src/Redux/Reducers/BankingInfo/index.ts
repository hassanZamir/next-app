// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IBankingInfoPage, CREATOR_PROFILE, IProfilePage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IBankingInfoPage.IStateProps = {
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    showPersonalInformation: false
};

export const BankingInfoReducer = (
    state = INITIAL_STATE,
    action: IAction<IProfilePage.Actions.IMapCreatorProfileResponse>
) => {
    switch (action.type) {
        case ActionConsts.BankingInfo.GetUserProfileSuccess: {
            let { profile } = action.payload!;
            return Object.assign({}, state, {
                creatorProfile: profile,
                showPersonalInformation: profile.coverImageUrl && profile.profileImageUrl
            });
        }
        case ActionConsts.BankingInfo.GetUserProfileError: {
            return Object.assign({}, state, {
                creatorProfile: {},
                errors: ['Error getting profile']
            });
        }
        case ActionConsts.BankingInfo.UploadProfileImagesError: {
            return Object.assign({}, state, {
                errors: ['Error uploading profile images']
            });
        }
        case ActionConsts.BankingInfo.PostBankingInfoSuccess: {
            debugger;
            return Object.assign({}, state, {
                errors: [],
                success: ["Successfuly added banking info"]
            });
        }
        case ActionConsts.BankingInfo.PostBankingInfoError: {
            debugger;
            return Object.assign({}, state, {
                errors: [action.payload!, 'Error adding banking info'],
                success: []
            });
        }
        // case ActionConsts.BankingInfo.UpdateUserProfileSuccess: {
        //     let { profile } = action.payload!;

        //     return Object.assign({}, state, {
        //         creatorProfile: profile,
        //         showPersonalInformation: profile.coverImageUrl && profile.profileImageUrl
        //     });
        // }
        case ActionConsts.BankingInfo.UpdateUserProfileError: {
            return Object.assign({}, state, {
                errors: ['Error occured updating profile information']
            });
        }
        default:
            return state;
    }
};