import React, { RefObject, useEffect } from 'react';
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom';

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText } from "@Components";
import { IStore } from "@Redux/IStore";
import { CREATOR_PROFILE } from '@Interfaces';
// import { LoginActions } from "@Actions";

declare namespace IPaymentConfirmationModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        profileUserName: string;
        onConfirm: () => void;
        paymentMode: number;
        creatorProfile: CREATOR_PROFILE
    }
}

export const PaymentConfirmationModal: React.ForwardRefRenderFunction<HTMLDivElement, IPaymentConfirmationModal.IProps> = ((props) => {
    const { isShowing, toggle, profileUserName, onConfirm, paymentMode, creatorProfile } = props;
    const persistState = useSelector((state: IStore) => state.persistState);
    const { session } = persistState;

    return isShowing ? ReactDOM.createPortal(
        <Modal border={theme.colors.primary} borderRadius="18px" width="330px">
            <ParagraphText className="text-primary font-25px text-center">Payment Confirmation</ParagraphText>
            {
                paymentMode === 1 && (
                    <React.Fragment>
                        <div className="text-grey100 font-12px text-center my-5">
                            Are you sure you want to make a payment to subscribe
                                <span className="seoge-ui-bold">{` ${profileUserName} `}</span>
                            {' '}
                                from the following card

                            </div>
                        <div className="text-grey100 lato-bold text-center">{`${session.cardTitle} ending in ${session.cardNumber}`}</div>
                        <div className="my-5 px-4 d-flex justify-content-between">
                            <div onClick={() => { onConfirm(); toggle(); }} className="cursor-pointer px-3 px-1 bg-primary text-white rounded d-flex align-items-center justify-content-center">Yes</div>
                            <div onClick={() => { toggle() }} className="cursor-pointer px-3 py-1 bg-primary text-white rounded d-flex align-items-center justify-content-center">No</div>
                        </div>
                        <div className="text-grey100 font-12px text-center my-5">
                            <p>Note:</p>
                            Your card will be charged automatically for
                                <span className="seoge-ui-bold">{` $${creatorProfile.followingFee} `}</span>
                            {' '}
                            every month unless you unsubscribe or turn off auto-renewal.
                        </div>
                    </React.Fragment>
                )
            }
            {
                paymentMode === 2 && (
                    <React.Fragment>
                        <div className="text-grey100 font-12px text-center my-5">
                            Are you sure you want to make a payment to subscribe
                                <span className="seoge-ui-bold">{` ${profileUserName} `}</span>
                            {' '}
                                from your wallet
                            </div>
                        <div className="position-relative d-flex flex-column align-items-center justify-content-center">
                            <div
                                className="position-absolute background-circle-primary"
                                style={{ height: "80px", width: "80px" }}
                            />
                            <div className="font-20px text-primary lato-bold">
                                Pay $
                                    {creatorProfile.followingFee}
                            </div>
                            <div style={{ width: "100px", height: "2px" }} className="bg-primary" />
                        </div>
                        <div className="my-5 px-4 d-flex justify-content-between">
                            <div onClick={() => { onConfirm(); toggle(); }} className="cursor-pointer px-3 px-1 bg-primary text-white rounded d-flex align-items-center justify-content-center">Yes</div>
                            <div onClick={() => { toggle() }} className="cursor-pointer px-3 py-1 bg-primary text-white rounded d-flex align-items-center justify-content-center">No</div>
                        </div>
                    </React.Fragment>
                )
            }
        </Modal>,
        document.body
    )
        : null;
});
