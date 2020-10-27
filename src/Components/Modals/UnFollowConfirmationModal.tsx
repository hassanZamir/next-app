import { Modal } from "@Components/Basic";
import { ParagraphText } from "@Components/ParagraphText";
import { theme } from "@Definitions/Styled";
import React, { RefObject } from "react";
import ReactDOM from "react-dom";

export const UnFollowConfirmationModal: React.ForwardRefRenderFunction<
    HTMLDivElement,
    IUnFollowConfirmationModal.IProps
> = props => {
    const { isShowing, onConfirm, toggle, returnPolicyModalToggle } = props;
    return !isShowing
        ? null
        : ReactDOM.createPortal(
            <Modal
                border={theme.colors.primary}
                borderRadius="18px"
                width="330px"
            >
                <ParagraphText className="text-primary font-25px text-center">
                    Unfollow
                </ParagraphText>
                <React.Fragment>
                    <div className="text-grey100 font-12px text-center my-2">
                    Are you sure you want to unfollow?
                    </div>
                    <div className="my-3 px-4 d-flex justify-content-between">
                    <div
                        onClick={() => {
                                toggle();
                            }}
                        className="cursor-pointer px-3 py-1 bg-primary text-white rounded d-flex align-items-center justify-content-center"
                    >
                            Cancel
                    </div>
                    <div
                        onClick={() => {
                                onConfirm();
                                toggle();
                            }}
                        className="cursor-pointer px-3 px-1 bg-primary text-white rounded d-flex align-items-center justify-content-center"
                    >
                            Yes
                    </div>
                    </div>
                    <div className="text-grey100 font-12px text-center my-2"
                    onClick={() => {
                        returnPolicyModalToggle();
                    }}>
                    View our
                        <span className="text-primary cursor-pointer">
                            {" "}
                            Return Policy
                        </span>
                    </div>
                </React.Fragment>
            </Modal>,
            document.body
          );
};

/**
 * TODO: MOVE THIS TO INTERFACES
 */
declare namespace IUnFollowConfirmationModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        onConfirm: () => void;
        returnPolicyModalToggle: () => void;
    }
}
