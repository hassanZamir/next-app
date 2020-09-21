// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { TextMessageContainer } from "@Components/Basic";
import { CONVERSATION_TIP_MESSAGE } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const ConversationTipMessage: React.FunctionComponent<{ conversationMessage: CONVERSATION_TIP_MESSAGE, isMessageRecieved: boolean, messageRef: any }> 
    = ({ conversationMessage, isMessageRecieved, messageRef }) => {

    if (!conversationMessage.meta)
        return null;
    
    const { meta } = conversationMessage;
    return (<div ref={messageRef} className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end" )}>
        <TextMessageContainer isMessageRecieved={isMessageRecieved}>
            <div className="d-flex flex-column">
                <ParagraphText className="font-14px text-center">{ meta.tipMsg }</ParagraphText>
                <ParagraphText className="font-28px lato-bold text-center">{ "$ " + meta.amount }</ParagraphText>
            </div>
        </TextMessageContainer>
    </div>);
}
