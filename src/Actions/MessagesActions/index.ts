// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ActionConsts } from "@Definitions";
import { MessagesService } from "@Services";
// #endregion Local Imports

// #region Interface Imports
import { IMessagesPage, NOTIFICATION } from "@Interfaces";
// #endregion Interface Imports

export const MessagesActions = {
    GetAllMessages: (payload: IMessagesPage.Actions.IGetGETAllMessagesPayload) => async (
        dispatch: Dispatch
    ) => {
        const result = await MessagesService.GetAllMessages(payload);

        debugger;
        dispatch({
            payload: { 
                allMessages: result.status && result.response ? result.response : [], 
                page: payload.page
            },
            type: result.status && result.response ? ActionConsts.Messages.GetAllMessagesSuccess : ActionConsts.Messages.GetAllMessagesError
        });
    }
}
