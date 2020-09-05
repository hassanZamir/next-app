// #region Global Imports
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
import { NotificationCreator } from "@Components/NotificationComponent/NotificationCreator";
// import { NotificationUser } from "@Components/NotificationComponent/NotificationUser";
import { NotificationActions } from "@Actions";
// #endregion Local Imports

export const NotificationComponent: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NotificationActions.ViewNotifications({ userId: user.id, type: 0 }));
    }, []);

    return (<React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.back()}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            <FontAwesomeIcon className="cursor-pointer" icon={faSearch} color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">Notifications</ParagraphText>
        <NotificationCreator user={user} scrolledToBottom={scrolledToBottom} />
    </React.Fragment>);
}
