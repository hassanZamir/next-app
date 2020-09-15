// #region Global Imports
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { theme } from "@Definitions/Styled";
import { USER_SESSION, MESSAGE_LIST_ITEM } from "@Interfaces";
import { ParagraphText, LoadingSpinner } from "@Components";
import { ConversationMessage } from "./ConversationMessage";
import { CreateMessage } from "./CreateMessage";
import { MessagesActions } from "@Actions";
// #endregion Local Imports

export const ConversationComponent: React.FunctionComponent<{ user: USER_SESSION, conversationId: number, messageListItem: MESSAGE_LIST_ITEM }> 
    = ({ user, messageListItem, conversationId }) => {

    const conversationState = useSelector((state: IStore) => state.conversationState);
    const { conversation } = conversationState;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (messageListItem.id !== conversationId) {
            Router.push("/messages", "/messages");
            return;
        }
        (async () => {
            setLoading(true);
            await dispatch(MessagesActions.GetConversation({ conversationId: conversationId }));
            setLoading(false);
        })()
    }, []);

    return (<React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between align-items-center no-gutters mx-4">
            <FontAwesomeIcon
                onClick={() => Router.back()}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <ParagraphText className="text-primary lato-bold">{ messageListItem.name || "Hassan" }</ParagraphText>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon className="cursor-pointer" icon={faStar} 
                    color={theme.colors.primary} size="lg" />
                <FontAwesomeIcon className="cursor-pointer ml-2" icon={faEllipsisH} 
                    color={theme.colors.primary} size="lg" />
            </div>
        </div>
        <div className="d-flex flex-column" style={{ flex: 1 }}>
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <LoadingSpinner size="3x" showLoading={loading}>
                    {conversation.values.length > 0 ? <div className="d-flex flex-column h-100 w-100 px-4">
                        {conversation.values.map((conversationMessage, i) => {
                            return <ConversationMessage 
                                conversationMessage={conversationMessage} 
                                isMessageRecieved={user.id !== conversationMessage.userId} 
                                key={i} />
                        })}
                    </div> : <ParagraphText className="text-primary font-20px lato-bold">
                        No Messages
                    </ParagraphText>}
                </LoadingSpinner>
            </div>
            <CreateMessage 
                user={user} 
                conversationId={conversationId} />
        </div>        
    </React.Fragment>);
}
