// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { CreatorProfileService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IProfilePage } from "@Interfaces";
// #endregion Interface Imports

export const CreatorProfileActions = {
    GetCreatorProfile: (payload: IProfilePage.Actions.IGetCreatorProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetCreatorProfile(payload);
        
        dispatch({
            payload: { profile: result.status && result.response ? result.response : {}},
            type: result.status ? ActionConsts.CreatorProfile.GetCreatorProfileSuccess : ActionConsts.CreatorProfile.GetCreatorProfileError
        });
    },
    GetCreatorFeeds: (payload: IProfilePage.Actions.IGetCreatorFeedsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.GetCreatorFeeds(payload);
        
        dispatch({
            payload: { feeds: result.response },
            type: result.status ? ActionConsts.CreatorProfile.GetCreatorFeedsSuccess : ActionConsts.CreatorProfile.GetCreatorFeedsError
        });
    },
    FollowProfile: (payload: IProfilePage.Actions.IGetFollowProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.FollowProfile(payload);
        
        dispatch({
            payload: { followers: result.response ? result.response : result },
            type: result.status ? ActionConsts.CreatorProfile.GetProfileFollowersSuccess : ActionConsts.CreatorProfile.GetProfileFollowersError
        });
    },
    UnFollowProfile: (payload: IProfilePage.Actions.IGetFollowProfilePayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await CreatorProfileService.UnFollowProfile(payload);
        
        dispatch({
            payload: { followers: result.response ? result.response : result },
            type: result.status ? ActionConsts.CreatorProfile.GetProfileFollowersSuccess : ActionConsts.CreatorProfile.GetProfileFollowersError
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
            payload: { mediaGallary: result.response && result.status ? result.response : [] },
            type: result.response && result.status ? ActionConsts.CreatorProfile.GetMediaGallarySuccess : ActionConsts.CreatorProfile.GetMediaGallaryError
        });
    }
};
