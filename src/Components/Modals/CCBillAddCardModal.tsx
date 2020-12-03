import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, LabelInput, MultiLabelInput, PrimaryButton, SelectInput } from "@Components";
import DobConst from "../../../pages/signup/dob-constants.json";
import { ICCBillAddCardModal, USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";
import { FollowingFeeDecimalFormatter, PaymentService } from '@Services';
import { ICCBillConstants } from '@Constants';

export const CCBillAddCardModal: React.ForwardRefRenderFunction<HTMLDivElement, ICCBillAddCardModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user, creatorProfile } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { addCardError } = paymentState;
    const dispatch = useDispatch();
    const [modalText, setModalText] = useState("Redirecting to payment gateway...");

    useEffect(() => {
        constructPostParams();
    })

    async function constructPostParams() {
        const currencyCode = ICCBillConstants.DefaultCurrencyCode;
        const followingPeriod = ICCBillConstants.DefaultFollowingPeriod; // days
        const followingFee = FollowingFeeDecimalFormatter(creatorProfile.followingFee < ICCBillConstants.MinimumLimit ? ICCBillConstants.MinimumLimit : creatorProfile.followingFee);
        const rebills = ICCBillConstants.InfinitRebills;

        const response = await PaymentService.FormDigest({
            type: ICCBillConstants.RecurringPaymentType,
            followingFee: followingFee,
            followingPeriod: followingPeriod,
            currencyCode: currencyCode,
            recurringPrice: followingFee,
            recurringPeriod: followingPeriod,
            rebills: rebills,
        });
        console.log(response);
        if (response.status == false || !response.data?.formdigest) {
            // setModalText("Something went wrong. Please try again later.");
            // TODO: close the popup
            return;
        }
        const appData = `?authtokenHash=${"dummystring"}&userid=${user.id}&creator=${creatorProfile.userName.trim()}`;
        const accountData = `&clientSubacc=0000`;
        const subscriptionData = `&initialPrice=${followingFee}&initialPeriod=${followingPeriod}`;
        const recurringData = `&recurringPrice=${followingFee}&recurringPeriod=${followingPeriod}&numRebills=${rebills}`;
        const paramString = `${appData}${accountData}${subscriptionData}${recurringData}&currencyCode=${currencyCode}&formDigest=${response.data.formdigest}`;

        const dynamicPricingFlexForm = ICCBillConstants.DynamicPricingFlexForm;
        const ccbillSubscribeUrl = `https://api.ccbill.com/wap-frontflex/flexforms/${dynamicPricingFlexForm}${paramString}`

        setTimeout(() => {
            window.location.href = ccbillSubscribeUrl;
        }, 1000);
    }


    return isShowing ? ReactDOM.createPortal(
        <Modal border={theme.colors.primary} borderRadius="18px" width="initial">
            <div className="w-100 d-flex flex-column" ref={modalRef}>
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                    {modalText}
                </ParagraphText>
            </div>
        </Modal>, document.body
    ) : null;
});
