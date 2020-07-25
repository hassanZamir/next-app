import React, { RefObject, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from 'react-dom';

import { ParagraphText, FormComponent, LabelInput, PrimaryButton } from "@Components";
import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";

declare namespace IChangePasswordModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        token: string;
    }
}

export const ChangePasswordModal: React.RefForwardingComponent<HTMLDivElement, IChangePasswordModal.IProps> = ((props) => {
    const { isShowing, modalRef, token } = props;
    const loginState = useSelector((state: IStore) => state.loginError);
    const { changePasswordStatus } = loginState;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handleSubmit(data: any) {
        const params = {
            password: data.password,
            token: token
        }
        setLoading(true);
        await dispatch(LoginActions.ChangePassword(params));
        setLoading(false);
    }

    return isShowing ? ReactDOM.createPortal(
        <Modal border={theme.colors.primary} borderRadius="18px">
                <div className="w-100 h-100 pb-5" ref={modalRef}>
                    {(changePasswordStatus === '' || changePasswordStatus === 'error') && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Change your password</ParagraphText>
                        
                        <div className="d-flex flex-column w-100 mt-3">
                            <FormComponent 
                                onSubmit={handleSubmit} 
                                defaultValues={{}} 
                                submitActive={!loading}>

                                <LabelInput 
                                    type="password"
                                    labelText="New Password" 
                                    name="password" 
                                    wrapperClass="mt-3"
                                    validationRules={{ required: {value: true, message: "Password is required" } }}
                                />
                                <LabelInput 
                                    type="password"
                                    labelText="Confirm Password" 
                                    name="reTypePassword"
                                    wrapperClass="mt-1" 
                                    validationRules={{ 
                                        required: "Re Type password is required"
                                    }}
                                />
                                <PrimaryButton 
                                    type="submit"
                                    name="change-reset"
                                    borderRadius="6px" 
                                    className="mt-2 w-100"
                                    showLoader={loading}>
                                    Submit
                                </PrimaryButton>
                            </FormComponent>
                            {changePasswordStatus === 'error' && <ParagraphText className="text-danger font-12px text-center">
                                Error occured reseting password. Please try again.
                            </ParagraphText>}
                        </div>
                    </div>}
                    {changePasswordStatus === 'success' && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <ParagraphText className="text-primary font-25px text-center">Password Updated</ParagraphText>
                        <ParagraphText className="text-grey100 font-12px text-center mt-3">
                            Your password has been updated successfully!
                        </ParagraphText>
                    </div>}
                </div>
            </Modal>, document.body
    ) : null;
});
