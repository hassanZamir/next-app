import React, { RefObject, useState } from "react";
import { useSelector } from "react-redux";

import { IStore } from "@Redux/IStore";

import ReactDOM from "react-dom";

import { Textarea, Modal } from "@Components/Basic";
import {
    CircularImage,
    ParagraphText,
    ThemedInputWithLabel,
    PrimaryButton,
} from "@Components";

import { CREATOR_PROFILE, FEED } from "@Interfaces";

declare namespace INonFeedTipSubmitModal {
    export interface IProps {
        isShowing: boolean;
        clickedFeed?: FEED;
        onSubmit: (amount: string, message: string) => void;
        modalRef?: RefObject<HTMLDivElement>;
    }
}

export const NonFeedTipSubmitModal: React.ForwardRefRenderFunction<
    HTMLDivElement,
    INonFeedTipSubmitModal.IProps
> = props => {
    const { session } = useSelector((state: IStore) => state.persistState);

    const { clickedFeed, isShowing, onSubmit, modalRef } = props;

    const [inputs, setInputs] = useState({
        amount: "",
        message: "",
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const { amount, message } = inputs;

    return isShowing
        ? ReactDOM.createPortal(
            <Modal>
                <div className="w-100 h-100" ref={modalRef}>
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-column">
                            {clickedFeed && <div className="d-flex align-items-center justify-content-center">
                                <div
                                    style={{
                                        width: "72px",
                                        height: "72px",
                                        marginRight: "10px",
                                    }}
                                >
                                    <CircularImage
                                        src={[
                                            clickedFeed.profileImageUrl,
                                            "/images/profile_image_placeholder.jpg",
                                        ]}
                                        height="100%"
                                        width="75px"
                                    />
                                </div>
                                <ParagraphText className="text-primary font-20px seoge-ui-bold">
                                    {clickedFeed.username}
                                </ParagraphText>
                            </div>}
                            <div className="position-relative d-flex align-items-center justify-content-center py-4 px-5 text-primary font-40px">
                                <div className="background-circle-blue d-flex align-items-center justify-content-center">
                                    <div className="background-circle-primary"></div>
                                </div>
                                <ThemedInputWithLabel
                                    labelProps={{
                                        labelText: "$",
                                        labelClass:
                                            "lato-bold position-absolute bottom-0",
                                    }}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    name="amount"
                                    style={{ paddingLeft: "25px" }}
                                    type="number"
                                    fontFamily="Lato Bold"
                                    disabled={session.username == clickedFeed?.username ?? ""}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <ParagraphText className="font-8px text-darkGrey">
                                Message (optional)
                              </ParagraphText>
                            <Textarea
                                name="message"
                                rows={1}
                                columns={20}
                                className="border-primary"
                                onChange={handleChange}
                            />
                            <PrimaryButton
                                borderRadius="6px"
                                isActive={amount ? true : false}
                                className="mt-2"
                                onClick={() =>
                                    amount &&
                                    onSubmit(amount, message) &&
                                    setInputs({ message: "", amount: "" })
                                }
                            >
                                SEND TIP
                              </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>,
            document.body
        )
        : null;
};
