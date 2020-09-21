import ImageGallery from 'react-image-gallery';
import React, { RefObject } from 'react';

import { mediaUrl } from "@Interfaces";
import { Modal, BackgroundImage } from "@Components/Basic";
import { VideoPlayer } from "@Components";
import ReactDOM from "react-dom";

declare namespace IMediaCarousel {
  export interface IProps {
      isShowing: boolean;
      modalRef?: RefObject<HTMLDivElement>;
      media: mediaUrl[],
      toggle: ()=>void,
      startingIndex: number
  }
}
const mediaBaseUrl = 'https://venodev.blob.core.windows.net/veno-media';

export const MediaCarousel: React.RefForwardingComponent<HTMLDivElement, IMediaCarousel.IProps>
    = ({ media, isShowing, modalRef, toggle, startingIndex }) => {
    
    console.log("media : ", media);
    const renderItem = (a: any) => {
      if (a.type === 1)
        return <div className="d-flex align-items-center justify-content-center">
          <div className="f-flex flex-column">
            <img src={a.original} style={{ border: 0, maxWidth: "100%", maxHeight: "100vh"}} />
            {/* <BackgroundImage paddingBottom="54.25%" src={ [a.original, '/images/feed_placeholder.png'] } /> */}
          </div>
        </div>
      if (a.type === 2)
        return <VideoPlayer src={a.original}  />
    }

    const mapMedia = (media: mediaUrl[]) => {
      return media.map((m: mediaUrl) => {
        return {
          original: mediaBaseUrl + '/' + m.url + m.token,
          thumbnail: mediaBaseUrl + '/' + m.url + m.token,
          type: m.type
        }
      });
    }

    return isShowing ? ReactDOM.createPortal(<Modal width="100%" background="transparent">
      <div ref={modalRef}>
        <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <ImageGallery 
          items={mapMedia(media)} 
          renderItem={renderItem} 
          showThumbnails={false} 
          showIndex={true} 
          startIndex={startingIndex} />
      </div>
    </Modal>, document.body) : null
}