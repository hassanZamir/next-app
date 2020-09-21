import React, { RefObject, useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from "@Components/Basic";
import { ParagraphText, ThemedInputWithLabel, PrimaryButton } from "@Components";

declare namespace IPriceTagModal {
    export interface IProps {
        isShowing: boolean;
        onSubmit: (amount: string)=>void;
        modalRef?: RefObject<HTMLDivElement>;
    }
}

export const PriceTagModal: React.RefForwardingComponent<HTMLDivElement, IPriceTagModal.IProps> 
    = ((props) => {
    
    const { isShowing, onSubmit, modalRef } = props;
    const [inputs, setInputs] = useState({
        amount: '',
        message: ''
    });
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const { amount } = inputs;

    return isShowing ? ReactDOM.createPortal(
            <Modal>
                <div className="w-100 h-100" ref={modalRef}>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-center">
                                <ParagraphText className="text-primary font-20px seoge-ui-bold">
                                    Message Price Tag
                                </ParagraphText>
                            </div>
                            <div className="position-relative d-flex align-items-center justify-content-center py-4 px-5 text-primary font-40px">
                                <div className="background-circle-blue d-flex align-items-center justify-content-center">
                                    <div className="background-circle-primary"></div>
                                </div>
                                <ThemedInputWithLabel 
                                    labelProps={{labelText: "$", labelClass: "lato-bold position-absolute bottom-0" }} 
                                    onChange={handleChange} 
                                    placeholder="0.00"
                                    name="amount"
                                    style={{ paddingLeft: "25px" }}
                                    type="number" 
                                    fontFamily="Lato Bold" />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <PrimaryButton borderRadius="6px" 
                                isActive={amount ? true : false} 
                                className="mt-2" 
                                onClick={() => amount && onSubmit(amount)}>
                                SET PRICE TAG
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>, document.body
    ) : null;
});
