import React, { RefObject, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme";
import {
    ParagraphText,
    PrimaryButton,
    CreditCardStaticImages,
    ThemedInputWithLabel,
} from "@Components";
import { PaymentActions } from "@Actions";
import { USER_SESSION, PAYMENT_USER_WALLET, PAYMENT_CARD } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import useSWR from 'swr';

declare namespace IPaymentSettingsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        user: USER_SESSION;
        onAddCard: (a: boolean) => void;
    }
}

export const VenoWallet: React.FunctionComponent<{
    userCards: PAYMENT_CARD[];
    userWallet: PAYMENT_USER_WALLET;
    user: USER_SESSION;
}> = ({ userWallet, user, userCards }) => {
    const dispatch = useDispatch();
    const [showAddWallet, setShowAddWallet] = useState(false);
    const [loadingAddFundsToWallet, setLoadingAddFundsToWallet] = useState(
        false
    );
    const [inputs, setInputs] = useState({
        amount: "",
    });
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    useEffect(() => {
        if (showAddWallet) setShowAddWallet(false);
    }, [userWallet]);

    async function onAddFundsToWallet(amount: number) {
        setLoadingAddFundsToWallet(true);

        // // convert string to int and check CCBill minimum amount limitations
        // if (+inputs.amount > 2.95) {
        //     // CCBill Form Data
        //     const clientAccnum = 0; // An integer value representing the 6 - digit merchant account number.
        //     const clientSubacc = '0000'; // An integer value representing the 4 - digit merchant subaccount number the customer should be charged on.
        //     const initialPrice = +inputs.amount; // A decimal value representing the initial price.
        //     const initialPeriod = 1;// An integer representing the length, in days, of the initial billing period.By default this is a 30, 60, or 90 day period.
        //     const currencyCode = 36; // An integer representing the 3 - digit currency code that will be used for the transaction.  978 - EUR, 036 - AUD, 124 - CAD, 826 - GBP, 392 - JPY, 840 - USD
        //     let formDigest;
        //     // get encoded formDigest from backend
        //     const { id, email, token } = user
        //     const response = await fetch("api/pay", {
        //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //         mode: 'same-origin', // no-cors, *cors, same-origin
        //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //         credentials: 'same-origin', // include, *same-origin, omit
        //         headers: {
        //             'Content-Type': 'application/json' // 'application/x-www-form-urlencoded',
        //         },
        //         redirect: 'follow', // manual, *follow, error
        //         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //         body: JSON.stringify({
        //             clientAccnum,
        //             clientSubacc,
        //             initialPrice,
        //             initialPeriod,
        //             currencyCode,
        //             user: {
        //                 id,
        //                 email,
        //                 token
        //             }
        //         })
        //     });

        //     const result = await response.json();
        //     if (result.status) {
        //         formDigest = result.data.formdigest;

        //         // redirect user to cc bill with dynamic pricing
        //         // https://api.ccbill.com/wap-frontflex/flexforms/?clientSubacc=0000&initialPrice=33.00&initialPeriod=1&currencyCode=036&formDigest=38295bb30118c0f7d88a2f12d600c995
        //         window.location.href = "https://api.ccbill.com/wap-frontflex/flexforms/?clientSubacc=0000&initialPrice=33.00&initialPeriod=1&currencyCode=036&formDigest=38295bb30118c0f7d88a2f12d600c995";//`https://api.ccbill.com/wap-frontflex/flexforms/983634b7-`;//?clientSubacc=0000&initialPrice=${initialPrice}&initialPeriod=${initialPeriod}&currencyCode=${currencyCode}&formDigest=${formDigest}`;
        //         return;
        //     }
        // }
        // else {
        //     // Error: amount should be greater than minimum value.
        //     // parseFloat(inputs.amount) === NaN => invalid amount value
        // }


        await dispatch(
            PaymentActions.AddFundsToWallet({ amount: amount, userId: user.id, authtoken: user.token })
        );
        setInputs({
            amount: ''
        })
        setLoadingAddFundsToWallet(false);
    }

    return (
        <div
            className="px-4 py-2 bg-primary-gradient border border-darkGrey d-flex flex-column align-items-center"
            style={{ borderRadius: "13px" }}
        >
            <ParagraphText className="font-25px text-white text-center">
                Veno Wallet
            </ParagraphText>
            {!showAddWallet && (
                <React.Fragment>
                    <div style={{ minHeight: "50px" }}>
                        {userWallet && userWallet.balance > 0 && (
                            <div className="my-2 border-bottom border-white">
                                <ParagraphText className="font-28px text-white text-center">
                                    {"$ " + userWallet.balance}
                                </ParagraphText>
                            </div>
                        )}
                        {userWallet && !userWallet.balance && (
                            <div className="my-2">
                                <ParagraphText className="font-28px text-white text-center">
                                    $ 0.00
                                </ParagraphText>
                            </div>
                        )}
                    </div>
                    <div
                        style={{ opacity: userCards.length > 0 ? "1" : "0.7" }}
                        onClick={() => {
                            userCards.length > 0 &&
                                setTimeout(() => {
                                    setShowAddWallet(true);
                                });
                        }}
                        className="cursor-pointer border border-white rounded font-12px lato-regular text-white p-2 text-center"
                    >
                        Add funds to your Veno Tv Wallet
                    </div>
                </React.Fragment>
            )}
            {showAddWallet && (
                <React.Fragment>
                    <div
                        className="text-white font-28px"
                        style={{ minHeight: "50px" }}
                    >
                        <ThemedInputWithLabel
                            labelProps={{
                                labelText: "$",
                                labelClass:
                                    "position-absolute bottom-0 left-40px",
                            }}
                            onChange={handleChange}
                            fontFamily="Lato Bold"
                            name="amount"
                            style={{ paddingLeft: "60px" }}
                            type="number"
                            border="white"
                            width="200px"
                        />
                    </div>
                    <div
                        onClick={() => {
                            userCards.length > 0 && inputs.amount &&
                                onAddFundsToWallet(parseFloat(inputs.amount));
                        }}
                        style={{ opacity: userCards.length > 0 ? "1" : "0.7" }}
                        className="cursor-pointer border border-white rounded font-12px lato-regular text-white py-2 px-4 text-center mt-2"
                    >
                        Add funds{" "}
                        <span>
                            {loadingAddFundsToWallet && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="white"
                                    className="fa-spin"
                                />
                            )}
                        </span>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export const AllCards: React.FunctionComponent<{
    user: USER_SESSION;
    userCards: PAYMENT_CARD[];
    defaultCard: number;
    onAddCard: (a: boolean) => void;
}> = ({ user, userCards, defaultCard, onAddCard }) => {
    const dispatch = useDispatch();
    const [loadingPaymentSettings, setLoadingPaymentSettings] = useState(false);
    const onCardClick = async (card: PAYMENT_CARD) => {
        setLoadingPaymentSettings(true);
        await dispatch(
            PaymentActions.UpdatePaymentSettings({
                userId: user.id,
                defaultCard: card.id,
                authtoken: user.token,
            })
        );
        setLoadingPaymentSettings(false);
    };

    return (
        <div className="mt-3" style={{ borderRadius: "13px" }}>
            <ParagraphText className="font-11px text-darkGrey lato-semibold">
                Your Cards
            </ParagraphText>
            <div
                style={{
                    height: "150px",
                    overflowY: "scroll",
                    padding: "5px 0px",
                }}
            >
                {userCards && userCards.length > 0 ? (
                    userCards.map((card, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    onCardClick(card);
                                }}
                                className={
                                    "cursor-pointer d-flex align-items-center mx-2 my-1 p-2 rounded border " +
                                    (card.id === defaultCard
                                        ? "border-primary"
                                        : "border-darkGrey")
                                }
                            >
                                <img
                                    height="20"
                                    width="20"
                                    src="/images/credit_card.png"
                                />
                                <div className="text-primary font-10px w-100 text-center">
                                    {card.cardTitle +
                                        " Card ending in " +
                                        card.cardNumber}
                                </div>
                            </div>
                        );
                    })
                ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center text-darkGrey font-12px">
                            No card added yet
                        </div>
                    )}
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ width: "200px" }}>
                    <PrimaryButton
                        name="add-card"
                        borderRadius="6px"
                        className="mt-2 w-100"
                        isActive={!loadingPaymentSettings}
                        showLoader={loadingPaymentSettings}
                        onClick={e => {
                            setTimeout(() => {
                                onAddCard(true);
                            });
                        }}
                    >
                        Add Card
                    </PrimaryButton>
                </div>
                <div className="d-flex mt-2 lato-medium font-8px">
                    <div className="text-primary text-underline">
                        Terms of Service
                    </div>
                    <div className="mx-1">and</div>
                    <div className="text-primary text-underline">
                        Privacy Policy
                    </div>
                </div>
                <div className="font-8px text-darkGrey">
                    We are fully compliant with Payment Card Industry Data
                    Security Standards
                </div>
                <div>
                    <CreditCardStaticImages />
                </div>
            </div>
        </div>
    );
};

