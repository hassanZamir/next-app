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
      toggle: ()=>void
  }
}
const mediaBaseUrl = 'https://venodev.blob.core.windows.net/veno-media';

export const MediaCarousel: React.RefForwardingComponent<HTMLDivElement, IMediaCarousel.IProps>
    = ({ media, isShowing, modalRef, toggle }) => {
    
    const renderItem = (a: any) => {
      if (a.type === 1)
        return <BackgroundImage paddingBottom="54.25%" src={ [a.original, '/images/feed_placeholder.png'] } />
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
        <ImageGallery items={mapMedia(media)} renderItem={renderItem} 
          showThumbnails={false} showIndex={true} />
      </div>
    </Modal>, document.body) : null
}