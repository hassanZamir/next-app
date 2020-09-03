import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, LabelInput, MultiLabelInput ,PrimaryButton, SelectInput } from "@Components";
import DobConst from "../../../pages/signup/dob-constants.json";
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
            expMonth: DobConst.months.indexOf(data.expiry.month) + 2,
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
                        <div className="modal-header" style={{ position: 'absolute', top: '-38px', right: '15px' }}>
                            <button type="button" className="font-28px text-white modal-close-button" onClick={()=>{ toggle() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ParagraphText className="font-18px lato-bold text-primary text-center my-4">Enter your card details</ParagraphText>
                        <div style={{ width: "275px" }}>
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
                                        required: "Card Number is required",
                                        validate: (value: string) => {
                                            const regex = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
                                            return regex.test(value) ? true : "Should be 16 digit valid credit/debit card number";
                                        }
                                    }}
                                />
                                
                                <div className="d-flex justify-content-between">
                                    <SelectInput
                                        type={["number", "number"]}
                                        labelText="Expiry" 
                                        name={["expiry.month", "expiry.year"]}
                                        options={[DobConst.months, DobConst.year]} 
                                        wrapperClass="mt-3"
                                        validationRules={[{ 
                                            required: "Month is required",
                                            validate: (value: string) => {
                                                return value !== "MM" ? true : "Please select Month of Birth"
                                            }
                                        }, { 
                                            required: "Year is required",
                                            validate: (value: string) => {
                                                return value !== "YYYY" ? true : "Please select Year of Birth"
                                            } 
                                        }]}
                                    />
                                    {/* <MultiLabelInput 
                                        type={["text", "text"]}
                                        labelText="Expiry" 
                                        name={["expiry.month", "expiry.year"]} 
                                        wrapperClass="mt-2"
                                        placeholder={["MM", "YYYY"]}
                                        validationRules={[{ 
                                            required: "Expiry is required",
                                            validate: (value: string) => {
                                                const regex = new RegExp("^[0-9]{2}$");
                                                return regex.test(value) ? true : "MM be a 2 digit number";
                                            }
                                        }, { 
                                            required: "Expiry is required",
                                            validate: (value: string) => {
                                                const regex = new RegExp("^[0-9]{4}$");
                                                return regex.test(value) ? true : "YYYY be a 4 digit number";
                                            }
                                        }]}
                                    /> */}
                                    <LabelInput 
                                        type="text"
                                        labelText="CVC" 
                                        name="cvc" 
                                        wrapperClass="mt-3 ml-2"
                                        validationRules={{ 
                                            required: "CVC is required",
                                            validate: (value: string) => {
                                                const regex = new RegExp("^[0-9]{3}$");
                                                return regex.test(value) ? true : "Should be a 3 digit number";
                                            }
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
