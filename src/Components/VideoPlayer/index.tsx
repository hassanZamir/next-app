import { mediaUrl } from "@Interfaces";

export const VideoPlayer: React.FunctionComponent<{ src: string, videoHeight?: string}> 
    = ({ src, videoHeight }) => {
    
    return <video controls className="w-100" height={videoHeight ? videoHeight : "100%"}>
        <source src={src} />
    </video>
}