import ImageGallery from "react-image-gallery";
import React, { RefObject } from "react";

import { FEED_MEDIA } from "@Interfaces";
import { Modal, BackgroundImage } from "@Components/Basic";
import { VideoPlayer } from "@Components";
import ReactDOM from "react-dom";

declare namespace IMediaCarousel {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        media: FEED_MEDIA[],
        toggle: () => void,
        startingIndex: number
    }
}
const mediaBaseUrl = process.env.MEDIA_BASE_URL;

export const MediaCarousel: React.ForwardRefRenderFunction<
    HTMLDivElement,
    IMediaCarousel.IProps
> = ({ media, isShowing, modalRef, toggle, startingIndex }) => {
    const renderItem = (a: any) => {
        if (a.type === 1)
            return (
                <div className="d-flex align-items-center justify-content-center">
                    <div className="f-flex flex-column">
                        <img
                            src={a.original}
                            style={{
                                border: 0,
                                maxWidth: "100%",
                                maxHeight: "100vh",
                            }}
                        />
                        {/* <BackgroundImage paddingBottom="54.25%" src={ [a.original, '/images/feed_placeholder.png'] } /> */}
                    </div>
                </div>
            );
        if (a.type === 2) return <VideoPlayer src={a.original} videoHeight="initial" 
            classNames="height-70vh" />;
    };

    const mapMedia = (media: FEED_MEDIA[]) => {
        return media.map((m: FEED_MEDIA) => {
            return {
                original: mediaBaseUrl + '/' + m.url + m.token,
                thumbnail: mediaBaseUrl + '/' + m.url + m.token,
                type: m.type
            }
        });
    }

    return isShowing ? ReactDOM.createPortal(<Modal width="100%" borderRadius="0px" background="rgb(0,0,0,0.7)" padding="0px">
        <div ref={modalRef}>
            <div className="modal-header" 
                style={{ 
                    padding: "0px 15px",
                    position: "absolute",
                    top: "-30px",
                    right: "0px"
                }}>
                <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <ImageGallery
                items={mapMedia(media)}
                renderItem={renderItem}
                showThumbnails={false}
                showIndex={true}
                showPlayButton={false}
                showFullscreenButton={false}
                startIndex={startingIndex} />
        </div>
    </Modal>, document.body) : null
}
