import React from "react";
import ReactDOM from "react-dom";
import { theme } from "@Definitions/Styled";

interface IUploadImage {
    preview: "", 
    raw: {
        name: string,
        size: number,
        type: string,
        webkitRelativePath: ""
    }
}

export const MessageMediaPreview: React.FunctionComponent <{ files: IUploadImage[] }> = ({ files }) => {
    return <div className="px-2 py-1 d-flex align-items-center"
        style={{ borderTop: "1px solid " + theme.colors.darkGrey,
        borderBottom: "1px solid " + theme.colors.darkGrey }}>
        {files.map((url, i) => {
            const isVideo = url.raw.name.split('.')[1] === ('mp4' || '3gpp' || 'quicktime');
            return (<div key={i} style={{ borderRadius: "12px" }}>
                {url.preview && !isVideo && <img style={{ borderRadius: "12px" }} src={url.preview} width="100" height="75" className={i > 0 ? "ml-1" : ""} />}
                {url.preview && isVideo && <video style={{ borderRadius: "12px" }} className={i > 0 ? "ml-1" : ""} width="100" height="75" controls={false}>
                    <source type="video/mp4" src={url.preview} />
                </video>}
            </div>)
        })}
    </div>
}
