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
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{ session: USER_SESSION, name: string }>>,
    { ssr: false }
);

const UserStatus: NextPage<IProfilePage.IProps> = () => {
    const { session, feed, statusFound } = useSelector(
        (state: IStore) => state.persistState
    );
    const dispatch = useDispatch()
    const router = useRouter();
    const userName = router.query["username"] as string,
        contentId = parseInt(router.query["contentId"] as string);


    return (
        <Authenticated session={session} name="Home">
            <ContentComponent
                userName={userName}
                contentId={contentId}
                user={session}
                feed={feed}
            />
        </Authenticated>
    );
};

export async function getServerSideProps(context: any) {
    return { props: {} }
}

export default UserStatus;
