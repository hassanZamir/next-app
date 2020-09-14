// #region Global Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faCommentAlt, faUserPlus, faDollarSign, faBullhorn } from '@fortawesome/free-solid-svg-icons';
// import { faCommentAlt as faRegularCommentAlt} from '@fortawesome/free-regular-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { LoadingSpinner } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { MessagesActions } from "@Actions";
import { MessageRow } from "./MessageRow";
// #endregion Local Imports

export const MessageList: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {
    const messagesState = useSelector((state: IStore) => state.messages);
    const { allMessages } = messagesState;
    // const persistState = useSelector((state: IStore) => state.persistState);
    // const { notifications } = notificationState;
    // const { notificationStats } = persistState;
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
        if (scrolledToBottom) getMessages();
    }, [scrolledToBottom]);

    const getMessages = async () => {
        if (allMessages.emptyPaginationNo > allMessages.paginationNo) {
            await MessagesActions.GetAllMessages({ userId: user.id, page: allMessages.paginationNo });
        }
    }

    console.log("allMessages", allMessages);
    return (<div className="d-flex flex-column" 
            style={{ flex: 1 }}>
            
            <LoadingSpinner size="3x" showLoading={loading}>
                {allMessages.values.map((message, i) => {
                    return <MessageRow message={message} key={i} />
                })}
            </LoadingSpinner>
        </div>);
}
