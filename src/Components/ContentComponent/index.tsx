// #region Global Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
// #endregion Global Imports

// #region Local Imports

import { StaticImage } from "@Components";
// #endregion Local Imports

export const ContentComponent: React.FunctionComponent<{ profileId: string, contentId: string }> = ({ profileId, contentId }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);

    console.log("feedsState : ", feedsState);
    return (<div className="d-flex flex-column h-100">
        <div className="my-2 row justify-content-center no-gutters">
            <StaticImage src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
        </div>
        <h2>{'ProfileId : ' + profileId + ' ContentId : ' + contentId}</h2>
    </div>);
}
