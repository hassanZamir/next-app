// #region Global Imports
import React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { LoginComponent } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { ILoginPage } from "@Interfaces";
// #endregion Interface Imports

const Login: NextPage<ILoginPage.IProps> = () => {
    return (<LoginComponent />);
};

// export const getStaticProps = (...params: any) => {
//     return { props: {} };
// };

export default Login;
