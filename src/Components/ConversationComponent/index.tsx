// #region Global Imports
import React, { useState, useEffect, useRef, RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { theme } from "@Definitions/Styled";
import { USER_SESSION, MESSAGE_LIST_ITEM, CONVERSATION_MESSAGE } from "@Interfaces";
import { ParagraphText, LoadingSpinner } from "@Components";
import { ConversationMessage } from "./ConversationMessage";
import { CreateMessage } from "./CreateMessage";
import { MessagesActions } from "@Actions";
import { NotificationPusher } from '@Services/Pusher';
// #endregion Local Imports

export const ConversationComponent: React.FunctionComponent<{ user: USER_SESSION, conversationId: number, messageListItem: MESSAGE_LIST_ITEM }> 
    = ({ user, messageListItem, conversationId }) => {

    const conversationState = useSelector((state: IStore) => state.conversationState);
    const { conversation } = conversationState;
    const messagesListRef:RefObject<HTMLDivElement> = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const scrollToLastComment = () => {
        messagesListRef.current && messagesListRef.current!.scrollIntoView({behavior: "smooth"});
    }

    const memberAddedCallBack = (member: any) => {
        console.log("memberAddedCallBack", member);
    }

    useEffect(() => {
        const channelName = 'presence-channel-' + conversationId;
        const apiUrl = process.env.API_URL;
        NotificationPusher.getChannel(channelName, { 
            cluster: 'ap4', encrypted: true, 
            authTransport: 'jsonp',
            authEndpoint:  apiUrl + '/pusher/auth',
            auth: { params: { userId: user.id } }
        })
        .then((channel: any) => {
            NotificationPusher.subscribe('pusher:member_added', channel, memberAddedCallBack);
        }).catch((err: any) => {
            console.log("Error occured subscribing pusher : ", err);
        });

        if (messageListItem.id !== conversationId) {
            Router.push("/messages", "/messages");
            return;
        }
        (async () => {
            setLoading(true);
            await dispatch(MessagesActions.GetConversation({ conversationId: conversationId }));
            setLoading(false);
            scrollToLastComment();
        })()
    }, []);
    
    return (<div className="d-flex flex-column" 
    style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "40px" }}>

        <div className="pt-4 pb-3 d-flex justify-content-between align-items-center no-gutters mx-4">
            <FontAwesomeIcon
                onClick={() => Router.back()}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <ParagraphText className="text-primary lato-bold">{ messageListItem.name || "Name not coming in api" }</ParagraphText>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon className="cursor-pointer" icon={faStar} 
                    color={theme.colors.primary} size="lg" />
                <FontAwesomeIcon className="cursor-pointer ml-2" icon={faEllipsisH} 
                    color={theme.colors.primary} size="lg" />
            </div>
        </div>
        <div className="d-flex flex-column w-100 h-100" style={{ overflow: "hidden" }}>
            <div onScroll={(e: any)=> {
                // const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
                // !bottom ? setScrollingTop(true) : setScrollingTop(false); 
                // onScroll(e);
            }} className="d-flex align-items-center justify-content-center h-100 w-100 full-flex-scroll hide-scroller">
                <LoadingSpinner size="3x" showLoading={loading}>
                    {conversation.values.length > 0 ? <div className="d-flex flex-column h-100 w-100 px-4">
                        {conversation.values.map((conversationMessage: CONVERSATION_MESSAGE, i) => {
                            return <ConversationMessage 
                                messageRef={i >= conversation.values.length - 1 ? messagesListRef : null}
                                conversationMessage={conversationMessage} 
                                isMessageRecieved={user.id !== conversationMessage.senderId} 
                                key={i} />
                        })}
                    </div> : <ParagraphText className="text-primary font-20px lato-bold">
                        No Messages
                    </ParagraphText>}
                </LoadingSpinner>
            </div>
            <CreateMessage 
                user={user} 
                conversationId={conversationId} 
                onSuccess={scrollToLastComment} />
        </div>        
    </div>);
}
