// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// #endregion Local Imports

// #region Interface Imports
import { USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
// #endregion Interface Imports

const Authenticated: any = dynamic(
    () =>
        import("@Components/Authenticated").then(
            mod => mod.Authenticated
        ) as Promise<
            React.FunctionComponent<{ session: USER_SESSION; name: string }>
        >,
    { ssr: false }
);

const Support: NextPage = () => {
    const user = useSelector((state: IStore) => state.persistState.session);


    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const onScroll = (bottom: boolean) => {
        bottom ? setScrolledToBottom(true) : setScrolledToBottom(false);
    };

    return (
        <Authenticated session={user} name="App Middle Icon" onScroll={onScroll}>
            <iframe className="clickup-embed clickup-dynamic-height" src="https://forms.clickup.com/f/359t3-473/2EV39OJPVWEVXEDSQU" width="100%" height="100%" style={{background: "transparent", border: "1px solid #ccc"}}></iframe><script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"></script>
        </Authenticated>
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Support;