// #region Global Imports
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";
import { BroadcastComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{session: USER_SESSION, name: string}>>,
    { ssr: false }
);

const BroadcastMessage: NextPage = () => {
    const { session, broadcastRecipients } = useSelector((state: IStore) => state.persistState);
    const router = useRouter();

    return <Authenticated session={session} name="Messages">
        <BroadcastComponent 
            user={session} 
            recipients={broadcastRecipients} />

    </Authenticated>;
};

export async function getServerSideProps(context: any) {
    return { props: {} }
}

export default BroadcastMessage;
