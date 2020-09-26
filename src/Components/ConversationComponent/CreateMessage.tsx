// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useModal } from '../Hooks';
import { faLink, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { Textarea } from "@Components/Basic";
import { MessagesActions } from "@Actions";
import { USER_SESSION, CONVERSATION_THREAD } from "@Interfaces";
import { theme } from "@Definitions/Styled";
import { MessageMediaPreview } from "./MessageMediaPreview"; 
import { TipSubmitModal } from "../Modals/TipSubmitModal";
import { PriceTagModal } from "../Modals/PriceTagModal";
import { ParagraphText } from "@Components/ParagraphText";
import { LoadingSpinner } from "@Components";
import { FeedsActions } from "@Actions";
import { IFeed, FEED } from "@Interfaces";

// #endregion Local Imports

interface IUploadImage {
    preview: "", 
    raw: {
        name: string,
        size: number,
        type: string,
        webkitRelativePath: ""
    }
}

export const CreateMessage: React.FunctionComponent<{ conversationThread: CONVERSATION_THREAD, user: USER_SESSION, conversationId: number, onSuccess: ()=>void }> 
    = ({ conversationThread, user, conversationId, onSuccess }) => {

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
    const { conversationSettings } = conversationThread;


    useEffect(() => {
        if (conversationSettings && conversationSettings.isBlocked)
            setError("You can no longer reply to this conversation.");
        else
            setError("");

    }, [conversationSettings]);

    const handleMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setMessage(value);
    }

    const handleFileChange = (e: any) => {
        if (e.target.files.length) {
            const uploadedFiles = [];
            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    preview: URL.createObjectURL(e.target.files[i]),
                    raw: e.target.files[i]
                } as IUploadImage)
            }
            setFiles([...files, ...uploadedFiles]);
        }
    };

    const sendMessage = async () => {
        const messageType = files.length > 0 ? 2 : 1;
        const date = new Date();
        const params: any = {
            conversationId: conversationId,
            senderId: user.id,
            type: messageType,
            message: message,
            onSuccessScroll: onSuccess,
            sentAt: date.getFullYear() 
                + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) 
                + "-" + (new Date().getDate() < 10 ? "0" + date.getDate() : date.getDate())
        }
        if (messageType === 2) {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
            });
            params.meta = {
                media_urls: formData,
                purchase_status: false,
                amount: user.isCreator ? priceTagAmount : 0
            }
        }
        await dispatch(MessagesActions.CreateMessage(params));
        setMessage('');
        setFiles([]);
        setLoading(false);
        setError('');
        setPriceTagAmount("");
    }

    const onSetPriceTagAmount = (amount: string) => {
        setPriceTagAmount(amount);
        toggle();
    }

    const sendTipMessage = async (tipId: number, message: string, amount: string, userId: number) => {
        const date = new Date();
        const params: any = {
            conversationId: conversationId,
            senderId: user.id,
            type: 3,
            message: message,
            onSuccessScroll: onSuccess,
            sentAt: date.getFullYear() 
                + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) 
                + "-" + (new Date().getDate() < 10 ? "0" + date.getDate() : date.getDate()),
            meta: {
                amount: amount,
                tipMsg: message,
                tipId: tipId,
                userId: userId
            }
        }
        setLoading(true);
        await dispatch(MessagesActions.CreateMessage(params));
        setMessage('');
        setFiles([]);
        setLoading(false);
        setError('');
    }

    const onTipSubmit = async (feed: FEED, amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = { 
            contentId: 0, 
            viewerId: user.id, 
            message: message, 
            amount: parseInt(amount),
            creatorUserName: user.username
        };
        toggle();
        FeedsActions.TipFeed(param)().then((resp: any) => {
            sendTipMessage(resp.response, message, amount, user.id );
        });
    }


    return (<div className="d-flex flex-column pl-4 pr-3">
        {showPriceTagModal && <PriceTagModal isShowing={isShowing} 
            modalRef={modalRef} 
            onSubmit={onSetPriceTagAmount}
            />}
        {showTipModal && <TipSubmitModal isShowing={isShowing} 
            modalRef={modalRef} 
            onSubmit={onTipSubmit}
            clickedFeed={{ username: '', profileImageUrl: ''}}
            />}
        {files.length > 0 && <MessageMediaPreview files={files} />}
        {error && files.length <= 0 && <ParagraphText className="text-danger font-12px">
            {error}
        </ParagraphText>}
        <div className="d-flex align-items-center justify-content-between w-100 py-3">
            <div className="position-relative cursor-pointer" onClick={(e: any) => {
                const _input = document.getElementById("message-media-upload");
                _input && _input.click();
            }}>
                <input accept="image/*,video/mp4,video/3gpp,video/quicktime" 
                    id="message-media-upload"
                    name="upload-media"
                    type="file" 
                    multiple={true} 
                    style={{ display: "none" }} 
                    onChange={handleFileChange} />
                <img src="/images/message_attachment.svg" />
            </div>
            
            {/* NEED REVERT CHECK */}
            {user.isCreator && <img className="px-1 cursor-pointer" 
                onClick={() => { 
                    if (files.length > 0) {
                        setShowPriceTagModal(true);
                        toggle();
                    } else {
                        setError("Please upload files before setting price.");
                    }
                }}
                src={!priceTagAmount ? "/images/dollar_tag@2x.png" : "/images/dollar_tag_outlined@2x.png"}
                height="45px" 
                width="45px" />}
            
            {!user.isCreator && <img className="px-1 cursor-pointer" 
                onClick={() => { setShowTipModal(true); toggle(); }}
                src={"/images/message_tip_dollar.svg"} 
                height="45px" 
                width="45px" />}
            
            <Textarea 
                placeholder="Say Something..."
                name="message" 
                rows={1} 
                disabled={conversationSettings && conversationSettings.isBlocked}
                columns={10} 
                className="px-3 py-3 border-grey500 rounded w-100 font-14px text-primary mr-2 text-area-box-shadow" 
                onChange={handleMessageChange}
                value={message}/>
            {!loading && <FontAwesomeIcon
                    onClick={() => { if(message || files.length > 0) {
                        if (conversationSettings && conversationSettings.isBlocked 
                        || conversationSettings && conversationSettings.isRestricted) return false;
                         
                        setLoading(true); 
                        sendMessage();
                    } }}
                    className="cursor-pointer" icon={faArrowRight} color={theme.colors.primary} size="lg" />}
            {loading && <LoadingSpinner size="1x" showLoading={loading} />}
        </div>
    </div>);
}
