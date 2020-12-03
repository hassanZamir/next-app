// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IProfilePage, UserCreatorProfileModel, USER_CREATOR_PROFILE } from "@Interfaces";
// #endregion Interface Imports

export const CreatorProfileActions = {
    // called by the pusher event only
    VerficationStatusUpdated: (result: USER_CREATOR_PROFILE) => async (dispatch: Dispatch) => {
        console.log("VerficationStatusUpdated: ", result);

        dispatch({
            payload: result,
            type: ActionConsts.CreatorProfile.GetUserCreatorProfileSuccess
        });
        if (result.creatorProfileVerified)
            dispatch({
                payload: null,
                type: ActionConsts.Payment.OnBecomeCreatorSuccess
            });
    },
    GetUserCreatorProfile: (
        payload: IProfilePage.Actions.IGetUserCreatorProfilePayload
    ) => async (dispatch: Dispatch) => {
        const result = await CreatorProfileService.GetUserCreatorProfile(payload);
        // console.log("GetUserCreatorProfile: ", result);

        dispatch({
            payload: result.status && result.response ? result.response : {},
            type:
                result.status && result.response
                    ? ActionConsts.CreatorProfile.GetUserCreatorProfileSuccess
                    : ActionConsts.CreatorProfile.GetUserCreatorProfileError,
        });
    },
    /**
    * @deprecated Use GetActiveCreatorProfile instead
    */
    GetCreatorProfile: (payload: IProfilePage.Actions.IGetCreatorProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: { isFetchingProfile: true },
            type: ActionConsts.CreatorProfile.SetProfileFetching,
        })

        const result = await CreatorProfileService.GetCreatorProfile(payload);

        dispatch({
            payload: { profile: result.status && result.response ? result.response : {} },
            type: result.status ? ActionConsts.CreatorProfile.GetCreatorProfileSuccess : ActionConsts.CreatorProfile.GetCreatorProfileError
        });
    },
    GetActiveCreatorProfile: (payload: IProfilePage.Actions.IGetCreatorProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetActiveCreatorProfile(payload);

        dispatch({
            payload: { profile: result.status && result.response ? result.response : {} },
            type: result.status ? ActionConsts.CreatorProfile.GetCreatorProfileSuccess : ActionConsts.CreatorProfile.GetCreatorProfileError
        });
    },
    GetCreatorFeeds: (payload: IProfilePage.Actions.IGetCreatorFeedsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetCreatorFeeds(payload);

        dispatch({
            payload: {
                feeds: result.status && result.response ? result.response : [],
                page: payload.page
            },
            type: result.status ? ActionConsts.CreatorProfile.GetCreatorFeedsSuccess : ActionConsts.CreatorProfile.GetCreatorFeedsError
        });
    },
    FollowProfile: (payload: IProfilePage.Actions.IGetFollowProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.FollowProfile(payload);

        dispatch({
            payload: { followers: result.status && result.response ? result.response : result, hasFollowed: result.status && result.response ? true : false },
            type: result.status && result.response ? ActionConsts.CreatorProfile.GetProfileFollowersSuccess : ActionConsts.CreatorProfile.GetProfileFollowersError
        });
    },
    UnFollowProfile: (payload: IProfilePage.Actions.IGetFollowProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.UnFollowProfile(payload);

        dispatch({
            payload: { followers: result.status && result.response ? result.response : result, hasUnFollowed: result.status && result.response ? true : false },
            type: result.status && result.response ? ActionConsts.CreatorProfile.GetProfileFollowersSuccess : ActionConsts.CreatorProfile.GetProfileFollowersError
        });
    },
    CheckUserProfileFollowing: (
        payload: IProfilePage.Actions.ICheckUserProfileFollowingPayload
    ) => async (dispatch: Dispatch) => {
        // to setup loaders on UI, update the api fetching status
        dispatch({
            payload: "pending",
            type: ActionConsts.CreatorProfile.CheckUserFollowingPending,
        });
        const result = await CreatorProfileService.CheckUserProfileFollowing(payload);
        dispatch({
            payload: result,
            type:
                result.status && result.response
                    ? ActionConsts.CreatorProfile.CheckUserFollowingSuccess
                    : ActionConsts.CreatorProfile.CheckUserFollowingError,
        });
    },
    GetProfileFollowers: (payload: IProfilePage.Actions.IGetProfileFollowersPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetProfileFollowers(payload);
        dispatch({
            payload: { followers: result.response ? result.response : result },
            type: result.status ? ActionConsts.CreatorProfile.GetProfileFollowersSuccess : ActionConsts.CreatorProfile.GetProfileFollowersError
        });
    },
    GetMediaGallary: (payload: IProfilePage.Actions.IGetGETMediaGallaryPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetMediaGallary(payload);
        dispatch({
            payload: {
                mediaGallary: result.response && result.status ? result.response : [],
                type: payload.type,
                page: payload.page
            },
            type: result.response && result.status ? ActionConsts.CreatorProfile.GetMediaGallarySuccess : ActionConsts.CreatorProfile.GetMediaGallaryError
        });
    },
    TabChanged: (payload: number) => async (
        dispatch: Dispatch
    ) => {
        dispatch({
            payload: { tabIndex: payload },
            type: ActionConsts.CreatorProfile.TabChanged
        });
    }
};
