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

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-toast-notifications";
import { Footer, Toast } from "@Components";

import "@Static/css/main.scss";
import "../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import { Layout } from "@Components";
// #endregion Local Imports

class WebApp extends App<AppWithStore> {
    render() {
        const { Component, pageProps, store } = this.props;
        const persistor = persistStore(store);

        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate
                        loading={<Component {...pageProps} />}
                        persistor={persistor}
                    >
                        <Layout>
                            <ToastProvider
                                components={{ Toast: Toast } as any}
                                autoDismiss={true}
                                placement="top-center"
                            >
                                <Component {...pageProps} />
                            </ToastProvider>
                        </Layout>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default withRedux(makeStore)(WebApp);
