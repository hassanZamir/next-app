// #region Global Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { StaticImage, PaymentSettings, SuggestedFollowersList } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FeedsActions } from "@Actions";

import { FeedsList, FeedsLoaderDiv } from "./FeedsList";
// #endregion Local Imports

export const FeedsComponent: React.FunctionComponent<{user: USER_SESSION}> = ({ user }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { feeds, errors } = feedsState;

    useEffect(() => {
        (async () => {
            const params = { userId: user.id };
            await dispatch(FeedsActions.GetAllFeeds(params));
            setLoading(false);
        })()
    }, []);

    return (<React.Fragment>
        <div className="my-2 row justify-content-center no-gutters">
            <Link href="/">
                <a>
                    <StaticImage 
                        className="cursor-pointer" 
                        src="/images/veno_tv_logo_main@2x.png" 
                        height="100%" 
                        width="164px" />
                </a>
            </Link>
        </div>
        {feeds && feeds.length > 0 && !loading && <FeedsList feeds={feeds} user={user} /> }
        {feeds && feeds.length <= 0 && !loading && <div className="py-3 border-bottom border-top d-flex flex-column align-items-center justify-content-center">
            <PaymentSettings user={user} />
            <div className="mt-4 lato-regular font-17px text-grey200">Nothing New</div>
        </div>}
        {feeds && feeds.length <= 0 && !loading && <SuggestedFollowersList />}
        {errors && <div>{ errors }</div>}
        {loading && <FeedsLoaderDiv />}
    </React.Fragment>);
}
