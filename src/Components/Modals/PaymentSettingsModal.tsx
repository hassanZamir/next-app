import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, PrimaryButton, CreditCardStaticImages, ThemedInputWithLabel } from "@Components";
import { PaymentActions } from "@Actions";
import { USER_SESSION, PAYMENT_USER_WALLET, PAYMENT_CARD } from "@Interfaces";
import { IStore } from "@Redux/IStore";

declare namespace IPaymentSettingsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: ()=>void;
        user: USER_SESSION;
        onAddCard: (a: boolean)=>void;
    }
}

const VenoWallet: React.FunctionComponent<{ userCards: PAYMENT_CARD[], userWallet: PAYMENT_USER_WALLET, user: USER_SESSION }> 
    = ({ userWallet, user, userCards }) => {
    const dispatch = useDispatch();
    const [showAddWallet, setShowAddWallet] = useState(false);
    const [loadingAddFundsToWallet, setLoadingAddFundsToWallet] = useState(false);
    const [inputs, setInputs] = useState({
        amount: ''
    });
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    useEffect(() => {
        if (showAddWallet) setShowAddWallet(false)
    }, [userWallet]);

    async function onAddFundsToWallet(amount: number) {
        setLoadingAddFundsToWallet(true);
        await dispatch(PaymentActions.AddFundsToWallet({amount: amount, userId: user.id}));
        setLoadingAddFundsToWallet(false);
    }

    return <div className="px-4 py-2 bg-primary-gradient border border-darkGrey d-flex flex-column align-items-center"
        style={{ borderRadius: "13px" }}>
        <ParagraphText className="font-25px text-white text-center">Veno Wallet</ParagraphText>
        {!showAddWallet && <React.Fragment>
            <div style={{ minHeight: "50px" }}>
                {userWallet && userWallet.balance && <div className="my-2 border-bottom border-white">
                    <ParagraphText className="font-28px text-white text-center">{'$ ' + userWallet.balance}</ParagraphText>
                </div>}
            </div>
            <div onClick={() => { setTimeout(() => { setShowAddWallet(true)}) }} className="cursor-pointer border border-white rounded font-12px lato-regular text-white p-2 text-center">
                Add funds to your Veno Tv Wallet
            </div>
        </React.Fragment>}
        {showAddWallet && <React.Fragment>
            <div className="text-white font-28px" style={{ minHeight: "50px" }}>
                <ThemedInputWithLabel 
                    labelProps={{labelText: "$", labelClass: "position-absolute bottom-0 left-40px" }} 
                    onChange={handleChange} 
                    name="amount"
                    style={{ paddingLeft: "60px" }}
                    type="number" 
                    border="white" 
                    width="200px" />
            </div>
            <div onClick={()=>{ userCards.length > 0 && onAddFundsToWallet( parseFloat(inputs.amount)) }} 
                style={{ opacity: userCards.length > 0 ? '1' : '0.7' }}
                className="cursor-pointer border border-white rounded font-12px lato-regular text-white py-2 px-4 text-center mt-2">
                Add funds <span>{loadingAddFundsToWallet && <FontAwesomeIcon icon={faSpinner} color="white" className="fa-spin"/>}</span>
            </div>
        </React.Fragment>}
    </div>
}

