// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { FeedsService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IFeedsPage } from "@Interfaces";
// #endregion Interface Imports

export const FeedsActions = {
    GetAllFeeds: (payload: IFeedsPage.Actions.IGetAllFeedsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await FeedsService.GetAllFeeds({
            params: payload.user,
        });
        
        dispatch({
            payload: result,
            type: result.status === "false" ? ActionConsts.Feeds.GetAllFeedsSuccess : ActionConsts.Feeds.GetAllFeedsError
        });
    }
};
