// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { TextMessageContainer } from "@Components/Basic";
import { CONVERSATION_MESSAGE } from "@Interfaces";
// #endregion Local Imports

export const ConversationMessage: React.FunctionComponent<{ conversationMessage: CONVERSATION_MESSAGE, isMessageRecieved: boolean }> 
    = ({ conversationMessage, isMessageRecieved }) => {

    return (<div className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end" )}>
            <TextMessageContainer isMessageRecieved={isMessageRecieved}>
            { conversationMessage.message }
        </TextMessageContainer>
    </div>);
}
