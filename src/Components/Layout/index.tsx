import * as React from "react";

import { LayoutProps } from "./Layout";

const Layout: React.FunctionComponent<LayoutProps> = ({
    children,
}): JSX.Element => {
    return <div className="container h-100 position-absolute top-0 left-0 right-0 bottom-0" style={{ minWidth: "320px" }}>
        <section className="row h-100 justify-content-center">
            <main className="col-sm-6 row justify-content-center">
                {children}
            </main>
        </section>
    </div>;
};

export { Layout };
