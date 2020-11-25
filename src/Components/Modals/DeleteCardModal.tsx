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
} from "@Components";
import { LoginActions, SettingsActions } from "@Actions";
import { ActionConsts } from "@Definitions";
import { IStore } from "@Redux/IStore";
// import ReCAPTCHA from "react-google-recaptcha";

declare namespace IResetPasswordModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        userId: number;
        toggle: () => void;
    }
}

export const DeleteCardModal: React.RefForwardingComponent<
    HTMLDivElement,
    IResetPasswordModal.IProps
> = props => {
    const { isShowing, modalRef, userId, toggle } = props;
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    // const [recaptchaToken, setToken] = useState("");
    const loginState = useSelector((state: IStore) => state.loginError);
    const { sendResetPasswordEmailStatus } = loginState;
    const dispatch = useDispatch();

    async function handleSubmit(data: any) {
        const params = {
            email: data.email,
        };
        setLoading(true);
        setUserEmail(data.email);
        await dispatch(LoginActions.SendResetPasswordEmail(params));
        setLoading(false);
    }

    function onModalClose(e: any) {
        if (modalRef!.current && !modalRef!.current.contains(e.target)) {
            dispatch(LoginActions.onCloseResetPasswordModal());
        }
    }

    useEffect(() => {
        document.addEventListener("click", onModalClose);

        return () => {
            document.removeEventListener("click", onModalClose);
        };
    });

    const deleteAccount = (e: any) => {
        if (e.target.name === "delete") {
            const params = { userId };
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

    return isShowing
        ? ReactDOM.createPortal(
              <Modal border={theme.colors.primary} borderRadius="18px">
                  <div className="w-100 h-100" ref={modalRef}>
                      {(sendResetPasswordEmailStatus === "" ||
                          sendResetPasswordEmailStatus === "error") && (
                          <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                              <ParagraphText className="text-primary font-25px text-center">
                                  Delete Account
                              </ParagraphText>
                              <ParagraphText className="text-primary font-10px text-center mb-3">
                                  Enter the code for verification
                              </ParagraphText>

                              <div className="d-flex flex-column w-100">
                                  <FormComponent
                                      onSubmit={handleSubmit}
                                      defaultValues={{}}
                                      submitActive={!loading}
                                  >
                                      <div className="d-flex">
                                          <p className="captca-ui captca-properties text-center mr-2 alignleft text-primary">
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
                                              3 4 F G 5 6
                                          </p>
                                          <input
                                              type="text"
                                              className="alignright captca-field"
                                          />
                                      </div>

                                      {/* <LabelInput
                                          type="email"
                                          labelText="Email"
                                          name="email"
                                          wrapperClass="mt-3"
                                          validationRules={{
                                              required: "Email is required",
                                          }}
                                      /> */}
                                      {/* <PrimaryButton
                                          type="submit"
                                          name="password-reset"
                                          borderRadius="6px"
                                          className="mt-2 w-100"
                                          showLoader={loading}
                                      >
                                          Send Email
                                      </PrimaryButton> */}
                                  </FormComponent>
                                  <ParagraphText className="delete-account-btn font-10px text-left mt-4 mb-3">
                                      This would permanently delete your
                                      account!
                                  </ParagraphText>
                                  <div className="ml-5 pl-4">
                                      <button
                                          onClick={(e: any) => closeModal(e)}
                                          name="cancel"
                                          className="text-primary font-9px cancel-btn-ui cancel-btn-ui-properties"
                                      >
                                          Cancel
                                      </button>
                                      <button
                                          onClick={(e: any) => deleteAccount(e)}
                                          name="delete"
                                          className="text-primary font-9px cancel-btn-ui cancel-btn-ui-properties"
                                      >
                                          Delete
                                      </button>
                                  </div>
                                  {sendResetPasswordEmailStatus === "error" && (
                                      <ParagraphText className="text-danger font-12px text-center">
                                          Error occured sending email. Please
                                          try again.
                                      </ParagraphText>
                                  )}
                              </div>
                          </div>
                      )}
                      {sendResetPasswordEmailStatus === "success" && (
                          <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                              <ParagraphText className="text-primary font-25px text-center">
                                  Check your email
                              </ParagraphText>
                              <ParagraphText className="text-grey100 font-12px text-center mt-3">
                                  {"We have sent you an email at " +
                                      userEmail +
                                      ". Click the link in the email to reset your password."}
                              </ParagraphText>
                              <ParagraphText className="text-grey100 font-12px text-center mt-3">
                                  If you don't see the email, check your junk or
                                  spam folder
                              </ParagraphText>
                          </div>
                      )}
                  </div>
              </Modal>,
              document.body
          )
        : null;
};
