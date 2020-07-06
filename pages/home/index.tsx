// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link'

// #endregion Global Imports

// #region Local Imports
// import { withTranslation } from "@Server/i18n";
import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
    Apod,
    ApodButton,
} from "@Styled/Home";
import { Layout } from "@Components/Layout";
import { IStore } from "@Redux/IStore";
import { HomeActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = () => {
    const home = useSelector((state: IStore) => state.home);
    const login = useSelector((state: IStore) => state.login);
    const signUp = useSelector((state: IStore) => state.signUp);
    const dispatch = useDispatch();

    console.log("home state", home);
    console.log("login state", login);
    console.log("signup state", login);

    return (
        <Layout>
           <Link href="login">Login</Link>
        </Layout>
    );
};

export const getStaticProps = () => ({
    props: {
        namespacesRequired: ["common"]
    }
});

export default Home;
