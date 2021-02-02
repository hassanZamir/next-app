// #region Global Imports
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import {
    StaticImage,
    PaymentSettings,
    SuggestedFollowersList,
    CreatePost,
} from "@Components";
import { USER_SESSION, FeedsModel, IFeedsPage, FEED } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FeedsActions } from "@Actions";

import { FeedsList, FeedsLoaderDiv } from "./FeedsList";
// #endregion Local Imports

export const FeedsComponent: React.FunctionComponent<{
    user: USER_SESSION;
    scrolledToBottom: boolean;
}> = ({ user, scrolledToBottom }) => {
    const feedsState = useSelector((state: IStore) => state.feeds);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { feeds, errors, profilesSuggestion, newPost, postContentStatus } = feedsState;
    const { paginationNo, emptyPageNo } = feeds;
    const [newPosts, setNewPosts] = useState<FEED[]>([]);

    useEffect(() => {
        if (postContentStatus == "success")
            setNewPosts([newPost, ...newPosts]);
        return () => {
            newPosts.slice(0, newPosts.length);
        }
    }, [newPost])

    const getUserFeeds = async (params: FeedsModel.GetAllFeedsPayload) => {
        await dispatch(FeedsActions.GetAllFeeds(params));
    };

    const getSuggestions = async (
        params: IFeedsPage.Actions.IGetProfilesSuggestionPayload
    ) => {
        await dispatch(FeedsActions.GetProfileSuggestion(params));
    };

    useEffect(() => {
        (async () => {
            if (scrolledToBottom) {
                if (emptyPageNo < paginationNo) {
                    const params = { userId: user.id, page: paginationNo, authtoken: user.token };
                    await getUserFeeds(params);
                }
            }
        })();
    }, [scrolledToBottom]);

    useEffect(() => {
        (async () => {
            const params = { userId: user.id, page: paginationNo, authtoken: user.token };
            await getUserFeeds(params);
            await getSuggestions({ viewerId: user.id, authtoken: user.token });
            setLoading(false);
        })();
    }, []);

    return (
        <div>
            <div className="my-2 row justify-content-center no-gutters">
                <Link href="/">
                    <a>
                        <StaticImage
                            className="cursor-pointer"
                            src="/images/veno_tv_logo_main@2x.png"
                            height="35px"
                            width="164px"
                        />
                    </a>
                </Link>
            </div>
            {user.isCreator && (
                <div>
                    <CreatePost user={user} />
                </div>
            )}
            {errors && <div className="text-danger font-12px">{errors}</div>}
            {newPosts && newPosts.length > 0 && !loading && (
                <FeedsList feeds={newPosts} user={user} />
            )}
            {feeds && feeds.value.length > 0 && !loading && (
                <FeedsList feeds={feeds.value} user={user} />
            )}
            {feeds && feeds.value.length <= 0 && !loading && <div>
                <div className="py-3 border-bottom border-top d-flex flex-column align-items-center justify-content-center">
                    {/* {!user.isCreator && <PaymentSettings user={user} />} */}
                    <div className="mt-4 lato-regular font-17px text-grey200">
                        Follow creator profiles to see exclusive content
                    </div>
                </div>
                <SuggestedFollowersList profilesSuggestion={profilesSuggestion}
                />
            </div>}
            {loading && <FeedsLoaderDiv />}
        </div>
    );
};
