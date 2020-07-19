import { USER_SESSION, FEED, FeedsModel } from "@Interfaces";

declare namespace IFeedsPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        errors: '',
        feeds: FEED[]
    }

    namespace Actions {
        export interface IMapAllFeedsResponse {
            feeds: FeedsModel.GetAllFeedsResponse
        }

        export interface IGetAllFeedsPayload extends FeedsModel.GetAllFeedsPayload {}
        export interface IGetAllFeedsResponse extends FeedsModel.GetAllFeedsResponse {}
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
