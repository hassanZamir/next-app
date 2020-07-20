// #region Global Imports
import React from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IProfilePage, USER_SESSION } from "@Interfaces";
import { ProfileComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () => import('@Components/Authenticated').then((mod) => mod.Authenticated) as Promise<React.FunctionComponent<{session: USER_SESSION, name: string}>>,
    { ssr: false }
);

const UserProfile: NextPage<IProfilePage.IProps> = () => {
    const { session } = useSelector((state: IStore) => state.persistState);
    const router = useRouter();
    const profileUserName = router.query["username"] as string;

    return <ProfileComponent user={session} profileUserName={profileUserName} />
    // return <Authenticated session={login.session} name="Profile">
    //     <ProfileComponent user={login.session} profileUserName={profileUserName} />
    // </Authenticated>;
};

export default UserProfile;
