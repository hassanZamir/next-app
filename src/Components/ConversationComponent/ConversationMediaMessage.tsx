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
        const params = { messageId: message.id, userId: user.id }
        dispatch(MessagesActions.BuyMessage(params));
    }

    const isMessagePaid = meta.purchase_status || !meta.amount;

    return (<div ref={messageRef} className={"pb-3 d-flex align-items-center " + (isMessageRecieved ? "justify-content-start" : "justify-content-end" )}>
        <div className="d-flex flex-column h-100" style={{ width: "35%" }}>
            <div className="position-relative d-flex flex-column align-items-center justify-content-center" 
                style={{ border: "1px solid " + theme.colors.primary, borderRadius: "4px" }}>
                
                {showMediaCarousel >= 0 && <MediaCarousel 
                    media={meta.media_urls.map((media) => {
                        return {
                            type: media.media_type,
                            token: '',
                            url: media.url
                        }
                    }) as any} 
                    isShowing={isShowing} 
                    modalRef={modalRef} 
                    toggle={toggle} 
                    startingIndex={showMediaCarousel} />}
                <BackgroundImage src={[process.env.MEDIA_BASE_URL + "/" + meta.media_urls[0].thumbnailUrl, '/images/feed_placeholder.png']} 
                        paddingBottom="54.25%" />
                <div className="position-absolute">
                    {isMessagePaid && <div className="py-1 px-2 cursor-pointer font-11px text-white" 
                        onClick={() => { setShowMediaCarousel(0); toggle(); }}
                        style={{ border: "1px solid white", borderRadius: "4px" }}>
                            Click to Open
                    </div>}
                    {!isMessagePaid && 
                        (isMessageRecieved ? <div style={{ border: "1px solid white", borderRadius: "4px" }}
                            className="py-1 px-2 cursor-pointer font-11px text-white" onClick={()=>{ buyMedia(conversationMessage) }}>{'Pay $' + meta.amount}</div> : 
                        <div className="py-1 px-2 cursor-pointer font-11px text-white" 
                            onClick={() => { setShowMediaCarousel(0); toggle(); }}
                            style={{ border: "1px solid white", borderRadius: "4px" }}>
                            Click to Open
                        </div>)
                    }
                </div>
            </div>
            {!isMessagePaid && <ParagraphText className="text-darkGrey font-11px">
                {'$' + meta.amount + " " + (meta.purchase_status ? "Paid" : "Not paid yet")}
            </ParagraphText>}
        </div>
    </div>);
}
