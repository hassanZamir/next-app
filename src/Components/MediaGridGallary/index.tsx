import React, { useEffect, useState, useRef } from "react";
import { FEED_MEDIA } from "@Interfaces";
import { BackgroundImage } from "@Components/Basic";
import { VideoPlayer, MediaCarousel } from "@Components";
import { useModal } from '../Hooks';

const mediaBaseUrl = process.env.MEDIA_BASE_URL + "/";

export const MediaGridGallary: React.FunctionComponent<{ mediaGallary: FEED_MEDIA[], errors: string }>
    = ({ mediaGallary, errors }) => {

        const [showMediaCarousel, setShowMediaCarousel] = useState(-1);
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
                return <div className="px-2 d-flex w-100 align-items-center"
                    key={i}>

                    {mediaChunk.map((media: FEED_MEDIA, j: number) => {
                        return <div key={j}
                            style={{
                                flex: "0 0 33%",
                                maxWidth: "33%",
                                margin: j === 1 ? "2px 2px 0px 2px" : "2px 0px 0px 0px",
                                height: ""
                            }}>
                            <div className="w-100 h-100 d-flex align-items-center">
                                {media.type === 2 && <VideoPlayer
                                    videoHeight="260px"
                                    onClick={(e) => { e.preventDefault(); setShowMediaCarousel(i * 3 + j); toggle(); }}
                                    src={mediaBaseUrl + media.url + media.token} />}

                                {media.type === 1 && <BackgroundImage paddingBottom="65.25%"
                                    onClick={(e) => { setShowMediaCarousel(i * 3 + j); toggle(); }}
                                    src={[mediaBaseUrl + media.url + media.token, '/images/feed_placeholder.png']} />}
                            </div>
                        </div>
                    })}
                </div>
            })}
            {showMediaCarousel >= 0 && <MediaCarousel media={mediaGallary}
                isShowing={isShowing}
                modalRef={modalRef}
                toggle={toggle}
                startingIndex={showMediaCarousel} />}
        </div>
    }
