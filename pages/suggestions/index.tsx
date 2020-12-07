// #region Global Imports
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// #endregion Local Imports

// #region Interface Imports
import { IFeedsPage, USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
import { ProfileSuggestion, SuggestedFollowersList } from "@Components";
import { FeedsActions } from "@Actions";
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () =>
        import("@Components/Authenticated").then(
            mod => mod.Authenticated
        ) as Promise<
            React.FunctionComponent<{ session: USER_SESSION; name: string }>
        >,
    { ssr: false }
);

const Suggestions: NextPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: IStore) => state.persistState.session);
    const suggestions = useSelector((state: IStore) => state.feeds.profilesSuggestion);
    const suggestionsEnd = useSelector((state: IStore) => state.feeds.profilesSuggestionEnd);

    const [currentPage, setCurrentPage] = useState(0);

    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const onScroll = (bottom: boolean) => {
        bottom ? setScrolledToBottom(true) : setScrolledToBottom(false);
    };
    useEffect(() => {
        (async () => {
            if (scrolledToBottom && !suggestionsEnd) {
                setCurrentPage(currentPage + 1);
            }
        })();
    }, [scrolledToBottom]);

    const getProfilesSuggestions = async (
        params: IFeedsPage.Actions.IGetProfilesSuggestionPayload
    ) => {
        await dispatch(FeedsActions.GetProfileSuggestion(params));
    };
    useEffect(() => {
        if (user && user.id) {
            (async () => {
                await getProfilesSuggestions({ viewerId: user.id, authtoken: user.token, page: currentPage, offset: 10 });
            })();
        }
    }, [currentPage])

    return (
        <Authenticated session={user} name="App Middle Icon" onScroll={onScroll}>
            <SuggestedFollowersList
                profilesSuggestion={suggestions}
            />
        </Authenticated>
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Suggestions;