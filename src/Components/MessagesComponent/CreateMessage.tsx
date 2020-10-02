// #region Global Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { LoadingSpinner } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { MessagesActions } from "@Actions";
import { RecipientRow } from "./RecipientRow";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const CreateMessage: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean, searchActive: boolean }> 
    = ({ user, scrolledToBottom, searchActive }) => {
    const messagesState = useSelector((state: IStore) => state.messages);
    const { messageRecipients } = messagesState;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
            const param = { userId: user.id };
            setLoading(true);
            await dispatch(MessagesActions.GetMessageRecipients(param));
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (scrolledToBottom) getRecipients();
    }, [scrolledToBottom]);

    const getRecipients = async () => {
        if (messageRecipients.emptyPaginationNo > messageRecipients.paginationNo) {
            await MessagesActions.GetMessageRecipients({ 
                userId: user.id, 
                page: messageRecipients.paginationNo 
            });
        }
    }

    const _recipients = searchActive ? messageRecipients.searchValues : messageRecipients.values;
    return (<div className="d-flex flex-column" 
            style={{ flex: 1 }}>
            
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <LoadingSpinner size="3x" showLoading={loading}>
                    {_recipients.length > 0 && <div className="d-flex flex-column h-100 w-100">
                        {_recipients.map((recipient, i) => {
                            return <RecipientRow recipient={recipient} 
                                user={user}
                                key={i} />
                        })}
                    </div>}
                    {!searchActive && messageRecipients.values.length <= 0 && <ParagraphText 
                        className="text-primary font-20px lato-bold">
                            You don't have any contacts
                    </ParagraphText>}
                </LoadingSpinner>
            </div>
    </div>);
}
