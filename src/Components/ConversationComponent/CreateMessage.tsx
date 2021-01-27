// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../Hooks";
import { faLink, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IStore } from "@Redux/IStore";
// #endregion Global Imports

// #region Local Imports
import { Textarea } from "@Components/Basic";
import { MessagesActions } from "@Actions";
import { USER_SESSION, CONVERSATION_THREAD, IConversationPage } from "@Interfaces";
import { theme } from "@Definitions/Styled";
import { MessageMediaPreview } from "./MessageMediaPreview";
import { NonFeedTipSubmitModal } from "../Modals/NonFeedTipSubmitModal";
import { PriceTagModal } from "../Modals/PriceTagModal";
import { ParagraphText } from "@Components/ParagraphText";
import { LoadingSpinner } from "@Components";
import { FeedsActions } from "@Actions";
import { IFeed } from "@Interfaces";
import { PrimaryButton } from "@Components/PrimaryButton";
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

export const CreateMessage: React.FunctionComponent<{
    conversationThread: CONVERSATION_THREAD;
    user: USER_SESSION;
    conversationId: number;
    onSuccess: () => void;
}> = ({ conversationThread, user, conversationId, onSuccess }) => {
    const { activeConversationError } = useSelector((store: IStore) => store.persistState)
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
    const { userConversationSettings, creatorConversationSettings } = conversationThread;
    // console.log("CreateMessage-userConversationSettings", userConversationSettings);
    // console.log("CreateMessage-creatorConversationSettings", creatorConversationSettings);
    useEffect(() => {
        // userConversationSetting is where followingId = recipient and creatorId = user
        // creatorConversationSetting is where followingId = user and creatorId = recipient
        var mySettingsAsCreator = userConversationSettings;
        var recipientSettingsAsCreator = creatorConversationSettings;
        var isFollower: boolean = userConversationSettings && userConversationSettings.state == 1;
        var isFollowing: boolean = creatorConversationSettings && creatorConversationSettings.state == 1;

        setError("");
        if (user.isCreator) {
            if (isFollower && mySettingsAsCreator && mySettingsAsCreator.isBlocked === true)
                setError("You can no longer reply to this conversation as the follower is blocked.");
            if (isFollower && mySettingsAsCreator && mySettingsAsCreator.isRestricted === true)
                setError("You may not recieve messages as the follower is restricted.");
            if (!isFollower && !isFollowing)
                setError("You cannot send messages as the subscription is not active.");
        }
        else {
            if (!isFollowing)
                setError("You cannot send messages as the subscription is not active.");
        }


    }, [conversationThread.creatorConversationSettings, conversationThread.userConversationSettings]);

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
        const params: any = { //IConversationPage.Actions.IGetPOSTCreateMessagePayload = {
            conversationId: conversationId,
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
            const videoFormData = new FormData();
            files.forEach(file => {
                const isVideo = file.raw.name.split('.')[1] === ('mp4');
                if (isVideo)
                    videoFormData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
                else
                    formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
            });
            params.meta = {
                purchase_status: false,
                amount: user.isCreator ? parseFloat(priceTagAmount) : 0,
                view_status: true,
            };
            params.images_formData = formData;
            params.videos_formData = videoFormData;
        }
        await dispatch(MessagesActions.CreateMessage(params));
        setMessage("");
        setFiles([]);
        setLoading(false);
        setError("");
        setPriceTagAmount("");
    };

    const onSetPriceTagAmount = (amount: string) => {
        if (parseFloat(amount) < 1) amount = "";
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
            conversationId: conversationId,
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
        await dispatch(MessagesActions.CreateMessage(params));
        setMessage("");
        setFiles([]);
        setLoading(false);
        setError("");
    };

    const onTipSubmit = async (amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = {
            contentId: 0,
            viewerId: user.id,
            message: message,
            amount: parseInt(amount),
            creatorUserName: conversationThread.recipientUserName,
            authtoken: user.token,
        };
        toggle();
        FeedsActions.TipFeed(param)().then((resp: any) => {
            // console.log("TipFeed: ",resp);
            if (resp && resp.status == true)
                sendTipMessage(resp.response, message, amount, user.id);
            else
                setError(resp.error ?? "Tip failed. Please try again later.");
        });
    };
    const onSetPriceTag = async () => {
        if (files.length > 0) {
            setShowPriceTagModal(true);
            toggle();
        } else {
            setError(
                "Please upload files before setting price."
            );
        }
    }
    return (
        <div className="d-flex flex-column pl-4 pr-3">
            {showPriceTagModal && (
                <PriceTagModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    onSubmit={onSetPriceTagAmount}
                    defaultAmount={priceTagAmount.toString()}
                />
            )}
            {showTipModal && (
                <NonFeedTipSubmitModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    onSubmit={onTipSubmit}
                />
            )}
            {priceTagAmount != "" && <div className="d-flex justify-content-center"><PrimaryButton borderRadius="10px 10px 0px 0px" isActive={true}
                className="p-1 px-2"
                onClick={onSetPriceTag}>
                {"Price Tag: $" + priceTagAmount}
            </PrimaryButton></div>}
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
                        accept="image/*,video/*"
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
                        onClick={onSetPriceTag}
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
                        (userConversationSettings && userConversationSettings.isBlocked) || (creatorConversationSettings && creatorConversationSettings.isBlocked)
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
                                if ((userConversationSettings && userConversationSettings.isBlocked) || (creatorConversationSettings && creatorConversationSettings.isBlocked))
                                    return false;

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
