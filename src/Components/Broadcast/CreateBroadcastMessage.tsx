// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useModal } from "../Hooks";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
// #endregion Global Imports

// #region Local Imports
import { Textarea } from "@Components/Basic";
import { MessagesActions } from "@Actions";
import { USER_SESSION, CONVERSATION_THREAD, MESSAGE_RECIPIENT } from "@Interfaces";
import { theme } from "@Definitions/Styled";
import { MessageMediaPreview } from "../ConversationComponent/MessageMediaPreview";
import { NonFeedTipSubmitModal } from "../Modals/NonFeedTipSubmitModal";
import { PriceTagModal } from "../Modals/PriceTagModal";
import { ParagraphText } from "@Components/ParagraphText";
import { LoadingSpinner } from "@Components";
import { FeedsActions } from "@Actions";
import { IFeed, FEED } from "@Interfaces";

// #endregion Local Imports

interface IUploadImage {
    preview: "";
    raw: {
        name: string;
        size: number;
        type: string;
        webkitRelativePath: "";
    };
}

export const CreateBroadcastMessage: React.FunctionComponent<{
    user: USER_SESSION;
    onSuccess: () => void;
    recipients: MESSAGE_RECIPIENT[]
}> = ({ user, onSuccess, recipients }) => {
    const [message, setMessage] = useState("");
    const [priceTagAmount, setPriceTagAmount] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);
    const [showPriceTagModal, setShowPriceTagModal] = useState(false);
    const [showTipModal, setShowTipModal] = useState(false);
    const [files, setFiles] = useState<IUploadImage[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setMessage(value);
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length) {
            const uploadedFiles = [];
            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    preview: URL.createObjectURL(e.target.files[i]),
                    raw: e.target.files[i],
                } as IUploadImage);
            }
            setFiles([...files, ...uploadedFiles]);
        }
    };

    const sendMessage = async () => {
        const messageType = files.length > 0 ? 2 : 1;
        const date = new Date();
        const params: any = {
            conversationId: '',
            senderId: user.id,
            type: messageType,
            message: message,
            authtoken: user.token,
            onSuccessScroll: onSuccess,
            sentAt:
                new Date().getUTCFullYear() +
                "-" +
                (new Date().getUTCMonth() + 1) +
                "-" +
                (new Date().getUTCDate()),
        };
        if (messageType === 2) {
            const formData = new FormData();
            files.forEach(file => {
                formData.append(
                    "mediaFiles",
                    new Blob([file.raw as any]),
                    file.raw.name
                );
            });
            params.meta = {
                media_urls: formData,
                purchase_status: false,
                amount: user.isCreator ? priceTagAmount : 0,
                view_status: true,
            };
        }
        const broadCastResponse: any = await dispatch(MessagesActions.SendBroadcastMessage({
            message: params,
            recipients: recipients.map((r: MESSAGE_RECIPIENT) => { return r.userName })
        }));
        if (broadCastResponse.status) {
            // Router.push("/message", "/message");
            setMessage("");
            setFiles([]);
            setLoading(false);
            setError("");
        } else {
            setLoading(false);
            setError("Failed to send broadcast");
        }
    };

    const onSetPriceTagAmount = (amount: string) => {
        setPriceTagAmount(amount);
        toggle();
    };

    const sendTipMessage = async (
        tipId: number,
        message: string,
        amount: string,
        userId: number
    ) => {
        const date = new Date();
        const params: any = {
            conversationId: '',
            senderId: user.id,
            type: 3,
            authtoken: user.token,
            message: message,
            onSuccessScroll: onSuccess,
            sentAt:
                new Date().getUTCFullYear() +
                "-" +
                (new Date().getUTCMonth() + 1) +
                "-" +
                (new Date().getUTCDate()),
            meta: {
                amount: amount,
                tipMsg: message,
                tipId: tipId,
                userId: userId,
            },
        };
        setLoading(true);
        const broadCastResponse: any = await dispatch(MessagesActions.SendBroadcastMessage({
            message: params,
            recipients: recipients.map((r: MESSAGE_RECIPIENT) => { return r.userName })
        }));
        if (broadCastResponse.status) {
            // Router.push("/message", "/message");
            setMessage("");
            setFiles([]);
            setLoading(false);
            setError("");

        } else {
            setLoading(false);
            setError("Failed to send broadcast");
        }
    };

    const onTipSubmit = async (amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = {
            contentId: 0,
            viewerId: user.id,
            message: message,
            amount: parseInt(amount),
            creatorUserName: user.username,
            authtoken: user.token,
        };
        toggle();
        FeedsActions.TipFeed(param)().then((resp: any) => {
            sendTipMessage(resp.response, message, amount, user.id);
        });
    };

    return (
        <div className="d-flex flex-column pl-4 pr-3">
            {showPriceTagModal && (
                <PriceTagModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    onSubmit={onSetPriceTagAmount}
                />
            )}
            {showTipModal && (
                <NonFeedTipSubmitModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    onSubmit={onTipSubmit}
                />
            )}
            {files.length > 0 && <MessageMediaPreview files={files} />}
            {error && files.length <= 0 && (
                <ParagraphText className="text-danger font-12px">
                    {error}
                </ParagraphText>
            )}
            <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <div
                    className="position-relative cursor-pointer"
                    onClick={(e: any) => {
                        const _input = document.getElementById(
                            "message-media-upload"
                        );
                        _input && _input.click();
                    }}
                >
                    <input
                        accept="image/*,video/mp4,video/3gpp,video/quicktime"
                        id="message-media-upload"
                        name="upload-media"
                        type="file"
                        multiple={true}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <img src="/images/message_attachment.svg" />
                </div>

                {/* NEED REVERT CHECK */}
                {user.isCreator && (
                    <img
                        className="px-1 cursor-pointer"
                        onClick={() => {
                            if (files.length > 0) {
                                setShowPriceTagModal(true);
                                toggle();
                            } else {
                                setError(
                                    "Please upload files before setting price."
                                );
                            }
                        }}
                        src={
                            !priceTagAmount
                                ? "/images/dollar_tag@2x.png"
                                : "/images/dollar_tag_outlined@2x.png"
                        }
                        height="45px"
                        width="45px"
                    />
                )}

                {!user.isCreator && (
                    <img
                        className="px-1 cursor-pointer"
                        onClick={() => {
                            setShowTipModal(true);
                            toggle();
                        }}
                        src={"/images/message_tip_dollar.svg"}
                        height="45px"
                        width="45px"
                    />
                )}

                <Textarea
                    placeholder="Say Something..."
                    name="message"
                    rows={1}
                    disabled={
                        false
                    }
                    columns={10}
                    className="px-3 py-3 border-grey500 rounded w-100 font-14px text-primary mr-2 text-area-box-shadow resizeable-y"
                    onChange={handleMessageChange}
                    value={message}
                />
                {!loading && (
                    <FontAwesomeIcon
                        onClick={() => {
                            if (message || files.length > 0) {
                                setLoading(true);
                                sendMessage();
                            }
                        }}
                        className="cursor-pointer"
                        icon={faArrowRight}
                        color={theme.colors.primary}
                        size="lg"
                    />
                )}
                {loading && <LoadingSpinner size="1x" showLoading={loading} />}
            </div>
        </div>
    );
};
