// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { NotificationComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { USER_SESSION } from "@Interfaces";
import dynamic from 'next/dynamic';
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{session: USER_SESSION, name: string}>>,
    { ssr: false }
);

const Notifications: NextPage = () => {
    const persistState = useSelector((state: IStore) => state.persistState);
    const { session } = persistState;
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    const onScroll = (bottom: boolean) => {
        bottom ? setScrolledToBottom(true) : setScrolledToBottom(false);
    }

    return <Authenticated session={session} name="Notification" onScroll={onScroll}>
        <NotificationComponent user={session} scrolledToBottom={scrolledToBottom} />
    </Authenticated>
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Notifications;
