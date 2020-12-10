// #region Global Imports
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// #endregion Local Imports

// #region Interface Imports
import { USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
import { Locations } from "@Constants";
import { SettingsComponent } from "@Components/SettingsComponent";
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

const Home: NextPage = () => {
    const persistState = useSelector((state: IStore) => state.persistState);
    const { session } = persistState;

    return (
        <Authenticated session={session} name="Account">
            <SettingsComponent
                user={session}
                locationslist={Locations}
            />
        </Authenticated>
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Home;
