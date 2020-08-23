// #region Global Imports
import React, { useEffect, useState } from "react";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { useDispatch } from "react-redux";
import { StatusActions } from "@Actions";
import { StaticImage, FeedsList, Comments } from "@Components";
import { FEED, USER_SESSION } from "@Interfaces";
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

export const ContentComponent: React.FunctionComponent<{ userName: string, contentId: number, user: USER_SESSION, feed: FEED }> = 
    ({ userName, contentId, user, feed }) => {
    
    const [getFeedError, setGetFeedError] = useState('');
    const dispatch = useDispatch();
    
    const pollFeed = () => {
        const params = { viewerId: user.id, contentId: contentId };
        dispatch(StatusActions.GetFeed(params));
    }

    useEffect(() => {
        const i = setInterval(pollFeed, 10000);
        if (!('id' in feed)) pollFeed();

        return () => {
            clearInterval(i);
            // dispatch({
            //     payload: { feed: {} },
            //     type: ActionConsts.Feeds.ClearPersistFeed
            // });
        }   
    }, []);

    return (<div className="d-flex flex-column" style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "40px" }}>
        <div className="my-2 row justify-content-center no-gutters">
            <Link href="/">
                <a>
                    <StaticImage className="cursor-pointer" src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
                </a>
            </Link>
        </div>
        {getFeedError && <div className="text-darkGrey font-12px">{getFeedError}</div>}
        <FeedsList feeds={[feed]} user={user} />
        <Comments contentId={contentId} user={user} commentsCount={feed.commentsCount} />
    </div>);
}
