// #region Global Imports
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import {} from "@Components";
// #endregion Local Imports

const AccountVerify: NextPage<{}> = () => {
    const router = useRouter();
    const accountVerifyState = useSelector(
        (state: IStore) => state.accountVerify
    );
    const token = router.query["token"] as string;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoginActions.AccountVerify({ token: token }));
    }, []);

    const { message, loading } = accountVerifyState;

    return (
        <div className="d-flex align-items-center flex-column">
            <h2 style={{ margin: "40px 0px" }}>Account Verify</h2>
            <div
                style={{ margin: "200px 0px" }}
                className="d-flex flex-column align-content-center justify-content-center"
            >
                {loading && <h3 className="mt-5">Loading...</h3>}
                {!loading && (
                    <h5
                        className={
                            message.type === "success"
                                ? "text-success"
                                : "text-danger"
                        }
                    >
                        {message.text}
                    </h5>
                )}
                {!loading && message.type === "success" && (
                    <Link href="/">Login</Link>
                )}
            </div>
        </div>
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default AccountVerify;
