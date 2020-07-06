// #region Global Imports
import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import withRedux from "next-redux-wrapper";
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { AppWithStore } from "@Interfaces";
import { makeStore } from "@Redux";

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import "@Static/css/main.scss";
// #endregion Local Imports

class WebApp extends App<AppWithStore> {
    render() {
        const { Component, pageProps, store } = this.props;
        const persistor = persistStore(store);
        
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default withRedux(makeStore)(WebApp);
