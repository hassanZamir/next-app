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
import { Toast } from "@Components";
import { ToastProvider } from "react-toast-notifications";
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

const DynamicProfile: any = dynamic(
    () => import('@Components/ProfileComponent').then((mod) => mod.ProfileComponent) as Promise<React.FunctionComponent<{ user: USER_SESSION, profileUserName: string }>>,
    { ssr: false }
);

const UserProfile: NextPage<IProfilePage.IProps> = () => {
    const { session } = useSelector((state: IStore) => state.persistState);
    const router = useRouter();
    const profileUserName = router.query["username"] as string;

    return <ToastProvider
        components={{ Toast: Toast } as any}
        autoDismiss={true}
        placement="top-center"
    >
        <DynamicProfile user={session} profileUserName={profileUserName} />
    </ToastProvider>;
};

export default UserProfile;
