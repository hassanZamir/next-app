import React, { useEffect, useState } from "react";
import { mediaUrl } from "@Interfaces";
import { BackgroundImage } from "@Components/Basic";
import { VideoPlayer } from "@Components";

const mediaBaseUrl = 'https://venodev.blob.core.windows.net/veno-media';

export const MediaGridGallary: React.FunctionComponent<{ mediaGallary: mediaUrl[], errors: string }> 
    = ({ mediaGallary, errors }) => {
    
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
            return <div className="px-2 row w-100">
                {mediaChunk.map((media: mediaUrl, j: number) => {
                    return <div style={{ padding: 0, height: "120px", flex: "0 0 33.33333%", maxWidth: "33.33333%" }} 
                        >
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                            {media.type === 2 && <VideoPlayer src={mediaBaseUrl + '/' + media.url + media.token}  />}
                            {media.type === 1 && <BackgroundImage paddingBottom="65.25%" src={[mediaBaseUrl + '/' + media.url + media.token, '/images/feed_placeholder.png']} />}
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}
