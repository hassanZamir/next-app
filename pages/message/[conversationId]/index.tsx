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
import { ConversationComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{session: USER_SESSION, name: string}>>,
    { ssr: false }
);

const UserStatus: NextPage = () => {
    const { session } = useSelector((state: IStore) => state.persistState);
    const router = useRouter();
    const conversationId = router.query["conversationId"] as string;

    return <Authenticated session={session} name="Messages">
        <ConversationComponent user={session} />
    </Authenticated>;
};

export async function getServerSideProps(context: any) {
    return { props: {} }
}

// export async function getStaticPaths() {
//     return {
//       paths: [{
//         params: { username: "venotv1234", contentId: "0" } // See the "paths" section below
//       }],
//       fallback: true
//     };
// }

// export const getStaticProps = (...params: any) => {
//     return { props: {} };
// };

export default UserStatus;
