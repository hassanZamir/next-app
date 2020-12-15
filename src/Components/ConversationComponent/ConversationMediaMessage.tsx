// #region Global Imports
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { BackgroundImage } from "@Components/Basic";
import { theme } from "@Definitions/Styled";
import { CONVERSATION_MEDIA_MESSAGE, USER_SESSION } from "@Interfaces";
import { MediaCarousel } from "@Components";
import { useModal } from '../Hooks';
import { ParagraphText } from "@Components/ParagraphText";
import { TextMessageContainer } from "@Components/Basic";
import { MessagesActions } from "@Actions";
// #endregion Local Imports

export const ConversationMediaMessage: React.FunctionComponent<{ user: USER_SESSION, conversationMessage: CONVERSATION_MEDIA_MESSAGE, isMessageRecieved: boolean, messageRef: any }>
    = ({ user, conversationMessage, isMessageRecieved, messageRef }) => {

        const [showMediaCarousel, setShowMediaCarousel] = useState(-1);
        const modalRef = useRef<HTMLDivElement>(null);
        const { isShowing, toggle } = useModal(modalRef);
        const dispatch = useDispatch();

        if (!conversationMessage.meta) return null;
        const { meta } = conversationMessage;

        const buyMedia = (message: CONVERSATION_MEDIA_MESSAGE) => {
            const params = { messageId: message.id, userId: user.id, authtoken: user.token }
            dispatch(MessagesActions.BuyMessage(params));
        }

        const updateViewStatus = (message: CONVERSATION_MEDIA_MESSAGE) => {
            if (!message.meta.view_status) {
                dispatch(MessagesActions.UpdateViewStatus({ messageId: message.id, authtoken: user.token }));
            }
        }

        const isMessagePaid = meta.purchase_status || !meta.amount || (meta.amount.toString() === "0");
        const thumbnailUrl = ((isMessagePaid || !isMessageRecieved) && meta.media_urls[0] && meta.view_status ? process.env.MEDIA_BASE_URL + "/" + meta.media_urls[0].url : "/images/default_thumbnail.jpg");//meta.view_status || user.id === conversationMessage.senderId ? meta.media_urls[0].url : meta.media_urls[0].thumbnailUrl;

        return (<div ref={messageRef} className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end")}>
            <div className="d-flex flex-column h-100" style={{ width: "40%" }}>
                <div className="position-relative d-flex flex-column align-items-center justify-content-center"
                    style={{ border: "1px solid " + theme.colors.primary, borderRadius: "12px" }}
                    onClick={() => {
                        if ((isMessagePaid || !isMessageRecieved) && meta.view_status) {
                            updateViewStatus(conversationMessage);
                            setShowMediaCarousel(0);
                            toggle();
                        }
                    }}>

                    {showMediaCarousel >= 0 && meta.media_urls.length && <MediaCarousel
                        media={meta.media_urls.map((media) => {
                            return {
                                type: media.type,
                                token: '',
                                url: media.url
                            }
                        }) as any}
                        isShowing={isShowing}
                        modalRef={modalRef}
                        toggle={toggle}
                        startingIndex={showMediaCarousel} />}
                    <BackgroundImage src={[thumbnailUrl, '/images/cover_image_placeholder.png']}
                        paddingBottom="65.25%"
                        borderRadius="12px" />
                    <div className="position-absolute">
                        {(isMessagePaid || !isMessageRecieved) && !meta.view_status && <div className={`py-1 px-2 cursor-pointer font-11px text-white ${meta.view_status ? "p-4" : "bg-primary"}`}
                            onClick={() => { updateViewStatus(conversationMessage); setShowMediaCarousel(0); toggle(); }}
                            style={{ border: "1px solid white", borderRadius: "4px" }}>
                            {<span> Tap to Open</span>}
                        </div>}
                        {!isMessagePaid &&
                            (isMessageRecieved ? <div className="d-flex flex-column">
                                <img src="/images/lock.svg" />
                                <div style={{ border: "1px solid white", borderRadius: "4px" }}
                                    className="py-1 px-2 cursor-pointer font-11px text-white bg-primary d-flex flex-column"
                                    onClick={() => { buyMedia(conversationMessage) }}>
                                    {'Pay $' + meta.amount}
                                </div>
                            </div> : ""

                            )
                        }
                    </div>
                </div>
                {!isMessagePaid && <ParagraphText className="text-darkGrey font-11px">
                    {'$' + meta.amount + " " + (isMessagePaid ? "Paid" : "Not paid yet")}
                </ParagraphText>}
                {meta.purchase_status && meta.amount > 0 && <ParagraphText className="text-darkGrey font-11px">
                    {'$' + meta.amount + " Paid"}
                </ParagraphText>}
                {conversationMessage.message && <div className="mt-1"></div>}
                {conversationMessage.message && <TextMessageContainer isMessageRecieved={isMessageRecieved}>
                    {conversationMessage.message}
                </TextMessageContainer>}
            </div>
        </div >);
    }
