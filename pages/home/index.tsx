// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link'

// #endregion Global Imports

// #region Local Imports
// import { withTranslation } from "@Server/i18n";
import { Layout } from "@Components/Layout";
import { IStore } from "@Redux/IStore";
import { HomeActions } from "@Actions";
// #endregion Local Imports

// #region Interface Imports
import { IFeedsPage, ILoginPage } from "@Interfaces";
import dynamic from 'next/dynamic';
// #endregion Interface Imports

const DynamicLogin: any = dynamic(
    () => import('@Components/LoginComponent').then((mod) => mod.LoginComponent) as Promise<React.FunctionComponent<ILoginPage.IProps>>,
    { ssr: false }
);

const DynamicFeeds: any = dynamic(
    () => import('@Components/FeedsComponent').then((mod) => mod.FeedsComponent) as Promise<React.FunctionComponent<IFeedsPage.IProps>>,
    { ssr: false }
);

const Home: NextPage<ILoginPage.InitialProps> = (props) => {
    const login = useSelector((state: IStore) => state.login);

    return 'id' in login.session ? <DynamicFeeds user={login.session} /> : <DynamicLogin />;
};

export const getStaticProps = (...params: any) => {
    return { 
        props: {
            namespacesRequired: ["common"]
        }
    };
};

export default Home;
