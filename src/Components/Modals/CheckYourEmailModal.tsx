import React, { RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText } from "@Components";

declare namespace ICheckYourEmailModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        email: string;
        toggle: ()=>void;
    }
}

export const CheckYourEmailModal: React.RefForwardingComponent<HTMLDivElement, ICheckYourEmailModal.IProps> = ((props) => {
    const { isShowing, modalRef, email, toggle } = props;

    return isShowing ? ReactDOM.createPortal(
            <Modal border={theme.colors.primary} borderRadius="18px">
                <div className="w-100 h-100 pb-5" ref={modalRef}>
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Check Your Email</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            {'We have sent an email at' + email + '. Click the link to verify your account.'} 
                        </ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            If you don't see the email, check your junk or spam folder.
                        </ParagraphText>
                    </div>
                </div>
            </Modal>, document.body
    ) : null;
});
