// #region Global Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
import { MessageList } from "./MessageList";
// #endregion Local Imports

export const MessagesComponent: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {

    return (<React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.back()}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <FontAwesomeIcon className="cursor-pointer" icon={faSearch} 
                color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">
            Messages
        </ParagraphText>
        <MessageList user={user} scrolledToBottom={scrolledToBottom} />
    </React.Fragment>);
}
