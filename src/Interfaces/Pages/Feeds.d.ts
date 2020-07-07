import { FeedsModel } from "@Services/API/Feeds/Feeds";

type FEED = {
    title: string;
    username: string;
    likes: number;
    time: string;
    imageUrl: string;
    comments: number;
}

declare namespace IFeedsPage {
    export interface IProps {
        user: { id: number }
    }

    export interface IStateProps {
        errors: '',
        feeds: FEED[]
    }

    namespace Actions {
        export interface IGetAllFeedsPayload extends LoginModel.GetLoginPayload {
            user: number;
        }

        export interface IGetAllFeedsResponse extends FeedsModel.GetAllFeedsResponse {}
    }
}

declare namespace IFeedsList {
    export interface IProps {
        feeds: FEED[];
    }
}

declare namespace IFeed {
    export interface IProps {
        feed: FEED;
    }
}

declare namespace IFeedOptions {
    export interface IProps {
        likes: number;
        comments: number;
        time: string;
    }
}
export { IFeedsPage, IFeedsList, IFeed, IFeedOptions };