export const PaymentSettingsModal: React.ForwardRefRenderFunction<
    HTMLDivElement,
    IPaymentSettingsModal.IProps
> = props => {
    const { isShowing, modalRef, toggle, user, onAddCard } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { paymentSettings, paymentSettingsError } = paymentState;
    const { userSettings, userWallet, userCard } = paymentSettings;
    const dispatch = useDispatch();

    const paymenModeIsWallet = userSettings && userSettings.paymentMode === 2;
    // const [paymentModeInputChecked, setPaymentModeInputChecked] = React.useState(paymenModeIsWallet);

    useEffect(() => {
        (async () => {
            await dispatch(
                PaymentActions.GetPaymentSettings({ userId: user.id, authtoken: user.token })
            );
        })();
    }, []);

    function onModalClose(e: any) {
        if (modalRef!.current && !modalRef!.current.contains(e.target)) {
            dispatch(PaymentActions.OnModalClosePaymentSettings());
        }
    }

    useEffect(() => {
        document.addEventListener("click", onModalClose);

        return () => {
            document.removeEventListener("click", onModalClose);
        };
    });

    function onPaymentModeChange(togglePaymentMode: boolean) {
        const params = {
            userId: user.id,
            paymentMode: !togglePaymentMode ? 2 : 1,
            authtoken: user.token,
        };
        dispatch(PaymentActions.UpdatePaymentSettings(params));
    }

    return isShowing
        ? ReactDOM.createPortal(
            <Modal
                border={theme.colors.primary}
                borderRadius="18px"
                width="initial"
            >
                <div
                    className="w-100 h-100 d-flex flex-column"
                    ref={modalRef}
                >
                    <div
                        className="modal-header"
                        style={{
                            position: "absolute",
                            top: "-38px",
                            right: "15px",
                        }}
                    >
                        <button
                            type="button"
                            className="font-28px text-white modal-close-button"
                            onClick={() => {
                                toggle();
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="text-danger font-12px text-center">
                        {paymentSettingsError}
                    </div>
                    <div
                        className="border-bottom"
                        style={{
                            margin: "0px -2rem",
                            padding: "10px 15px 20px",
                        }}
                    >
                        <VenoWallet
                            userWallet={userWallet}
                            user={user}
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
                    </div>
                    <AllCards
                        user={user}
                        onAddCard={onAddCard}
                        userCards={userCard}
                        defaultCard={
                            userSettings && userSettings.defaultCard
                                ? userSettings.defaultCard
                                : null
                        }
                    />
                </div>
            </Modal>,
            document.body
        )
        : null;
};
