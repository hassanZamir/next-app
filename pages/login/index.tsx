// #region Global Imports
import React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { Layout } from "@Components/Layout";
import { LoginComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { ILoginPage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const Login: NextPage<ILoginPage.IProps, ILoginPage.InitialProps> = () => {
    return (<LoginComponent />);
};

export const getStaticProps = (...params: any) => {
    return { 
        props: {
            namespacesRequired: ["common"]
        }
    };
};


export default Login;
