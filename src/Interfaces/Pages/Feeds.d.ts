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
        export interface IGetAllFeedsPayload extends LoginModel.GetLoginPayload {
            user: string;
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
