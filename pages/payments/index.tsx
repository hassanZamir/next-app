// #region Global Imports
import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
// import { Authenticated } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { PAYMENT_CARD, PAYMENT_USER_WALLET, USER_SESSION } from "@Interfaces";
import dynamic from "next/dynamic";
import { AllCards, VenoWallet } from "@Components/Modals";
import { PaymentActions } from "@Actions";
import { ParagraphText } from "@Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@Definitions/Styled";
import Router, { useRouter } from "next/router";
import { useModal } from "@Components/Hooks";
import { AddCardModal } from "@Components/Modals/AddCardModal";
// #endregion Interface Imports

const DynamicPayments: any = dynamic(
    () =>
        import("@Components/Modals").then(
            mod => mod.VenoWallet
        ) as Promise<React.FunctionComponent<{
            userCards: PAYMENT_CARD[];
            userWallet: PAYMENT_USER_WALLET;
            user: USER_SESSION;
        }>>,
    { ssr: false }
);
const Authenticated: any = dynamic(
    () =>
        import("@Components/Authenticated").then(
            mod => mod.Authenticated
        ) as Promise<
            React.FunctionComponent<{ session: USER_SESSION; name: string }>
        >,
    { ssr: false }
);

const Payments: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const persistState = useSelector((state: IStore) => state.persistState);
    const { session } = persistState;
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    const paymentState = useSelector((state: IStore) => state.payment);
    const { paymentSettings, paymentSettingsError } = paymentState;
    const { userSettings, userWallet, userCard } = paymentSettings;

    const paymenModeIsWallet = userSettings && userSettings.paymentMode === 2;

    const onScroll = (bottom: boolean) => {
        bottom ? setScrolledToBottom(true) : setScrolledToBottom(false);
    };

    // add card flow
    const addCardModelRef = useRef<HTMLDivElement>(null)
    const addCardModal = useModal(addCardModelRef);
    const [showAddCard, setShowAddCard] = useState(false);

    useEffect(() => {
        (async () => {
            if (session && session.id)
                await dispatch(
                    PaymentActions.GetPaymentSettings({ userId: session.id, authtoken: session.token })
                );
        })();
    }, []);

    function onPaymentModeChange(togglePaymentMode: boolean) {
        const params = {
            userId: session.id,
            paymentMode: !togglePaymentMode ? 2 : 1,
            authtoken: session.token
        };
        dispatch(PaymentActions.UpdatePaymentSettings(params));
    }

    function onAddCard() {
        // setShowAddCard(true);
        addCardModal.toggle();
    }


    return (
        <Authenticated session={session} name="Account" onScroll={onScroll}>
            <div className="p-3">
                <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
                    <FontAwesomeIcon
                        onClick={() => Router.back()}
                        className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
                </div>
                <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">Payments</ParagraphText>
                <VenoWallet
                    userWallet={userWallet}
                    user={session}
                    userCards={userCard}
                />
                <div className="lato-semibold font-13px text-darkGrey text-underline px-3 py-2">
                    Payment through
                </div>
                <div
                    className={
                        "d-flex align-items-center my-2 " +
                        (!userSettings || !userSettings.paymentMode
                            ? "disable-click"
                            : "")
                    }
                >
                    <span
                        className={
                            "font-15px lato-semibold " +
                            (paymenModeIsWallet
                                ? "text-inputText"
                                : "text-primary")
                        }
                    >
                        Card
                              </span>
                    <label className="switch mx-2">
                        <input
                            type="checkbox"
                            name="paymentModeInput"
                            onChange={() =>
                                onPaymentModeChange(
                                    paymenModeIsWallet
                                )
                            }
                            checked={paymenModeIsWallet}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span
                        className={
                            "font-15px lato-semibold " +
                            (!paymenModeIsWallet
                                ? "text-inputText"
                                : "text-primary")
                        }
                    >
                        Veno Wallet
                              </span>
                </div>
                <AllCards
                    user={session}
                    onAddCard={onAddCard}
                    userCards={userCard}
                    defaultCard={
                        userSettings && userSettings.defaultCard
                            ? userSettings.defaultCard
                            : null
                    }
                />
            </div>
            {showAddCard && <AddCardModal
            toggle={addCardModal.toggle}
            isShowing={addCardModal.isShowing}  
            modalRef={addCardModelRef} 
            user={session} />}
        </Authenticated >
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default Payments;
