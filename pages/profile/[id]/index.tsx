// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IProfilePage } from "@Interfaces";
import { ProfileComponent, Authenticated } from "@Components";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const UserProfile: NextPage<IProfilePage.IProps> = () => {
    const login = useSelector((state: IStore) => state.login);
    const router = useRouter();
    const profileId = router.query["id"] as string;

    return <Authenticated session={login.session} name="Profile">
        <ProfileComponent user={login.session} profileId={profileId} />
    </Authenticated>;
};

export default UserProfile;
