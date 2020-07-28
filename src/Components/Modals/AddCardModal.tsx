import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, LabelInput, MultiLabelInput ,PrimaryButton } from "@Components";
import { PaymentActions } from "@Actions";
import { USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";

declare namespace IAddCardModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: ()=>void;
        user: USER_SESSION;
    }
}

export const AddCardModal: React.RefForwardingComponent<HTMLDivElement, IAddCardModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { addCardError } = paymentState;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    function onPaymentSuccess() {
        toggle();
    }

    async function handleSubmit(data: any) {
        const params = {
            cardTitle: data.name,
            cardNumber: data.cardNumber,
            expMonth: data.expiry.month,
            expYear: data.expiry.year,
            cvc: data.expiry.cvc,
            userId: user.id
        }
        setLoading(true);
        await dispatch(PaymentActions.AddCard(params, onPaymentSuccess));
        setLoading(false);
    }

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

    return isShowing ? ReactDOM.createPortal(
                <Modal border={theme.colors.primary} borderRadius="18px"
                    width="initial">
                    <div className="w-100 h-100 d-flex flex-column" ref={modalRef}>
                        <ParagraphText className="font-18px lato-bold text-primary text-center my-4">Enter your card details</ParagraphText>
                        <div style={{ width: "250px" }}>
                            <FormComponent 
                                onSubmit={handleSubmit} 
                                defaultValues={{}} 
                                submitActive={!loading}>

                                <LabelInput 
                                    type="text"
                                    labelText="Name" 
                                    name="name" 
                                    wrapperClass="mt-3"
                                    validationRules={{ 
                                        required: "Name is required"
                                    }}
                                />

                                <LabelInput 
                                    type="text"
                                    labelText="Card Number" 
                                    name="cardNumber" 
                                    wrapperClass="mt-2"
                                    validationRules={{ 
                                        required: "Card Number is required"
                                    }}
                                />
                                
                                <div className="d-flex justify-content-between">
                                    <MultiLabelInput 
                                        type={["text", "text"]}
                                        labelText="Expiry" 
                                        name={["expiry.month", "expiry.year"]} 
                                        wrapperClass="mt-2"
                                        placeholder={["MM", "YYYY"]}
                                        validationRules={[{ 
                                            required: "Expiry is required"
                                        }, { 
                                            required: "Expiry is required"
                                        }]}
                                    />
                                    <LabelInput 
                                        type="text"
                                        labelText="CVC" 
                                        name="cvc" 
                                        wrapperClass="mt-2"
                                        validationRules={{ 
                                            required: "CVC is required"
                                        }}
                                    />  
                                </div>
                                {/* <div className="d-flex justify-content-center">
                                    <div className="d-flex flex-column" style={{ width: "145px" }}> */}
                                        <PrimaryButton 
                                            type="submit"
                                            name="add-card"
                                            borderRadius="6px" 
                                            className="mt-5"
                                            showLoader={loading}>
                                            Add Card
                                        </PrimaryButton>
                                        <span className="mb-5 text-danger font-12px">{ addCardError }</span>
                                        {/* <div className="d-flex mt-2 lato-medium font-8px">
                                            <div className="text-primary text-underline">Terms of Service</div>
                                            <div className="mx-1">and</div>
                                            <div className="text-primary text-underline">Privacy Policy</div>
                                        </div> */}
                                    {/* </div>
                                </div> */}
                            </FormComponent>
                        </div>
                    </div>
                </Modal>, document.body
        ) : null;
});
