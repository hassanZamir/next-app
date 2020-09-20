// #region Global Imports
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
import { MessageList } from "./MessageList";
import { CreateMessage } from "./CreateMessage";
// #endregion Local Imports

export const MessagesComponent: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {

    const [showCreateMessage, setShowCreateMessage] = useState(false);
    const onCreateMessageClick = () => {
        setShowCreateMessage(true);
    }

    return (<React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters mx-4">
            <FontAwesomeIcon
                onClick={() => 
                    showCreateMessage ? setShowCreateMessage(false) : Router.back()
                }
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <FontAwesomeIcon className="cursor-pointer" icon={faSearch} 
                color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">
            {showCreateMessage ? "New Message" : "Messages"}
        </ParagraphText>
        {!showCreateMessage && <MessageList 
            user={user} 
            scrolledToBottom={scrolledToBottom} 
            onCreateMessageClick={onCreateMessageClick} />}
        {showCreateMessage && <CreateMessage 
            user={user} 
            scrolledToBottom={scrolledToBottom} />}
    </React.Fragment>);
}
