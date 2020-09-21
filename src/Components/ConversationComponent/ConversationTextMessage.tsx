// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { TextMessageContainer } from "@Components/Basic";
import { CONVERSATION_TEXT_MESSAGE } from "@Interfaces";
// #endregion Local Imports

export const ConversationTextMessage: React.FunctionComponent<{ conversationMessage: CONVERSATION_TEXT_MESSAGE, isMessageRecieved: boolean, messageRef: any }> 
    = ({ conversationMessage, isMessageRecieved, messageRef }) => {

    return (<div ref={messageRef} className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end" )}>
            <TextMessageContainer isMessageRecieved={isMessageRecieved}>
            { conversationMessage.message }
        </TextMessageContainer>
    </div>);
}
