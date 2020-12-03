// #region Global Imports
import React, { useEffect, useLayoutEffect } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IProfilePage, IStatusPage, USER_SESSION } from "@Interfaces";
import { ContentComponent } from "@Components";
import { StatusActions } from "@Actions";
// #endregion Local Imports

// #region Interface Imports
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

const UserStatus: NextPage<IProfilePage.IProps> = () => {
    const { session, feed } = useSelector(
        (state: IStore) => state.persistState
    );
    const dispatch = useDispatch()
    const router = useRouter();
    const userName = router.query["username"] as string,
        contentId = parseInt(router.query["contentId"] as string);

    useLayoutEffect(() => {
        // console.log("UserStatus-contentid: ", contentId);
        // redirect to creator profile if status Id is not valid
        if (!(contentId > 0))
            router.push(`/profile/${userName}?c=${btoa(contentId.toString())}&e=${btoa("status id not valid")}`);
        // load the feed object if the existing is not the same
        if ("id" in feed && feed.id != contentId) {
            // console.log("Fetching status feed content");
            var params: IStatusPage.Actions.IGetGetFeedPayload = {
                viewerId: session.id,
                authtoken: session.token,
                contentId: contentId,
            };
            dispatch(StatusActions.GetFeed(params));
        }
    }, []);

    return (
        <Authenticated session={session} name="Home">
            {contentId > 0 && "id" in feed && <ContentComponent
                userName={userName}
                contentId={contentId}
                user={session}
                feed={feed}
            />}
        </Authenticated>
    );
};

export async function getServerSideProps(context: any) {
    return { props: {} };
}

export default UserStatus;
