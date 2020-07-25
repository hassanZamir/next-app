import React, { RefObject, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, LabelInput, PrimaryButton } from "@Components";
import { LoginActions } from "@Actions";
import { IStore } from "@Redux/IStore";

declare namespace IResetPasswordModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
    }
}

export const ResetPasswordModal: React.RefForwardingComponent<HTMLDivElement, IResetPasswordModal.IProps> = ((props) => {
    const { isShowing, modalRef } = props;
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const loginState = useSelector((state: IStore) => state.loginError);
    const { sendResetPasswordEmailStatus } = loginState;
    const dispatch = useDispatch();

    async function handleSubmit(data: any) {
        const params = {
            email: data.email,
        }
        setLoading(true);
        setUserEmail(data.email);
        await dispatch(LoginActions.SendResetPasswordEmail(params));
        setLoading(false);
    }

    function onModalClose(e: any) {
        if (modalRef!.current && !modalRef!.current.contains(e.target)) {
            debugger;
            dispatch(LoginActions.onCloseResetPasswordModal());
        }
    }

    useEffect(() => {
        document.addEventListener("click", onModalClose);
    
        return () => {
          document.removeEventListener("click", onModalClose);
        };
    });

    return isShowing ? ReactDOM.createPortal(
            <Modal border={theme.colors.primary} borderRadius="18px">
                <div className="w-100 h-100 pb-5" ref={modalRef}>
                    {(sendResetPasswordEmailStatus === '' || sendResetPasswordEmailStatus === 'error') && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Reset Password</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            Enter the email associated with your account to recieve link to reset your password.
                        </ParagraphText>
                        
                        <div className="d-flex flex-column w-100">
                            <FormComponent 
                                onSubmit={handleSubmit} 
                                defaultValues={{}} 
                                submitActive={!loading}>

                                <LabelInput 
                                    type="email"
                                    labelText="Email" 
                                    name="email" 
                                    wrapperClass="mt-3"
                                    validationRules={{ 
                                        required: "Email is required"
                                    }}
                                />
                                <PrimaryButton 
                                    type="submit"
                                    name="password-reset"
                                    borderRadius="6px" 
                                    className="mt-2 w-100"
                                    showLoader={loading}>
                                    Send Email
                                </PrimaryButton>
                            </FormComponent>
                            {sendResetPasswordEmailStatus === 'error' && <ParagraphText className="text-danger font-12px text-center">
                                Error occured sending email. Please try again.
                            </ParagraphText>}
                        </div>
                    </div>}
                    {sendResetPasswordEmailStatus === 'success' && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Check your email</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            {"We have sent you an email at " + userEmail + ". Click the link in the email to reset your password."}
                        </ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            If you don't see the email, check your junk or spam folder
                        </ParagraphText>
                    </div>}
                </div>
            </Modal>, document.body
    ) : null;
});
