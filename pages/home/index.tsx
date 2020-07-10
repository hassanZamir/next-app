// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { Authenticated } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { IFeedsPage } from "@Interfaces";
import dynamic from 'next/dynamic';
// #endregion Interface Imports

const DynamicFeeds: any = dynamic(
    () => import('@Components/FeedsComponent').then((mod) => mod.FeedsComponent) as Promise<React.FunctionComponent<IFeedsPage.IProps>>,
    { ssr: false }
);

const Home: NextPage = () => {
    const login = useSelector((state: IStore) => state.login);
    
    return <Authenticated session={login.session} name="Home">
        <DynamicFeeds user={login.session} />
    </Authenticated>
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Home;
