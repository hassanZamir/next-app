// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import {
    IAction,
    IBankingInfoPage,
    CREATOR_PROFILE,
    IProfilePage,
} from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IBankingInfoPage.IStateProps = {
    errors: [],
    success: [],
    creatorProfile: <CREATOR_PROFILE>{},
    showPersonalInformation: false,
    defaultPersonalInformation: {},
    externalVerificationAttempt: false,
    bankVerificationState: undefined,
};

export const BankingInfoReducer = (
    state = INITIAL_STATE,
    action: IAction<
        IProfilePage.Actions.IMapCreatorProfileResponse
        & IBankingInfoPage.Actions.IMapGetPersonalInformation
        & IBankingInfoPage.Actions.IPostBankAccountInfoResponse
    >
) => {
    switch (action.type) {
        case ActionConsts.BankingInfo.ExternalVertificationAttempt: {
            return Object.assign({}, state, {
                externalVerificationAttempt: true,
            });
        }
        case ActionConsts.BankingInfo.GetBankingInfoSuccess: {
            let { personalInformation } = action.payload!;
            return Object.assign({}, state, {
                defaultPersonalInformation: personalInformation,
            });
        }
        case ActionConsts.BankingInfo.GetBankingInfoError: {
            return Object.assign({}, state, {
                errors: ["Error getting personal information"],
            });
        }
        case ActionConsts.BankingInfo.PostBankAccountInfoSuccess: {
            let result = action.payload!;
            return Object.assign({}, state, {
                bankVerificationState: 0,
            });
        }
        case ActionConsts.BankingInfo.PostBankAccountInfoError: {
            return Object.assign({}, state, {
                bankVerificationState: 2,
                errors: ["Error getting bank account info"],
            });
        }
        case ActionConsts.BankingInfo.UploadProfileImagesError: {
            return Object.assign({}, state, {
                errors: ["Error uploading profile images"],
            });
        }
        case ActionConsts.BankingInfo.PostBankingInfoSuccess: {
            return Object.assign({}, state, {
                errors: [],
                success: ["Successfuly added banking info"],
            });
        }
        case ActionConsts.BankingInfo.PostBankingInfoError: {
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
        case ActionConsts.BankingInfo.UpdateUserProfileError: {
            return Object.assign({}, state, {
                errors: ["Error occured updating profile information"],
            });
        }
        default:
            return state;
    }
};
