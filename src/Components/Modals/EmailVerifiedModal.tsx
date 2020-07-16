import React, { RefObject, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText } from "@Components";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";

declare namespace IEmailVerifiedModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: ()=>void;
        token: string;
    }
}

export const EmailVerifiedModal: React.RefForwardingComponent<HTMLDivElement, IEmailVerifiedModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, token } = props;
    const accountVerifyState = useSelector((state: IStore) => state.accountVerify);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoginActions.AccountVerify({token: token}));    
    }, []);

    const { message, loading } = accountVerifyState;
    return isShowing ? ReactDOM.createPortal(
            <Modal border={theme.colors.primary} borderRadius="18px">
                {loading && <div style={{ height: "200px" }} className="w-100 d-flex align-items-center justify-content-center" ref={modalRef}>
                    <FontAwesomeIcon icon={faSpinner} color="#F57B54" className="fa-spin" size="3x" />
                </div>}
                {!loading && message.type === 'success' && <div className="w-100 h-100 pb-5" ref={modalRef}>
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Email Verified</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            Your email has been verified, kindly enter your credentials to login to your account
                        </ParagraphText>
                    </div>
                </div>}
                {!loading && message.type !== 'success' && <div className="w-100 h-100 pb-5" ref={modalRef}>
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Email Verification</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3 text-danger">
                            { message.text }
                        </ParagraphText>
                    </div>
                </div>}
            </Modal>, document.body
    ) : null;
});
