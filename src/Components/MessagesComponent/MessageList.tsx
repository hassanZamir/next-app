// #region Global Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { LoadingSpinner } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { MessagesActions } from "@Actions";
import { MessageRow } from "./MessageRow";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const MessageList: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean, onCreateMessageClick: ()=>void }> 
    = ({ user, scrolledToBottom, onCreateMessageClick }) => {
    const messagesState = useSelector((state: IStore) => state.messages);
    const { allMessages } = messagesState;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
            const param = { userId: user.id };
            setLoading(true);
            debugger;
            await dispatch(MessagesActions.GetAllMessages(param));
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (scrolledToBottom) 
            getMessages();
    }, [scrolledToBottom]);

    const getMessages = async () => {
        if (allMessages.emptyPaginationNo > allMessages.paginationNo) {
            await MessagesActions.GetAllMessages({ userId: user.id, page: allMessages.paginationNo });
        }
    }

    return (<div className="d-flex flex-column" 
            style={{ flex: 1 }}>
            
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <LoadingSpinner size="3x" showLoading={loading}>
                    {allMessages.values.length > 0 && <div className="d-flex flex-column h-100 w-100">
                        {allMessages.values.map((message, i) => {
                            return <MessageRow message={message} key={i} user={user} />
                        })}
                    </div>}
                    {allMessages.values.length <=0 && <ParagraphText 
                        className="text-primary font-20px lato-bold">
                            No Messages in your inbox
                    </ParagraphText>}
                </LoadingSpinner>
                <div onClick={() => { onCreateMessageClick() }} 
                    className="cursor-pointer position-absolute bg-primary d-flex align-items-center justify-content-center" 
                    style={{ 
                        right: "20px", 
                        bottom: "80px",
                        height: "52px",
                        width: "52px",
                        borderRadius: "12px"
                    }}>
                    <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
                </div>
            </div>
    </div>);
}
