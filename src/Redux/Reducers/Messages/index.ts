// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IMessagesPage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IMessagesPage.IStateProps = {
    errors: [''],
    allMessages: {
        emptyPaginationNo: 9999,
        values: [],
        paginationNo: 0
    }
};

export const MessagesReducer = (
        state = INITIAL_STATE,
        action: IAction<IMessagesPage.Actions.IMapAllMessages>
    ) => {
    switch (action.type) {
        case ActionConsts.Messages.GetAllMessagesSuccess: {
            const { allMessages, page } = action.payload!;

            if (!page) {
                return Object.assign({}, state, {
                    allMessages: {
                        values: [...allMessages],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.allMessages.emptyPaginationNo
                    }
                });
            }
            
            if (allMessages.length) {
                return Object.assign({}, state, {
                    allMessages: {
                        values: [...state.allMessages.values, ...allMessages],
                        paginationNo: page + 1,
                        emptyPaginationNo: state.allMessages.emptyPaginationNo
                    }
                });
            } else {
                return Object.assign({}, state, {
                    allMessages: {
                        emptyPaginationNo: page,
                        values: state.allMessages.values,
                        paginationNo: page
                    }
                });
            }
        }
        default:
            return state;
    }
};
