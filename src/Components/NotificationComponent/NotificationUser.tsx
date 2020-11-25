// #region Global Imports
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
// #endregion Global Imports

// #region Local Imports
import { USER_SESSION } from "@Interfaces";
// #endregion Local Imports

export const NotificationUser: React.FunctionComponent<{
    user: USER_SESSION;
}> = ({ user }) => {
    return <div>Notification User</div>;
};
