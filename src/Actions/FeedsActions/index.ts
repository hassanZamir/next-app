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
    GetProfileSuggestion: (payload: IFeedsPage.Actions.IGetProfilesSuggestionPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await FeedsService.GetProfilesSuggestion(payload);
        dispatch({
            payload: {
                profiles: result.status ? result.response : []
            },
            type: result.status
                ? ActionConsts.Feeds.ProfilesSuggestionSuccess
                : ActionConsts.Feeds.ProfilesSuggestionError,
        });
    },
    GetAllFeeds: (payload: IFeedsPage.Actions.IGetAllFeedsPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await FeedsService.GetAllFeeds(payload);

        dispatch({
            payload: { feeds: result.status && result.response ? result.response : [], page: payload.page },
            type: result.status && result.response ? ActionConsts.Feeds.GetAllFeedsSuccess : ActionConsts.Feeds.GetAllFeedsError
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
    },
    PostContent: (
        payload: IFeedsPage.Actions.IGetUploadMediaFilesPayload
    ) => async (dispatch: Dispatch) => {

        const imagesMedia = payload.media_url;
        const videosMedia = payload.video_media_url;

        /// --- Upload Content Media --- ///
        const result = imagesMedia.has('mediaFiles')
            ? await FeedsService.UploadContentMedia({
                media_url: imagesMedia,
                video_media_url: null,
                authtoken: payload.authtoken,
            })
            : null;

        /// --- Abort PostContent if Media Upload failed --- ///
        if (result && !result.status && imagesMedia.has('mediaFiles')) {
            dispatch({
                payload: result.error || "Media upload failed",
                type: ActionConsts.Feeds.PostContentError
            });
            return;
        }

        /// --- Upload Video Content Media --- ///
        const resultVideo = videosMedia.has('mediaFiles')
            ? await FeedsService.UploadVideoContentMedia({
                media_url: null,
                video_media_url: videosMedia,
                authtoken: payload.authtoken,
            })
            : null;

        /// --- Abort PostContent if Video Media Upload failed --- ///
        if (resultVideo && !resultVideo.status && videosMedia.has('mediaFiles')) {
            dispatch({
                payload: resultVideo.error || "Video Media upload failed",
                type: ActionConsts.Feeds.PostContentError,
            });
            return;
        }

        /// --- Combine the video and images upload response
        let combinedMediaArray: Array<any> = [];
        if (result && result.uploadSuccess)
            combinedMediaArray = combinedMediaArray.concat(result.uploadSuccess);
        if (resultVideo && resultVideo.uploadSuccess)
            combinedMediaArray = combinedMediaArray.concat(resultVideo.uploadSuccess);

        // console.log("imagesResult: ", result);
        // console.log("videosResult: ", resultVideo);
        // console.log("combinedMediaArray: ", combinedMedaArray);

        /// --- Post the content along with uploaded media urls --- ///
        if (payload.title || combinedMediaArray.length > 0) {
            const postContent = await FeedsService.PostContent({
                title: payload.title,
                media_url: combinedMediaArray,
                userId: payload.userId,
                authtoken: payload.authtoken,
            });
            dispatch({
                payload: postContent.status ? { feed: [postContent.response] } : null,
                type: postContent.status
                    ? ActionConsts.Feeds.PostContentSuccess
                    : ActionConsts.Feeds.PostContentError,
            });

            return postContent;
        }
        dispatch({
            payload: null,
            type: ActionConsts.Feeds.PostContentError,
        });
    },
};
