// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { LoginService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IFollowingInfoPage } from "@Interfaces";
// #endregion Interface Imports

export const FollowingInfoAction = {
    GetFollowingInformation: (
        payload: IFollowingInfoPage.Actions.IGetGETFollowingInformationPayload
    ) => async (dispatch: Dispatch) => {
        const result = await LoginService.GetFollowingInformation(payload);
        // result.response = result.response == null ? [] : result.response;
        dispatch({
            payload: {
                followingInformation:
                    result.status && result.response ? result.response : [],
                type: result.status ? result.type : 0,
            },
            type:
                result.status && result.response
                    ? ActionConsts.FollowingInfo.GetFollowingInfoSuccess
                    : ActionConsts.FollowingInfo.GetFollowingInfoError,
        });
    },
    PutRecurringFollower: (
        payload: IFollowingInfoPage.Actions.IGetPUTRecurringFollowingPayload
    ) => async (dispatch: Dispatch) => {
        const result: any = await LoginService.PutRecurringFollower(payload);
        result.response = result.response == null ? [] : result.response;
        dispatch({
            payload: {
                success:
                    result.status && result.response ? result.response : [],
            },
            type:
                result.status && result.response
                    ? ActionConsts.FollowingInfo.PutRecurringSuccess
                    : ActionConsts.FollowingInfo.PutRecurringError,
        });
    },
};
