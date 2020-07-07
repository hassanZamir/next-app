// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IFeedsPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IFeedsPage.IStateProps = {
    errors: '',
    feeds: []
};

export const FeedsReducer = (
    state = INITIAL_STATE,
    action: IAction<IFeedsPage.Actions.IGetAllFeedsResponse>
) => {
    switch (action.type) {
        case ActionConsts.Feeds.GetAllFeedsSuccess: {
            let { feeds } = action.payload!;

            return Object.assign({}, state, {
                feeds: feeds
            });
        }
        case ActionConsts.Feeds.GetAllFeedsError: {
            let { errors } = action.payload!;

            debugger;
            return Object.assign({}, state, {
                errors: errors ? errors : "Authentication failed for these credentials",
                feeds: []
            });
        }
        default:
            return state;
    }
};
