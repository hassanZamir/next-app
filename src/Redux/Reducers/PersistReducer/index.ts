// #region Local Imports
import { ActionConsts } from "@Definitions";
import Router from "next/router";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IPersistState, USER_SESSION, FEED } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IPersistState.IStateProps = {
    session: <USER_SESSION>{},
    feed: <FEED>{}
};

export const PersistReducer = (
    state = INITIAL_STATE,
    action: IAction<IPersistState.Actions.ISetStatusFeed & IPersistState.Actions.ISetSession>
) => {
    switch (action.type) {
        case ActionConsts.Feeds.SetPersistFeed: {
            let { feed } = action.payload!;

            debugger;
            return Object.assign({}, state, {
                feed: feed
            });
        }
        case ActionConsts.Login.SetUserPayload: {
            let { session } = action.payload!;
            Router.push("/");

            debugger;
            return Object.assign({}, state, {
                session: session
            });
        }
        case ActionConsts.Login.DoLogout: {
            Router.push("/login");
            return INITIAL_STATE;
        }
        default:
            return state;
    }
};