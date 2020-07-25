// #region Global Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { StaticImage } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FeedsActions } from "@Actions";

import { FeedsList, FeedsLoaderDiv } from "./FeedsList";
// #endregion Local Imports

export const FeedsComponent: React.FunctionComponent<{user: USER_SESSION}> = ({ user }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { userId: user.id };
        dispatch(FeedsActions.GetAllFeeds(params));
    }, []);

    const { feeds, errors } = feedsState;
    return (<React.Fragment>
        <div className="my-2 row justify-content-center no-gutters">
            <Link href="/">
                <a>
                    <StaticImage className="cursor-pointer" src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
                </a>
            </Link>
        </div>
        {feeds && feeds.length > 0 ? <FeedsList feeds={feeds} user={user} /> : 
        (errors ? <div>{ errors }</div> : <FeedsLoaderDiv />)}
    </React.Fragment>);
}