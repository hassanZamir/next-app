// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { StaticImage, Footer } from "@Components";
import { IFeedsPage } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FeedsActions } from "@Actions";

import { FeedsList, FeedsLoaderDiv } from "./FeedsList";
// #endregion Local Imports

export const FeedsComponent: React.FunctionComponent<IFeedsPage.IProps> = ({ user }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { user: user.id };
        dispatch(FeedsActions.GetAllFeeds(params));
    }, []);

    const { feeds } = feedsState;
    return (
        <div className="w-100 row flex-column justify-content-between">
            <div className="my-2 row justify-content-center no-gutters">
                <StaticImage src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
            </div>
            {feeds && feeds.length > 0 ? <FeedsList feeds={feeds} /> : <FeedsLoaderDiv />}
            <Footer selected="Home" />
        </div>
    );
}