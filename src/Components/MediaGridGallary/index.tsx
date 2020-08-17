import React, { useEffect, useState, useRef } from "react";
import { mediaUrl } from "@Interfaces";
import { BackgroundImage } from "@Components/Basic";
import { VideoPlayer, MediaCarousel  } from "@Components";
import { useModal } from '../Hooks';

const mediaBaseUrl = 'https://venodev.blob.core.windows.net/veno-media';

export const MediaGridGallary: React.FunctionComponent<{ mediaGallary: mediaUrl[], errors: string }> 
    = ({ mediaGallary, errors }) => {
    
    const [showMediaCarousel, setShowMediaCarousel] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    const chunk = (array: any, size: number) => {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
        }
        return chunked_arr;
    }

    return <div style={{ minHeight: "400px" }} className="w-100 d-flex flex-column align-items-center">
        {errors && <div className="px-4 w-100 d-flex text-danger font-12px">{errors}</div>}
        {mediaGallary.length > 0 && chunk(mediaGallary, 3).map((mediaChunk, i) => {
            return <div className="px-2 row w-100" key={i}>
                {mediaChunk.map((media: mediaUrl, j: number) => {
                    return <div key={j} style={{ padding: 0, height: "120px", flex: "0 0 33.33333%", maxWidth: "33.33333%" }} 
                        >
                        <div className={"w-100 h-100 d-flex align-items-center justify-content-center " + (j === 1 ? "mx-1" : "")}>
                            {media.type === 2 && <VideoPlayer 
                                onClick={(e)=> { e.preventDefault(); setShowMediaCarousel(true); toggle(); }} 
                                src={mediaBaseUrl + '/' + media.url + media.token}  />}

                            {media.type === 1 && <BackgroundImage paddingBottom="65.25%" 
                                onClick={(e)=> { setShowMediaCarousel(true); toggle(); }}
                                src={[mediaBaseUrl + '/' + media.url + media.token, '/images/feed_placeholder.png']} />}
                        </div>
                    </div>
                })}
            </div>
        })}
        {showMediaCarousel && <MediaCarousel media={mediaGallary} isShowing={isShowing} modalRef={modalRef} toggle={toggle} />}
    </div>
}
