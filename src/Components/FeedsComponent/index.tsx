// #region Global Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { StaticImage, PaymentSettings, SuggestedFollowersList, CreatePost } from "@Components";
import { USER_SESSION, FeedsModel, IFeedsPage } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FeedsActions } from "@Actions";

import { FeedsList, FeedsLoaderDiv } from "./FeedsList";
// #endregion Local Imports

export const FeedsComponent: React.FunctionComponent<{user: USER_SESSION, scrolledToBottom: boolean}> = ({ user, scrolledToBottom }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { feeds, errors, profilesSuggestion } = feedsState;
    const { paginationNo, emptyPageNo } = feeds;

    const getUserFeeds = async (params: FeedsModel.GetAllFeedsPayload) => {
        await dispatch(FeedsActions.GetAllFeeds(params));
    }

    const getProfilesFollowers = async (params: IFeedsPage.Actions.IGetProfilesSuggestionPayload) => {
        await dispatch(FeedsActions.GetProfileSuggestion(params));
    }

    useEffect(() => {
        (async () => {
            if (scrolledToBottom) {
                if (emptyPageNo < paginationNo) {
                    const params = { userId: user.id, page: paginationNo };
                    await getUserFeeds(params);
                    await getProfilesFollowers({ page: paginationNo }); 
                }
            }
        })()
    }, [scrolledToBottom]);

    useEffect(() => {
        (async () => {
            const params = { userId: user.id, page: paginationNo };
            await getUserFeeds(params);
            await getProfilesFollowers({});
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
        {user.isCreator && <CreatePost user={user} />}
        {errors && <div className="text-danger font-12px">{ errors }</div>}
        {feeds && feeds.value.length > 0 && !loading && <FeedsList feeds={feeds.value} user={user} /> }
        {feeds && feeds.value.length <= 0 && !loading && <div className="py-3 border-bottom border-top d-flex flex-column align-items-center justify-content-center">
            {!user.isCreator && <PaymentSettings user={user} />}
            <div className="mt-4 lato-regular font-17px text-grey200">Nothing New</div>
        </div>}
        {!loading && <SuggestedFollowersList 
            profilesSuggestion={profilesSuggestion} />}
        {loading && <FeedsLoaderDiv />}
    </React.Fragment>);
}
