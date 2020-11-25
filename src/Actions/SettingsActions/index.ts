// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService, FeedsService, LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { ISettingsPage, IProfilePage } from "@Interfaces";
// #endregion Interface Imports

export const SettingsActions = {
    GetCreatorProfile: (
        payload: IProfilePage.Actions.IGetCreatorProfilePayload
    ) => async (dispatch: Dispatch) => {
        const result = await CreatorProfileService.GetCreatorProfile(payload);

        dispatch({
            payload: {
                profile:
                    result.status && result.response ? result.response : {},
            },
            type:
                result.status && result.response
                    ? ActionConsts.BankingInfo.GetUserProfileSuccess
                    : ActionConsts.BankingInfo.GetUserProfileError,
        });
    },
    UploadProfileImages: (
        payload: ISettingsPage.Actions.IGetUploadSettingsProfileImagesPayload
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
                    {
                        username: payload.username,
                        follwingFee: payload.following_fee,
                        bio: payload.bio,
                        location: payload.location,
                        ...postCreatorProfileParams,
                    }
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
        payload: ISettingsPage.Actions.IGetPostPersonalInformationPayload
    ) => async (dispatch: Dispatch) => {
        const { media_url, ...rest } = payload;
        let updatedPayload = { ...rest };

        const checkIsCreator = (
            result: ISettingsPage.Actions.IGetPostPersonalInformationResponse
        ) => {
            if (result.session && result.session.isCreator) {
                dispatch({
                    payload: null,
                    type: result.status
                        ? ActionConsts.Payment.OnBecomeCreatorSuccess
                        : "",
                });
            }
        };

        if (!media_url.length) {
            const postResult = await LoginService.PostPersonalInformation({
                ...updatedPayload,
            } as any);

            checkIsCreator(postResult);
            dispatch({
                payload:
                    postResult.status && !postResult.error
                        ? "Success"
                        : postResult.error,
                type: postResult.status
                    ? ActionConsts.BankingInfo.PostBankingInfoSuccess
                    : ActionConsts.BankingInfo.PostBankingInfoError,
            });
        } else {
            for (let i = 0; i < media_url.length; i++) {
                const result = await FeedsService.UploadMediaOnStorage({
                    media_url: media_url[i].url,
                } as any);
                if (result && result.status) {
                    if (media_url[i].key === "docPhoto")
                        updatedPayload.docPhoto = result.uploadSuccess![0].url;
                    if (media_url[i].key === "docUserPhoto")
                        updatedPayload.docUserPhoto = result.uploadSuccess![0].url;
                } else {
                    dispatch({
                        type: ActionConsts.BankingInfo.UploadProfileImagesError,
                        payload: null,
                    });
                    return;
                }
                if (i === media_url.length - 1) {
                    const postResult = await LoginService.PostPersonalInformation(
                        { ...updatedPayload } as any
                    );
                    checkIsCreator(postResult);
                    dispatch({
                        payload:
                            postResult.status && !postResult.error
                                ? "Success"
                                : postResult.error,
                        type: postResult.status
                            ? ActionConsts.BankingInfo.PostBankingInfoSuccess
                            : ActionConsts.BankingInfo.PostBankingInfoError,
                    });
                }
            }
        }
    },
    GetPersonalInformation: (
        payload: ISettingsPage.Actions.IGetGETPersonalInformationPayload
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
    DeleteAccount: (
        payload: ISettingsPage.Actions.IGetDeleteAccountPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.DeleteAccount(payload);
        dispatch({
            payload: {
                deleteAccount: result.status ? result.status : {},
            },
            type: result.status
                ? ActionConsts.Settings.DeleteAccountSuccess
                : null,
        });
    },
};
