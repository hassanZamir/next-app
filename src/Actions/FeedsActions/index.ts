// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { FeedsService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IFeedsPage, IFeed } from "@Interfaces";
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
    },
    TipFeed: (payload: IFeed.Actions.ITipFeedPayload) => async () => {
        const result = await FeedsService.TipFeed(payload);
        
        return result;
    },
    LikeFeed: (payload: IFeed.Actions.ILikeFeedPayload) => async (dispatch: Dispatch) => {
        const result = await FeedsService.LikeFeed(payload);
        
        debugger;
        dispatch({
            payload: {contentId: payload.contentId},
            type: result.status ? ActionConsts.Feeds.LikeFeedSuccess : ActionConsts.Feeds.LikeFeedError
        });
    }
};
