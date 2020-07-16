// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IProfilePage, USER_SESSION } from "@Interfaces";
import { ContentComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{session: USER_SESSION, name: string}>>,
    { ssr: false }
);

const UserProfile: NextPage<IProfilePage.IProps> = () => {
    const login = useSelector((state: IStore) => state.loginSuccess);
    const router = useRouter();
    const profileId = router.query["id"] as string,
    contentId = router.query["contentId"] as string;;

    return <Authenticated session={login.session} name="ContentPage">
        <ContentComponent profileId={profileId} contentId={contentId} />
    </Authenticated>;
};

export async function getStaticPaths() {
    return {
      paths: [{
        params: { id: "0", contentId: "0" } // See the "paths" section below
      }],
      fallback: true
    };
}

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default UserProfile;
