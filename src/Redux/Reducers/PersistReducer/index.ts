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
    action: IAction<IPersistState.Actions.ISetStatusFeed & IPersistState.Actions.ISetSession 
    & IPersistState.Actions.IUpdatePaymentInfoInSession>
) => {
    switch (action.type) {
        case ActionConsts.Feeds.SetPersistFeed: {
            let { feed } = action.payload!;

            return Object.assign({}, state, {
                feed: feed
            });
        }
        case ActionConsts.Login.SetUserPayload: {
            let { session } = action.payload!;
            Router.push("/");

            return Object.assign({}, state, {
                session: session
            });
        }
        case ActionConsts.Payment.UpdatePaymentInfoInSession: {
            let { paymentSettings } = action.payload!;
            
            const defaultCard = paymentSettings.userCard.find((card) => {
                return  paymentSettings.userSettings && card.id === paymentSettings.userSettings.defaultCard
            });
            return Object.assign({}, state, {
                session:  Object.assign({}, state.session, {
                    paymentMode: paymentSettings.userSettings ? paymentSettings.userSettings.paymentMode : 0,
                    cardNumber: defaultCard ? defaultCard.cardNumber : '',
                    cardTitle: defaultCard ? defaultCard.cardTitle : ''
                })
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