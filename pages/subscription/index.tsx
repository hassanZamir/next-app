// #region Global Imports
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// #endregion Local Imports

// #region Interface Imports
import { USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
import { LoadingSpinner, ParagraphText } from "@Components";
import { useRouter } from "next/router";
import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled";
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

const Subscription: NextPage = () => {
    const user = useSelector((state: IStore) => state.persistState.session);
    const router = useRouter();
    const action = router.query["action"] as string;
    const creatorUsername = router.query["creator"] as string;

    useEffect(() => {
        var paymentStatusQueryParam = "";
        if (action == "payment-success") {
            paymentStatusQueryParam = `?f=${btoa("payment-success")}`;
        }
        else {
            paymentStatusQueryParam = `?f=${btoa("payment-error")}`;
        }
        // set redirection fallback
        // in case push notification gets missed
        setTimeout(() => {
            router.push("/profile/" + creatorUsername + paymentStatusQueryParam);
        }, 5000);

        // return () => {
        //     cleanup
        // }
    }, [])
    return <Authenticated session={user} name="">
        {action == "payment-success" && <Modal border={theme.colors.primary} borderRadius="18px" width="initial">
            <div className="w-100 d-flex flex-column">
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                    Processing Payment ... please wait!
                </ParagraphText>
            </div>
        </Modal>}

        {action == "payment-error" && <Modal border={theme.colors.primary} borderRadius="18px" width="initial">
            <div className="w-100 d-flex flex-column">
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                    Oops, something went wrong with your payment.
                </ParagraphText>

                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                    Redirecting back to the profile .. please wait!
                </ParagraphText>
            </div>
        </Modal>}

    </Authenticated>;

};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Subscription;
