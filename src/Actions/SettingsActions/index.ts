// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService, FeedsService, LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { HTTP_REQUEST_STATUS, ISettingsPage } from "@Interfaces";
// #endregion Interface Imports

export const SettingsActions = {
    UpdateHttpStatus: (payload: ISettingsPage.Actions.IUpdateHttpStatus) => async (dispatch: Dispatch) => {
        dispatch({
            payload: payload,
            type: ActionConsts.Settings.UpdateHttpStatus,
        });
    },
    PostEditProfileSettings: (
        payload: ISettingsPage.Actions.IPostUploadSettingsProfileImagesPayload
    ) => async (dispatch: Dispatch) => {
        const mediaFiles: [] = payload.media_url;

        const postCreatorProfileParams = {
            profileImageUrl: "",
            coverImageUrl: "",
        };

        let mediaUploadResult: string = "";
        /// ---- upload Media using external service --- ///
        for (let i = 0; i < mediaFiles.length; i++) {
            // console.log("Media File: ", mediaFiles[i]);
            const file: any = mediaFiles[i];
            const formData = new FormData();
            formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
            const result = await FeedsService.UploadContentMedia({
                media_url: formData,
                authtoken: payload.authtoken,
            } as any);
            // console.log("UploadContentMedia-result: ", result);

            /// --- Abort PostContent if Media Upload failed --- ///
            if (result && !result.status) {
                mediaUploadResult = "failed";
                break;
            }
            else if (result.uploadSuccess && result.uploadSuccess.length > 0) {
                if (file.key === "profileImageUrl")
                    postCreatorProfileParams.profileImageUrl = result.uploadSuccess[0].url ?? "";
                else if (file.key === "coverImageUrl")
                    postCreatorProfileParams.coverImageUrl = result.uploadSuccess![0].url;
            }
        }
        /// --- post the profile data to api ---- ///
        if (mediaUploadResult != "failed") {
            const postResult = await CreatorProfileService.PostCreatorProfile(
                {
                    userId: payload.userId,
                    name: payload.name,
                    followingFee: payload.followingFee,
                    bio: payload.bio,
                    location: payload.location,
                    profileImageUrl: postCreatorProfileParams.profileImageUrl,
                    coverImageUrl: postCreatorProfileParams.coverImageUrl,
                    authtoken: payload.authtoken,
                }
            );
            dispatch({
                payload: postResult.status && postResult.response
                    ? postResult.response
                    : {},

                type: postResult.status
                    ? ActionConsts.CreatorProfile.GetUserCreatorProfileSuccess
                    : null,
            });
            dispatch({
                payload: {},
                type: postResult.status
                    ? ActionConsts.Settings.UpdateUserProfileSuccess
                    : ActionConsts.Settings.UpdateUserProfileError,
            });
            dispatch({
                payload: "success",
                type: ActionConsts.Settings.UpdateHttpStatus,
            });
        }
        else {
            dispatch({
                payload: {},
                type: ActionConsts.Settings.UpdateUserProfileError,
            });
            dispatch({
                payload: "error",
                type: ActionConsts.Settings.UpdateHttpStatus,
            });
        }

    },
    DeleteAccount: (
        payload: ISettingsPage.Actions.IPostDeleteAccountPayload
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
