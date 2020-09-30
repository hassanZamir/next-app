// #region Global Imports
import React, { useState, useEffect, useRef, RefObject, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { theme } from "@Definitions/Styled";
import { USER_SESSION, MESSAGE_LIST_ITEM, CONVERSATION_RESPONSE, CONVERSATION_MEDIA_MESSAGE, CONVERSATION_TIP_MESSAGE, CONVERSATION_THREAD } from "@Interfaces";
import { ParagraphText, LoadingSpinner } from "@Components";
import { ConversationTextMessage } from "./ConversationTextMessage";
import { ConversationMediaMessage } from "./ConversationMediaMessage";
import { ConversationTipMessage } from "./ConversationTipMessage";
import { CreateMessage } from "./CreateMessage";
import { MessagesActions } from "@Actions";
import { NotificationPusher } from '@Services/Pusher';
import { useModal } from '../Hooks';
import { MessageSettingsModal } from "../Modals/MessagSettingsModal";
// #endregion Local Imports

export const ConversationComponent: React.FunctionComponent<{ user: USER_SESSION, conversationId: number, conversationThread: CONVERSATION_THREAD }> 
    = ({ user, conversationThread, conversationId }) => {

    const conversationState = useSelector((state: IStore) => state.conversationState);
    const { conversation } = conversationState;
    const messagesListRef:RefObject<HTMLDivElement> = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [scrolledTop, setScrolledTop] = useState(false);
    const [fetchingPagination, setFetchingPagination] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    const scrollToLastComment = () => {
        messagesListRef.current && messagesListRef.current!.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        if (!scrolledTop) 
            scrollToLastComment();
    }, [conversation.values]);

    const subscribePresenceChannel = () => {
        const channelName = 'presence-channel-' + conversationId;
        const apiUrl = process.env.API_URL;
        NotificationPusher.getChannel(channelName, { 
            cluster: 'ap4', encrypted: true, 
            authTransport: 'jsonp',
            authEndpoint:  apiUrl + '/pusher/auth',
            auth: { params: { userId: user.id } }
        }).then((channel: any) => {
            console.log("Presence channel subscribed");
        }).catch((err: any) => {
            console.log("Error occured subscribing pusher : ", err);
        });
    }

    useEffect(() => {
        if (conversationThread.id !== conversationId) {
            Router.push("/message", "/message");
            return;
        }
        (async () => {
            setLoading(true);
            dispatch(MessagesActions.ConversationSeen({ userId: user.id, conversationId: conversationId }));
            subscribePresenceChannel();
            await dispatch(MessagesActions.GetConversation({ 
                conversationId: conversationId,
                userName: user.username
            }));
            setLoading(false);
            scrollToLastComment();
        })()
    }, []);
    
    const fetchPaginatedResponse = async () => {
        if (conversation.paginationNo < conversation.emptyPaginationNo) {
            setFetchingPagination(true);
            await dispatch(MessagesActions.GetConversation({ 
                conversationId: conversationId,
                page: conversation.paginationNo,
                userName: user.username
            }));
            setFetchingPagination(false);
        }
    }

    const getMappedWithDate = (messages: any) => {
        const today = new Date().toDateString();        
        const groups = messages.reduce((groups: any, message: any) => {
            const date = new Date(message.timestamp).toDateString();
            if (date === today) {
                if (!groups['Today']) groups['Today'] = [];
                groups['Today'].push(message);
            } else {
                if (!groups[date]) groups[date] = [];
                groups[date].push(message);
            }
            return groups;
        }, {});
        
        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                messages: groups[date]
            };
        });
        return groupArrays;
    }

    const { conversationSettings } = conversationThread;

    return (<div className="d-flex flex-column h-100" 
        style={{ flex: "1 1 auto" }}>

        <div className="pt-4 pb-3 d-flex justify-content-between align-items-center no-gutters mx-4">
            <FontAwesomeIcon
                onClick={() => Router.back()}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <ParagraphText className="text-primary lato-bold">{ conversationThread.name || "" }</ParagraphText>
            <div className="d-flex align-items-center position-relative">
                {user.isCreator && <img className="cursor-pointer" 
                    onClick={() => { 
                        dispatch(MessagesActions.UpdateMessageSettings({
                            userName: user.username,
                            recipientUsername: conversationThread.userName,
                            apiRouteKey: conversationSettings && conversationSettings.favourite ? 'unfavourite' : 'favourite',
                            apiReducerKey: 'favourite'
                        }));
                    }}
                    src={conversationSettings && conversationSettings.favourite ? '/images/favourite_star_filled.svg' : '/images/favourite_star.svg'} />}
                
                <FontAwesomeIcon className="cursor-pointer ml-2" icon={faEllipsisH} 
                    onClick={()=>{ toggle(); }}
                    color={theme.colors.primary} size="lg"/>
                <MessageSettingsModal 
                        isShowing={isShowing} 
                        toggle={toggle}
                        modalRef={modalRef} 
                        user={user} 
                        conversationThread={conversationThread} />
            </div>
        </div>
        <div className="d-flex flex-column w-100 h-100 full-flex-scroll">
            {fetchingPagination && <div className="font-12px text-grey100 w-100 text-center">Loading...</div>}
            <div onScroll={(e: any)=> {
                    if (e.target.scrollTop <= 0 && !fetchingPagination) {
                        setScrolledTop(true);
                        fetchPaginatedResponse();                      
                    }
                    if (e.target.scrollTop > 30) {
                        setScrolledTop(false);
                    }
                }} className="d-flex align-items-center justify-content-center h-100 w-100 full-flex-scroll hide-scroller">
                <LoadingSpinner size="3x" showLoading={loading}>
                    {conversation.values.length > 0 ? <div className="d-flex flex-column h-100 w-100 px-4">
                        {getMappedWithDate(conversation.values).map((conversationGroupedByDate, j) => {
                            return <div className="d-flex flex-column w-100" key={j}>
                                <div className="text-center text-primary py-3">{ conversationGroupedByDate.date }</div>
                                {conversationGroupedByDate.messages.map((conversationMessage: CONVERSATION_RESPONSE, i: number) => {
                                    return conversationMessage.type === 1 ? <ConversationTextMessage 
                                        messageRef={conversationMessage.id === conversation.values[conversation.values.length - 1].id ? messagesListRef : null}
                                        conversationMessage={conversationMessage} 
                                        isMessageRecieved={user.id !== conversationMessage.senderId} 
                                        key={i} /> : conversationMessage.type === 2 ? <ConversationMediaMessage 
                                        messageRef={conversationMessage.id === conversation.values[conversation.values.length - 1].id ? messagesListRef : null}
                                        conversationMessage={conversationMessage as CONVERSATION_MEDIA_MESSAGE} 
                                        isMessageRecieved={user.id !== conversationMessage.senderId} 
                                        user={user}
                                        key={i} /> : <ConversationTipMessage 
                                        user={user}
                                        messageRef={conversationMessage.id === conversation.values[conversation.values.length - 1].id ? messagesListRef : null}
                                        conversationMessage={conversationMessage as CONVERSATION_TIP_MESSAGE} 
                                        isMessageRecieved={user.id !== conversationMessage.senderId} 
                                        key={i} />
                                })}
                            </div>
                        })}
                    </div> : <ParagraphText className="text-primary font-20px lato-bold">
                        No Messages
                    </ParagraphText>}
                </LoadingSpinner>
            </div>
        </div>
        <CreateMessage 
                user={user} 
                conversationId={conversationId} 
                onSuccess={scrollToLastComment} 
                conversationThread={conversationThread} />        
    </div>);
}
