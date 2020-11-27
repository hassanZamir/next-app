// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService, FeedsService, LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IBankingInfoPage, IProfilePage } from "@Interfaces";
// #endregion Interface Imports

export const BankingInfoActions = {
    UploadProfileImages: (
        payload: IBankingInfoPage.Actions.IGetUploadProfileImagesPayload
    ) => async (dispatch: Dispatch) => {
        const mediaUrl = payload.media_url;
        const postCreatorProfileParams = {
            profileImageUrl: "",
            coverImageUrl: "",
        };
        for (let i = 0; i < mediaUrl.length; i++) {
            const result = await FeedsService.UploadMediaOnStorage({
                media_url: mediaUrl[i].url,
            } as any);
            if (
                result &&
                result.status &&
                result.uploadSuccess! &&
                result.uploadSuccess![0]
            ) {
                if (mediaUrl[i].key === "profileImageUrl")
                    postCreatorProfileParams.profileImageUrl = result.uploadSuccess![0].url;
                if (mediaUrl[i].key === "coverImageUrl")
                    postCreatorProfileParams.coverImageUrl = result.uploadSuccess![0].url;
            } else {
                dispatch({
                    type: ActionConsts.BankingInfo.UploadProfileImagesError,
                    payload: null,
                });
            }
            if (i === mediaUrl.length - 1) {
                const postResult = await CreatorProfileService.PostCreatorProfile(
                    { username: payload.username, ...postCreatorProfileParams }
                );
                dispatch({
                    payload: {
                        profile:
                            postResult.status && postResult.response
                                ? postResult.response
                                : {},
                    },
                    type: postResult.status
                        ? ActionConsts.BankingInfo.GetUserProfileSuccess
                        : ActionConsts.BankingInfo.UpdateUserProfileError,
                });
            }
        }
    },
    PostPersonalInformation: (
        payload: IBankingInfoPage.Actions.IGetPostPersonalInformationPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostPersonalInformation(payload);
        dispatch({
            payload:
                result.status && !result.error
                    ? "Success"
                    : result.error,
            type: result.status
                ? ActionConsts.BankingInfo.PostBankingInfoSuccess
                : ActionConsts.BankingInfo.PostBankingInfoError,
        });
    },
    GetPersonalInformation: (
        payload: IBankingInfoPage.Actions.IGetGETPersonalInformationPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.GetPersonalInformation(payload);
        dispatch({
            payload: {
                personalInformation:
                    result.status && result.response ? result.response : {},
            },
            type:
                result.status && result.response
                    ? ActionConsts.BankingInfo.GetBankingInfoSuccess
                    : null,
        });
    },
};