const AllCards: React.FunctionComponent<{ user: USER_SESSION, userCards: PAYMENT_CARD[], defaultCard: number, onAddCard: (a: boolean)=>void }> 
    = ({ user, userCards, defaultCard, onAddCard }) => {
    
    const dispatch = useDispatch();
    const [loadingPaymentSettings, setLoadingPaymentSettings] = useState(false);
    const onCardClick = async (card: PAYMENT_CARD) => {
        setLoadingPaymentSettings(true);
        await dispatch(PaymentActions.UpdatePaymentSettings({ userId: user.id, defaultCard: card.id}));
        setLoadingPaymentSettings(false);        
    }

    return <div className="mt-3"
        style={{ borderRadius: "13px" }}>
            <ParagraphText className="font-11px text-darkGrey lato-semibold">Your Cards</ParagraphText>
            <div style={{ height: "150px", overflowY: "scroll", padding: "5px 0px" }}>
                {userCards && userCards.length > 0 && userCards.map((card, i) => {
                    return <div key={i} onClick={()=>{ onCardClick(card) }} className={"cursor-pointer d-flex align-items-center mx-2 my-1 p-2 rounded border " + (card.id === defaultCard ? 'border-primary' : 'border-darkGrey')}>
                        <img height="20" width="30" src="/images/credit_card.png" />
                        <div className="text-primary font-10px ml-2 w-100 text-center">{ card.cardTitle + ' Card ending in ' + card.cardNumber}</div>
                    </div>
                })}
            </div>
            
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ width: "200px" }}>
                    <PrimaryButton 
                        name="add-card"
                        borderRadius="6px" 
                        className="mt-2 w-100"
                        isActive={!loadingPaymentSettings}
                        showLoader={loadingPaymentSettings}
                        onClick={(e)=>{ setTimeout(() => { onAddCard(true)}) }}>
                        Add Card
                    </PrimaryButton>
                </div>
                <div className="d-flex mt-2 lato-medium font-8px">
                    <div className="text-primary text-underline">Terms of Service</div>
                    <div className="mx-1">and</div>
                    <div className="text-primary text-underline">Privacy Policy</div>
                </div>
                <div className="font-8px text-darkGrey">
                    We are fully compliant with Payment Card Industry Data Security Standards
                </div>
                <div>
                    <CreditCardStaticImages />
                </div>
            </div>
    </div>
}

export const PaymentSettingsModal: React.RefForwardingComponent<HTMLDivElement, IPaymentSettingsModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user, onAddCard } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { paymentSettings, paymentSettingsError } = paymentState;
    const { userSettings, userWallet, userCard } = paymentSettings;
    const dispatch = useDispatch();
    
    const paymenModeIsWallet = userSettings && userSettings.paymentMode === 2;
    // const [paymentModeInputChecked, setPaymentModeInputChecked] = React.useState(paymenModeIsWallet);
    
    useEffect(() => {
        (async () => {
            await dispatch(PaymentActions.GetPaymentSettings({ userId: user.id }));
        })()
    }, [user]);

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
        const params = { userId: user.id, paymentMode: !togglePaymentMode ? 2 : 1};
        dispatch(PaymentActions.UpdatePaymentSettings(params));
    }

    return isShowing ? ReactDOM.createPortal(
                <Modal border={theme.colors.primary} borderRadius="18px"
                    width="initial">
                    <div className="w-100 h-100 d-flex flex-column" ref={modalRef}>
                        <div className="text-danger font-12px text-center">{ paymentSettingsError }</div>
                        <div className="border-bottom" style={{ margin: "0px -2rem", padding: "10px 2rem 20px" }}>
                                <VenoWallet userWallet={userWallet} user={user} userCards={userCard} />
                                <div className="lato-semibold font-13px text-darkGrey text-underline px-3 py-2">Payment through</div>
                                <div className={"d-flex align-items-center my-2 " + (!userSettings || !userSettings.paymentMode ? "disable-click" : "")}>
                                    <span className={"font-15px lato-semibold " + (paymenModeIsWallet ? "text-inputText" : "text-primary")}>Card</span>
                                    <label className="switch mx-2">
                                        <input type="checkbox" name="paymentModeInput" 
                                            onChange={() => onPaymentModeChange(paymenModeIsWallet) } checked={paymenModeIsWallet} />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className={"font-15px lato-semibold " + (!paymenModeIsWallet? "text-inputText" : "text-primary")}>Veno Wallet</span>
                                </div>
                        </div>
                        <AllCards 
                            user={user}
                            onAddCard={onAddCard} 
                            userCards={userCard} 
                            defaultCard={userSettings && userSettings.defaultCard ? userSettings.defaultCard : null} />
                    </div>
                </Modal>, document.body
        ) : null;
});
