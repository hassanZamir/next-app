// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { TextMessageContainer } from "@Components/Basic";
import { CONVERSATION_TIP_MESSAGE, USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const ConversationTipMessage: React.FunctionComponent<{ user: USER_SESSION, conversationMessage: CONVERSATION_TIP_MESSAGE, isMessageRecieved: boolean, messageRef: any }> 
    = ({ user, conversationMessage, isMessageRecieved, messageRef }) => {

    if (!conversationMessage.meta)
        return null;
    
    const { meta } = conversationMessage;

    const messageString = conversationMessage.message.split('Tipped');
    return (<div ref={messageRef} className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end" )}>
        <div className="d-flex flex-column align-items-center">
            <TextMessageContainer isMessageRecieved={isMessageRecieved}>
                <div className="d-flex flex-column">
                    <div className="text-center">
                        <div className="font-16px text-center">
                            { messageString[0] + ' Tipped '}
                        </div>
                        <div className="font-16px text-center">
                            { messageString[1] }
                        </div>
                    </div>
                    
                    <div className="font-28px lato-bold text-center"
                        style={{ width: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipses" }}>
                        
                        { "$ " + meta.amount }
                    </div>
                    {/* <ParagraphText style={{}}
                        className="font-28px lato-bold text-center">
                        { "$ " + meta.amount }
                    </ParagraphText> */}
                </div>
            </TextMessageContainer>
            {meta.tipMsg && <div className="mt-1"></div>}
            {meta.tipMsg && <TextMessageContainer isMessageRecieved={isMessageRecieved}>
                { meta.tipMsg }
            </TextMessageContainer>}
        </div>
    </div>);
}
