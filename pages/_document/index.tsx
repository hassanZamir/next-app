// #region Global Imports
import * as React from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
// #endregion Global Imports

class WebAppDocument extends Document {
    static async getStaticProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="google-signin-client_id" content="188853246065-9nsijv8cfajp02qn8t3sgmnir0g9n6lq.apps.googleusercontent.com" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />
                    <link rel="shortcut icon" href="/images/veno.ico" />
                    {/* <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;
