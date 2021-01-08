// #region Global Imports
import React from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";

// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// #endregion Local Imports

// #region Interface Imports
import { USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
import { Statements } from "@Components";
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
// const DynamicStatements: any = dynamic(
//     () =>
//         import("@Components/Statements").then(
//             mod => mod.Statements
//         ) as Promise<
//             React.FunctionComponent<{ session: USER_SESSION; name: string }>
//         >,
//     { ssr: false }
// );

const Statement: NextPage = () => {
    const persistState = useSelector((state: IStore) => state.persistState);
    const { session } = persistState;
    // useEffect(() => {
    //     if (!session || !session.isCreator)
    //         Router.push("/");
    // })


    return (
        <Authenticated session={session} name="Account">
            <Statements user={session} />
        </Authenticated>
    );
};

// export const getStaticProps = (...params: any) => {
//     return { props: {} };
// };

export default Statement;
