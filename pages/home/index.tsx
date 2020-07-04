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
    const dispatch = useDispatch();

    console.log("hey");
    console.log("home", home);
    console.log("login", login);
    // const renderLocaleButtons = (activeLanguage: string) =>
    //     ["en", "es", "tr"].map(lang => (
    //         <LocaleButton
    //             key={lang}
    //             lang={lang}
    //             isActive={activeLanguage === lang}
    //             onClick={() => i18n.changeLanguage(lang)}
    //         />
    //     ));

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
    // return { namespacesRequired: ["common"] };
});
// Home.getStaticProps = async (
//     ctx: ReduxNextPageContext
// ): Promise<IHomePage.InitialProps> => {
//     await ctx.store.dispatch(
//         HomeActions.GetApod({
//             params: { hd: true },
//         })
//     );
//     return { namespacesRequired: ["common"] };
// };

// const Extended = withTranslation("common")(Home);

export default Home;
