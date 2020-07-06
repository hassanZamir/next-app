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
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
import dynamic from 'next/dynamic';
// #endregion Interface Imports

const DynamicLogin: any = dynamic(
    () => import('@Components/LoginComponent').then((mod) => mod.LoginComponent) as any,
    { ssr: false }
);

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = (props) => {
    const login = useSelector((state: IStore) => state.login);

    return (
        <Layout>
           {'id' in login.session ? <div>Hello</div> : <DynamicLogin />}
        </Layout>
    );
};

export const getStaticProps = (...params: any) => {
    return { 
        props: {
            namespacesRequired: ["common"]
        }
    };
};

export default Home;
