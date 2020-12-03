import React, { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { Modal } from "@Components/Basic";
import { theme } from "@Definitions/Styled/theme"
import { ParagraphText, FormComponent, LabelInput, MultiLabelInput, PrimaryButton, SelectInput } from "@Components";
import { USER_SESSION } from "@Interfaces";
import { IStore } from "@Redux/IStore";

declare namespace IFrameModal {
    export interface IProps {
        user: USER_SESSION;
        url: string;
        title: string;
    }
}

export const IFrameModal: React.ForwardRefRenderFunction<HTMLDivElement, IFrameModal.IProps> = ((props) => {
    const { user, url, title } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    function onModalClose(e: any) {
        // if (modalRef!.current && !modalRef!.current.contains(e.target)) {
        //     dispatch(PaymentActions.OnModalClosePaymentSettings());
        // }
    }

    useEffect(() => {
        document.addEventListener("click", onModalClose);

        return () => {
            document.removeEventListener("click", onModalClose);
        };
    });

    return ReactDOM.createPortal(
        <Modal border={theme.colors.primary} borderRadius="18px"
            width="initial">
            <div className="w-100 h-100 d-flex flex-column">
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">{title}</ParagraphText>
                <iframe src={url} frameBorder="0" width="90%" height="auto"></iframe>
            </div>
        </Modal>, document.body
    )
});
