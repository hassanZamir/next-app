// #region Global Imports
import React, { useEffect, useState } from "react";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { useDispatch } from "react-redux";
import { StatusActions } from "@Actions";
import {  } from "@Components";
import { FEED, USER_SESSION } from "@Interfaces";
// #endregion Local Imports

export const ConversationComponent: React.FunctionComponent<{ user: USER_SESSION }> = 
    ({ user }) => {

    return (<div className="d-flex flex-column" 
        style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "40px" }}>
        
        Work in Progress !!
    </div>);
}
