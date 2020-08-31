import { USER_SESSION, FEED, FeedsModel, ProfilesSuggestionModel, UploadMediaFilesModel, CREATOR_PROFILE } from "@Interfaces";

declare namespace IFeedsPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        postContentStatus: 'default' | 'error' | 'success' | 'loading';
        errors: '',
        feeds: {
            paginationNo: number,
            value: FEED[],
            emptyPageNo: number
        },
        profilesSuggestion: CREATOR_PROFILE[]
    }

    namespace Actions {
        export interface IMapAllFeedsResponse {
            feeds: FEED[],
            page: number
        }

        export interface IMapPostContentResponse {
            feed: FEED[]
        }

        export interface IMapProfilesSuggestionResponse {
            profiles: CREATOR_PROFILE[]
        }

        export interface IGetAllFeedsPayload extends FeedsModel.GetAllFeedsPayload {}
        export interface IGetAllFeedsResponse extends FeedsModel.GetAllFeedsResponse {}

        export interface IGetProfilesSuggestionPayload extends ProfilesSuggestionModel.GetProfilesSuggestionPayload {}
        export interface IGetProfilesSuggestionResponse extends ProfilesSuggestionModel.GetProfilesSuggestionResponse {}

        export interface IGetUploadMediaFilesPayload extends UploadMediaFilesModel.GetUploadMediaFilesPayload {}
        export interface IGetUploadMediaFilesResponse extends UploadMediaFilesModel.GetUploadMediaFilesResponse {}
    }
}

declare namespace IFeedsList {
    export interface IProps {
        feeds: FEED[];
        user: USER_SESSION;
    }
}

declare namespace IFeed {
    export interface IProps {
        index: number;
        feed: FEED;
        onReportClick: (a: FEED)=>void;
        onCopyClick: (a: FEED)=>void;
        toggleTipModal: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        likeContent: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        onCommentClick: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
    }

    namespace Actions {
        export interface IMapLikefeed {
            like: boolean;
            contentId: number;
        }
        export interface ITipFeedPayload extends FeedsModel.GetTipFeedPayload {}
        export interface ITipFeedResponse extends FeedsModel.GetTipFeedResponse {}

        export interface ILikeFeedPayload extends FeedsModel.GetLikeFeedPayload {}
        export interface ILikeFeedResponse extends FeedsModel.GetLikeFeedResponse {}

        export interface IGetReportFeedPayload extends FeedsModel.GetReportFeedPayload {}
        export interface IGetReportFeedResponse extends FeedsModel.GetReportFeedResponse {}
    }
}

declare namespace IFeedOptions {
    export interface IProps {
        index: number;
        feed: FEED;
        onReportClick: (a: FEED)=>void;
        onCopyClick: (a: FEED)=>void;
        toggleTipModal: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        likeContent: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        onCommentClick: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
    }
}
export { IFeedsPage, IFeedsList, IFeed, IFeedOptions };
