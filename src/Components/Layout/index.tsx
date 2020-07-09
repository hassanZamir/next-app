import * as React from "react";

import { LayoutProps } from "./Layout";

const Layout: React.FunctionComponent<LayoutProps> = ({
    children,
}): JSX.Element => {
    return <div className="px-0 container position-absolute left-0 right-0 top-0 bottom-0" style={{ minWidth: "320px" }}>
        <section className="row h-100 justify-content-center no-gutters flex-nowrap">
            <main className="col-lg-6 d-flex justify-content-center no-gutters">
                {children}
            </main>
        </section>
    </div>;
};

export { Layout };
