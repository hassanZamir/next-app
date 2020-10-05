// #region Global Imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { MessagesActions } from "@Actions";
import { theme } from "@Definitions/Styled";
import { USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
import { MessageList } from "./MessageList";
import { CreateMessage } from "./CreateMessage";
// #endregion Local Imports

export const MessagesComponent: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {

    const [showCreateMessage, setShowCreateMessage] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const dispatch = useDispatch();

    const onCreateMessageClick = () => {
        setShowCreateMessage(true);
    }

    const searchInputChange = async (e: any) => {
        if (e.target.value.length > 3) {
            const param = { 
                username: user.username, 
                type: showCreateMessage ? 2 : 1,
                text: e.target.value
            };
            setLoadingSearch(true);
            setSearchActive(true);
            await dispatch(MessagesActions.Search(param));
            setLoadingSearch(false);
        } else {
            setSearchActive(false);
            dispatch(MessagesActions.ClearSearch());
        }
    }

    return (<React.Fragment>
        <div className="mt-4 mb-2 d-flex align-items-center justify-content-between no-gutters mx-4"
            style={{ height: "25px" }}>
            <FontAwesomeIcon
                onClick={() => 
                    showCreateMessage ? setShowCreateMessage(false) : Router.back()
                }
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            {!showSearchInput && <FontAwesomeIcon className="cursor-pointer" icon={faSearch} 
                color={theme.colors.primary} size="lg" 
                onClick={()=>{ setShowSearchInput(true) }} />}
            {showSearchInput && <div className="position-relative">
                <input className="search-input border-grey100" 
                    type="text" 
                    onChange={(e) => { searchInputChange(e) }}
                    placeholder="Search.." />
                <button type="button" className="search-close" 
                    onClick={()=>{ 
                        setSearchActive(false);
                        dispatch(MessagesActions.ClearSearch());
                        setShowSearchInput(false); 
                    }}>

                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}
        </div>
        <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">
            {showCreateMessage ? "New Message" : "Messages"}
        </ParagraphText>
        {!showCreateMessage && <MessageList 
            searchActive={searchActive}
            user={user} 
            scrolledToBottom={scrolledToBottom} 
            onCreateMessageClick={onCreateMessageClick} 
            loadingSearch={loadingSearch} />}
        {showCreateMessage && <CreateMessage 
            user={user} 
            searchActive={searchActive}
            scrolledToBottom={scrolledToBottom} 
            loadingSearch={loadingSearch} />}
    </React.Fragment>);
}
