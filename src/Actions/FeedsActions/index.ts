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
        const result = await FeedsService.GetAllFeeds(payload);
        
        dispatch({
            payload: {feeds: result.response},
            type: result.status ? ActionConsts.Feeds.GetAllFeedsSuccess : ActionConsts.Feeds.GetAllFeedsError
        });
    },
    TipFeed: (payload: IFeed.Actions.ITipFeedPayload) => async () => {
        const result = await FeedsService.TipFeed(payload);
        
        return result;
    },
    LikeFeed: (payload: IFeed.Actions.ILikeFeedPayload) => async () => {
        const result = await FeedsService.LikeFeed(payload);
        return result;
        // dispatch({
        //     payload: {contentId: payload.contentId, like: true},
        //     type: result.status ? ActionConsts.Feeds.LikeFeedSuccess : ActionConsts.Feeds.LikeFeedError
        // });
    },
    UnLikeFeed: (payload: IFeed.Actions.ILikeFeedPayload) => async () => {
        const result = await FeedsService.UnLikeFeed(payload);
        return result;
        // dispatch({
        //     payload: {contentId: payload.contentId, like: false},
        //     type: result.status ? ActionConsts.Feeds.LikeFeedSuccess : ActionConsts.Feeds.LikeFeedError
        // });
    },
    ReportFeed: (payload: IFeed.Actions.IGetReportFeedPayload) => async () => {
        const result = await FeedsService.ReportFeed(payload);
        
        return result;
    }
};
