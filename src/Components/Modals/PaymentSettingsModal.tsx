import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, PrimaryButton } from "@Components";
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

const VenoWallet: React.FunctionComponent<{ userWallet: PAYMENT_USER_WALLET}> = ({ userWallet }) => {
    return <div className="px-4 py-2 bg-primary-gradient border border-darkGrey"
        style={{ borderRadius: "13px" }}>
            <ParagraphText className="font-25px text-white text-center">Veno Wallet</ParagraphText>
            <div style={{ minHeight: "50px" }}>
                {userWallet && userWallet.balance && <div className="my-2 border-bottom border-white">
                    <ParagraphText className="font-28px text-white text-center">{'$ ' + userWallet.balance}</ParagraphText>
                </div>}
            </div>
            <div className="border border-white rounded font-12px lato-regular text-white px-2 py-1 text-center">
                Add funds to your Veno Tv Wallet
            </div>
    </div>
}

const AllCards: React.FunctionComponent<{ userCards: PAYMENT_CARD[], defaultCard: number, onAddCard: (a: boolean)=>void }> 
    = ({ userCards, defaultCard, onAddCard }) => {
    return <div className="mt-3"
        style={{ borderRadius: "13px" }}>
            <ParagraphText className="font-11px text-darkGrey lato-semibold">Your Cards</ParagraphText>
            <div style={{ height: "80px", overflowY: "scroll" }}>
                {userCards && userCards.length > 0 && userCards.map((card, i) => {
                    return <div className={"d-flex align-items-center mx-2 my-1 p-2 rounded border " + (card.id === defaultCard ? 'border-primary' : 'border-darkGrey')}>
                        <img height="20" width="30" src={card.cardType} />
                        <div className="text-primary font-10px ml-2">{ card.cardTitle + ' Card ending in ' + card.cardNumber}</div>
                    </div>
                })}
            </div>
            <div className="d-flex justify-content-center">
                <div style={{ width: "200px" }}>
                    <PrimaryButton 
                        type="submit"
                        name="password-reset"
                        borderRadius="6px" 
                        className="mt-2 w-100"
                        isActive={true}
                        onClick={(e)=>{ setTimeout(() => { onAddCard(true)}) }}>
                        Add Card
                    </PrimaryButton>
                </div>
            </div>
    </div>
}

export const PaymentSettingsModal: React.RefForwardingComponent<HTMLDivElement, IPaymentSettingsModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user, onAddCard } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { paymentSettings } = paymentState;
    const { userSettings, userWallet, userCard } = paymentSettings;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [paymentModeInputChecked, setPaymentModeInputChecked] = React.useState(true);

    useEffect(() => {
        (async () => {
            await dispatch(PaymentActions.GetPaymentSettings({ userId: user.id }));
            setLoading(false);
        })()
    }, [user]);

    return isShowing ? ReactDOM.createPortal(
                <Modal border={theme.colors.primary} borderRadius="18px"
                    width="initial">
                    <div className="w-100 h-100 d-flex flex-column" ref={modalRef}>
                        <div className="border-bottom" style={{ margin: "0px -2rem", padding: "10px 2rem 20px" }}>
                                <div className="lato-semibold font-13px text-darkGrey text-underline px-3">Payment through</div>
                                <div className={"d-flex align-items-center my-2 " + (!userSettings || !userSettings.paymentMode ? "disable-click" : "")}>
                                    <span className={"font-15px lato-semibold " + (!paymentModeInputChecked ? "text-inputText" : "text-primary")}>Card</span>
                                    <label className="switch mx-2">
                                        <input checked={paymentModeInputChecked} type="checkbox" name="paymentModeInput" 
                                            onChange={() => setPaymentModeInputChecked(!paymentModeInputChecked)} />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className={"font-15px lato-semibold " + (paymentModeInputChecked ? "text-inputText" : "text-primary")}>Veno Wallet</span>
                                </div>
                                <VenoWallet userWallet={userWallet} />
                            </div>
                            <AllCards 
                                onAddCard={onAddCard} 
                                userCards={userCard} 
                                defaultCard={userSettings && userSettings.defaultCard ? userSettings.defaultCard : null} />
                    </div>
                </Modal>, document.body
        ) : null;
});
