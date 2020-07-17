import React, { RefObject, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, RadioInput, PrimaryButton, TransparentButton } from "@Components";
import { FeedsActions } from "@Actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FEED, USER_SESSION } from '@Interfaces';

declare namespace IReportFeedModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        feed: FEED;
        toggle: ()=>void;
        user: USER_SESSION;
    }
}

export const ReportFeedModal: React.RefForwardingComponent<HTMLDivElement, IReportFeedModal.IProps> = ((props) => {
    const { isShowing, modalRef, feed, toggle, user } = props;
    const [loading, setLoading] = useState(false);
    const [reportSuccess, setReportSuccess] = useState(false);

    async function handleSubmit(data: any) {
        setLoading(true);
        const params = {
            contentId: feed.id,
            reason: data["report-modal"],
            userId: user.id
        };
        await FeedsActions.ReportFeed(params)().then((resp) => {
            setLoading(false);
            if (resp.status) setReportSuccess(true);
        });
    }

    useEffect(() => {
        setReportSuccess(false);
    }, [isShowing]);

    return isShowing ? ReactDOM.createPortal(
            <Modal border={theme.colors.primary} borderRadius="18px">
                <div className="w-100 h-100 pb-5" ref={modalRef}>
                    {!reportSuccess && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex align-items-center justify-content-start w-100">
                            <FontAwesomeIcon icon={faExclamationTriangle} color="#F57B52" size="lg" />
                            <ParagraphText className="text-primary font-25px text-center ml-2">
                                Report Post
                            </ParagraphText>
                        </div>
                        
                        <FormComponent 
                            onSubmit={handleSubmit} 
                            defaultValues={{}} 
                            submitActive={true}>
                            

                            <RadioInput 
                                type="radio"
                                value="1" 
                                labelText="This content is offensive or violates 'Veno TV' terms of service."
                                name="report-modal" 
                                wrapperClass="mt-3"
                                validationRules={{ required: {value: true, message: "Report Reason is required" } }}
                                />
                            <RadioInput 
                                type="radio"
                                value="2" 
                                labelText="This content contains stolen material (DMCA)."
                                name="report-modal" 
                                wrapperClass="mt-3"
                                validationRules={{ required: {value: true, message: "Report Reason is required" } }}
                                />
                            <RadioInput 
                                type="radio"
                                value="3" 
                                labelText="This content is spam."
                                name="report-modal" 
                                wrapperClass="mt-3"
                                validationRules={{ required: {value: true, message: "Report Reason is required" } }}
                                />
                            <RadioInput 
                                type="radio"
                                value="4" 
                                labelText="Report Abuse."
                                name="report-modal" 
                                wrapperClass="mt-3"
                                validationRules={{ required: {value: true, message: "Report Reason is required" } }}
                                />
                            <div className="d-flex align-items-center justify-content-end">
                                <TransparentButton 
                                    borderRadius="10px" 
                                    className="mt-2 mr-2"
                                    onClick={toggle}>
                                        Cancel
                                </TransparentButton>

                                <PrimaryButton 
                                    type="submit"
                                    name="password-reset"
                                    borderRadius="10px" 
                                    className="mt-2"
                                    isActive={true}
                                    showLoader={loading}>
                                    Report
                                </PrimaryButton>
                            </div>
                        </FormComponent>
                    </div>}
                    {reportSuccess && <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex align-items-center justify-content-start w-100">
                            <ParagraphText className="text-primary font-17px gibson-semibold">
                                Message
                            </ParagraphText>
                        </div>
                        <ParagraphText className="text-primary font-14px w-100">
                            Report was sent successfully.
                        </ParagraphText>
                        <div className="d-flex align-items-center justify-content-end w-100 mt-3">
                                <TransparentButton 
                                    borderRadius="10px" 
                                    className="mt-2 mr-2"
                                    onClick={toggle}>
                                        Cancel
                                </TransparentButton>
                        </div>
                    </div>}
                </div>
            </Modal>, document.body
    ) : null;
});
