import React, { RefObject, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme";
import {
    ParagraphText,
    FormComponent,
    LabelInput,
    PrimaryButton,
    TransparentButton,
} from "@Components";
import { LoginActions, SettingsActions } from "@Actions";
import { ActionConsts } from "@Definitions";
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";
// import ReCAPTCHA from "react-google-recaptcha";

declare namespace IDeleteAccountModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        user: USER_SESSION;
        toggle: () => void;
    }
}

export const DeleteCardModal: React.ForwardRefRenderFunction<
    HTMLDivElement,
    IDeleteAccountModal.IProps
> = props => {
    const { isShowing, modalRef, user, toggle } = props;
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const deleteAccount = (e: any) => {
        console.log("Delete: ", e.target);
        if (verificationCode == user.username) {
            const params = { userId: user.id, authtoken: user.token };
            dispatch(SettingsActions.DeleteAccount(params));
            toggle();
        }
    };

    const closeModal = (e: any) => {
        if (e.target.name === "cancel") {
            toggle();
        }
    };

    // const handleCaptchaChange = (token: string | null) => {
    //     if (!token) {
    //         dispatch({
    //             type: ActionConsts.Login.SetLoginError,
    //             payload: { errors: "Captcha expired", session: {} },
    //         });
    //     } else {
    //         setToken(token);
    //     }
    // };

    const handleCodeInputChange = (e: any) => {
        setVerificationCode(e.target.value);
    }

    return isShowing
        ? ReactDOM.createPortal(
            <Modal border={theme.colors.primary} borderRadius="18px">
                <div className="w-100 h-100" ref={modalRef}>
                    {(
                        <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                            <ParagraphText className="text-primary font-25px text-center">
                                Delete Account
                              </ParagraphText>
                            <ParagraphText className="text-primary font-10px text-center mb-3">
                                Enter your username for verification
                              </ParagraphText>

                            <div className="d-flex flex-column w-100">

                                <div className="d-flex flex-row">
                                    <div className="captca-properties text-center px-1 text-primary">
                                        {/* <div
                                                  className="captcha-container"
                                                  style={{ height: "78px" }}
                                              >
                                                  <ReCAPTCHA
                                                      size="normal"
                                                      sitekey="6LcPdqsZAAAAADygw6uZ0kPMd-OW8F55aPEtq5FK"
                                                      onChange={
                                                          handleCaptchaChange
                                                      }
                                                  />
                                              </div> */}
                                        {user.username}
                                    </div>
                                    <div className="d-flex pl-2">
                                        <input
                                            onChange={handleCodeInputChange}
                                            type="text"
                                            className="captca-field"
                                        />
                                    </div>
                                </div>
                                <ParagraphText className="delete-account-btn font-10px text-center mt-4 mb-3">
                                    This would permanently delete your data after deactivation process!
                                </ParagraphText>
                                <div className="d-flex d-row justify-content-between">
                                    <TransparentButton
                                        onClick={(e: any) => closeModal(e)}
                                        name="cancel"
                                        className="font-9px"
                                    >
                                        Cancel
                                      </TransparentButton>
                                    <PrimaryButton
                                        onClick={deleteAccount}
                                        name="delete"
                                        className="font-9px bg-primary-gradient"
                                        isActive={true} // TODO: CHECK THE VERIFICATION CODE INPUT 
                                    >
                                        Confirm
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>,
            document.body
        )
        : null;
};
