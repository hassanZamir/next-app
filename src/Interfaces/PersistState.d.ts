import { FEED, USER_SESSION } from "@Interfaces";

declare namespace IPersistState {
    export interface IStateProps {
        session: USER_SESSION;
        feed: FEED;
    }

    namespace Actions {
        export interface ISetStatusFeed {
            feed: FEED;
        }
        export interface ISetSession {
            session: USER_SESSION;
        }
    }
}

export { IPersistState };