import { FeedsModel } from "@Services/API/Feeds/Feeds";
import { USER_SESSION, FEED } from "@Interfaces";

declare namespace IFeedsPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        errors: '',
        feeds: FEED[]
    }

    namespace Actions {
        export interface IGetAllFeedsPayload extends FeedsModel.AllFeedsPayload {
            user: number;
        }

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
        toggleTipModal: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        likeContent: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
    }

    namespace Actions {
        export interface ITipFeedPayload extends FeedsModel.GetTipFeedPayload {}
        export interface ITipFeedResponse extends FeedsModel.GetTipFeedResponse {}

        export interface ILikeFeedPayload extends FeedsModel.GetLikeFeedPayload {}
        export interface ILikeFeedResponse extends FeedsModel.GetLikeFeedResponse {}
    }
}

declare namespace IFeedOptions {
    export interface IProps {
        index: number;
        feed: FEED;
        toggleTipModal: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
        likeContent: (e: React.MouseEvent<HTMLElement>, index: number)=>void;
    }
}
export { IFeedsPage, IFeedsList, IFeed, IFeedOptions };
