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
            return (<React.Fragment key={i}>
                {url.preview && !isVideo && <img src={url.preview} width="38" height="36" className={i > 0 ? "ml-1" : ""} />}
                {url.preview && isVideo && <video className={i > 0 ? "ml-1" : ""} width="38" height="36" controls={false}>
                    <source type="video/mp4" src={url.preview} />
                </video>}
            </React.Fragment>)
        })}
    </div>
}
