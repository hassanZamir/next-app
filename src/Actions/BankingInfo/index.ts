// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService, FeedsService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IBankingInfoPage, IProfilePage } from "@Interfaces";
// #endregion Interface Imports

export const BankingInfoActions = {
    GetCreatorProfile: (payload: IProfilePage.Actions.IGetCreatorProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetCreatorProfile(payload);

        dispatch({
            payload: { profile: result.status && result.response ? result.response : {}},
            type: result.status ? ActionConsts.BankingInfo.GetUserProfileSuccess : ActionConsts.BankingInfo.GetUserProfileError
        });
    },
    UploadProfileImages: (payload: IBankingInfoPage.Actions.IGetUploadProfileImagesPayload) => async (
        dispatch: Dispatch
    ) => {
        const mediaUrl = payload.media_url;
        const postCreatorProfileParams = {
            profileImageUrl: '',
            coverImageUrl: ''
        };
        for (let i = 0; i < mediaUrl.length; i++) {
            const result = await FeedsService.UploadMediaOnStorage({
                media_url: mediaUrl[i].url
            } as any);
            if (result && result.status) {
                if (mediaUrl[i].key === 'profileImageUrl') 
                    postCreatorProfileParams.profileImageUrl = result.uploadSuccess![0].url;
                if (mediaUrl[i].key === 'coverImageUrl') 
                    postCreatorProfileParams.coverImageUrl = result.uploadSuccess![0].url;
            } else {
                dispatch({
                    type: ActionConsts.BankingInfo.UploadProfileImagesError,
                    payload: null
                })
            }
            if (i === mediaUrl.length - 1) {
                const result = await CreatorProfileService.PostCreatorProfile({ username: payload.username, ...postCreatorProfileParams });
                dispatch({
                    payload: { profile: result.status && result.response ? result.response : {}},
                    type: result.status ? ActionConsts.BankingInfo.GetUserProfileSuccess : ActionConsts.BankingInfo.UpdateUserProfileError
                })
            }
        }
    }
}