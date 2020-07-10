import React, { RefObject, useState } from 'react';
import ReactDOM from 'react-dom';

import { Textarea, Modal } from "@Components/Basic";
import { CircularImage, ParagraphText, ThemedInputWithLabel, PrimaryButton } from "@Components";

import { FEED } from "@Interfaces";

declare namespace ITipSubmitModal {
    export interface IProps {
        isShowing: boolean;
        clickedFeed: any;
        onSubmit: (feed: FEED, amount: string, message: string)=>void;
        modalRef?: RefObject<HTMLDivElement>;
    }
}

export const TipSubmitModal: React.RefForwardingComponent<HTMLDivElement, ITipSubmitModal.IProps> = ((props, ref) => {
    const { clickedFeed, isShowing, onSubmit, modalRef } = props;
    if (!clickedFeed) return null;
    
    const { profileImageUrl, username } = clickedFeed;
    const [inputs, setInputs] = useState({
        amount: '',
        message: ''
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const { amount, message } = inputs;

    return isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper">
            <Modal>
                <div className="w-100 h-100" ref={modalRef}>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-column position-relative">
                            <div className="background-circle-blue d-flex align-items-center justify-content-center">
                                <div className="background-circle-primary"></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <div style={{ width: "72px", height: "72px", marginRight: "10px" }}>
                                    <CircularImage src={profileImageUrl} height="100%" width="auto" />
                                </div>
                                <ParagraphText className="text-primary font-20px seoge-ui-bold">{username}</ParagraphText>
                            </div>
                            <div className="d-flex align-items-center justify-content-center p-5 text-primary font-40px">
                                <ThemedInputWithLabel 
                                    labelProps={{labelText: "$", labelClass: "position-absolute bottom-0" }} 
                                    onChange={handleChange} 
                                    name="amount"
                                    style={{ paddingLeft: "20px" }}
                                    type="number" />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <ParagraphText className="font-8px text-darkGrey">Message (optional)</ParagraphText>
                            <Textarea name="message" rows={1} columns={20} className="border-primary" onChange={handleChange}/>
                            <PrimaryButton borderRadius="6px" 
                                isActive={amount ? true : false} 
                                className="mt-2" 
                                onClick={() => amount && onSubmit(clickedFeed, amount, message)}>
                                SEND TIP
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    </React.Fragment>, document.body
    ) : null;
});
