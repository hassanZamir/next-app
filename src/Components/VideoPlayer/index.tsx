import { mediaUrl } from "@Interfaces";

export const VideoPlayer: React.FunctionComponent<{ src: string}> = ({ src }) => {
    return <video controls className="w-100">
        <source src={src} />
    </video>
}