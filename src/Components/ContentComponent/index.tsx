// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { StaticImage, FeedsList, Comments } from "@Components";
import { FEED, USER_SESSION } from "@Interfaces";
// #endregion Local Imports

export const ContentComponent: React.FunctionComponent<{ userName: string, contentId: number, user: USER_SESSION, feed: FEED }> = 
    ({ userName, contentId, user, feed }) => {

    return (<div className="d-flex flex-column h-100">
        <div className="my-2 row justify-content-center no-gutters">
            <StaticImage src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
        </div>
        <FeedsList feeds={[feed]} user={user} />
        <Comments contentId={contentId} user={user} />
    </div>);
}
