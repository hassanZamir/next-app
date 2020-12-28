import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { FormComponent, LabelInput, ParagraphText, PrimaryButton, SelectInput } from "@Components";
import {DOB, Locations} from "@Constants";
import { PaymentActions } from "@Actions";
import { USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";

declare namespace IAddCardModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        user: USER_SESSION;
    }
}

export const AddCardModal: React.ForwardRefRenderFunction<HTMLDivElement, IAddCardModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user } = props;
    const paymentState = useSelector((state: IStore) => state.payment);
    const { addCardError } = paymentState;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20),(val, index) => {
        var y = index + year;
        return y.toString();
    });

    function onPaymentSuccess() {
        toggle();
    }

    async function handleSubmit(data: any) {
        // console.log("Add card form: ",data);
        const params = {
            cardTitle: data.name,
            cardNumber: data.cardNumber,
            expMonth: DOB.months.indexOf(data.expiry.month),
            expYear: data.expiry.year,
            cvc: data.cvc,

            poboxNumber: data.poboxNumber,
            state: data.state,
            city: data.city,
            country: data.country,

            fname: data.fname,
            lname: data.lname,

            // phoneNumber: data.phoneNumber,
            address1: data.address1,
            address2: data.address2,

            userId: user.id,
            authtoken: user.token,
            email: user.email,
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
            width="100%" style={{ minWidth: "325px", maxWidth: "325px", width:"100%" }}>
            <div className="w-100 h-100 d-flex flex-column" ref={modalRef}>
                {/* <ParagraphText className="font-18px lato-bold text-primary text-center my-4">Redirecting to payment gateway ...</ParagraphText> */}
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">Enter your card details</ParagraphText>
                <div>
                    <FormComponent 
                        onSubmit={handleSubmit} 
                        defaultValues={{}} 
                        submitActive={!loading}>
                        {/* <LabelInput 
                                type="text"
                                labelText="Name" 
                                name="name" 
                                wrapperClass="mt-3"
                                validationRules={{ 
                                    required: "Name is required"
                                }}
                            /> */}
                        <div className="d-flex flex-row">
                            <LabelInput
                            type="text"
                            labelText="First Name" 
                            name="fname" 
                            wrapperClass="mt-3 mr-1"
                            validationRules={{ 
                                required: "First Name is required"
                            }}
                            />
                            <LabelInput
                                type="text"
                                labelText="Last Name" 
                                name="lname" 
                                wrapperClass="mt-3 ml-1"
                                validationRules={{ 
                                    required: "Last Name is required"
                                }}
                            />
                        </div>
                        
                        <LabelInput 
                            type="text"
                            labelText="Card Number" 
                            name="cardNumber" 
                            wrapperClass="mt-2"
                            validationRules={{ 
                                required: "Card Number is required",
                                validate: (value: string) => {
                                    // const regex = new RegExp("^[0-9]{16}(?:[0-9]{3})?$");
                                    // reference: http://www.regular-expressions.info/creditcard.html
                                    const regex = new RegExp(`^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$`);
                                    return regex.test(value) ? true : "Please enter a valid card number";
                                }
                            }}
                        />
                        
                                
                        <div className="d-flex flex-row">
                                <SelectInput
                                    type={["number", "number"]}
                                    labelText="Expiry" 
                                    name={["expiry.month", "expiry.year"]}
                                    options={[DOB.months, years]} 
                                    wrapperClass="mt-3"
                                    validationRules={[{ 
                                        required: "Month is required",
                                        validate: (value: string) => {
                                            return value !== "Month" ? true : "Please select Month of Birth"
                                        }
                                    }, { 
                                        required: "Year is required",
                                        validate: (value: string) => {
                                            return value !== "Year" ? true : "Please select Year of Birth"
                                        } 
                                    }]}
                                />
                                <LabelInput 
                            type="text"
                            labelText="CVC" 
                            name="cvc" 
                            wrapperClass="mt-3 ml-2 col-4 px-0"
                            validationRules={{ 
                                required: "CVC is required",
                                validate: (value: string) => {
                                    const regex = new RegExp("^[0-9]{4}|[0-9]{3}$");
                                    return regex.test(value) ? true : "Should be a 3 or 4 digit number";
                                }
                            }}
                        />
                        </div>
                        <LabelInput
                                type="text"
                                labelText="Address 1"
                                name="address1"
                                wrapperClass="mt-3 mr-1"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Address is required",
                                    },
                                }}
                            />
                        <LabelInput
                            type="text"
                            labelText="Address 2"
                            name="address2"
                            wrapperClass="mt-3 mr-1"
                            validationRules={{
                                required: {
                                    value: false,
                                    message: "Address is required",
                                },
                            }}
                        />
                        <div className="d-flex flex-row"> 
                            <LabelInput
                                type="text"
                                labelText="State"
                                name="state"
                                wrapperClass="mt-3 mr-1"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "State is required",
                                    },
                                }}
                            />

                            <LabelInput
                                type="text"
                                labelText="City"
                                name="city"
                                wrapperClass="mt-3 ml-1"
                                validationRules={{
                                    required: "City is required",
                                    validate: (value: string) => {
                                        var regex = /^[a-zA-Z ]+$/;
                                        if (!regex.test(value))
                                            return "City must be a string";
                                    },
                                }}
                        />
                        </div>
                        <div className="d-flex flex-row"> 
                        <SelectInput
                            type={["text"]}
                            labelText="Country"
                            name={["country"]}
                            options={[Locations.countries]}
                            wrapperClass="mt-3"
                            validationRules={[
                                { required: "Country selection is required." },
                            ]}
                        />
                        <LabelInput
                                type="text"
                                labelText="POBox/ZipCode"
                                name="poboxNumber"
                                wrapperClass="mt-3 ml-1"
                                validationRules={{
                                    required: "POBox/Zipcode is required",
                                    validate: (value: string) => {
                                        var regex = /^[0-9]+$/;
                                        if (!regex.test(value))
                                            return "POBox/Zipcode must be a number";
                                    },
                                }}
                        />
                        </div>
                        <PrimaryButton 
                            type="submit"
                            name="add-card"
                            borderRadius="6px" 
                            className="mt-5"
                            showLoader={loading}>
                            Add Card
                        </PrimaryButton>
                        <span className="mb-5 text-danger font-12px">{ addCardError }</span>
                    </FormComponent>
                </div>
            </div>
        </Modal>, document.body
    ) : null;
});
