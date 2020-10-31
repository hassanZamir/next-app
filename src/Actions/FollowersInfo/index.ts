// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IFollowersInfoPage } from "@Interfaces";
// #endregion Interface Imports

export const FollowersInfoAction = {
    GetFollowersInformation: (
        payload: IFollowersInfoPage.Actions.IGetGETFollowersInformationPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.GetFollowersInformation(payload);
        // result.response = result.response == null ? [] : result.response;
        dispatch({
            payload: {
                followersInformation:
                    result.status && result.response ? result.response : [],
                type: result.status ? result.type : 0,
            },
            type:
                result.status && result.response
                    ? ActionConsts.FollowersInfo.GetFollowersInfoSuccess
                    : ActionConsts.FollowersInfo.GetFollowersInfoError,
        });
    },
    PostRestrictFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostRestrictFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostRestrictFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result.response
                ? ActionConsts.FollowersInfo.RestrictFollowerSuccess
                : ActionConsts.FollowersInfo.RestrictFollowerError,
        });
    },
    PostUnRestrictFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostUnRestrictFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostUnRestrictFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result.response
                ? ActionConsts.FollowersInfo.UnRestrictFollowerSuccess
                : ActionConsts.FollowersInfo.UnRestrictFollowerError,
        });
    },
    PostBlockedFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostBlockedFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostBlockedFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result.response
                ? ActionConsts.FollowersInfo.BlockedFollowerSuccess
                : ActionConsts.FollowersInfo.BlockedFollowerError,
        });
    },
    PostUnBlockedFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostUnBlockedFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostUnBlockedFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result
                ? ActionConsts.FollowersInfo.UnBlockedFollowerSuccess
                : ActionConsts.FollowersInfo.UnBlockedFollowerError,
        });
    },
    PostFavouriteFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostFavouriteFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostFavouriteFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result.response
                ? ActionConsts.FollowersInfo.FavouriteFollowerSuccess
                : ActionConsts.FollowersInfo.FavouriteFollowerError,
        });
    },
    PostUnFavouriteFollower: (
        payload: IFollowersInfoPage.Actions.IGetPostUnFavouriteFollowersPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.PostUnFavouriteFollower(payload);
        dispatch({
            payload: {
                recipientUsername: payload,
            },
            type: result.response
                ? ActionConsts.FollowersInfo.FavouriteFollowerSuccess
                : ActionConsts.FollowersInfo.FavouriteFollowerError,
        });
    },
};
