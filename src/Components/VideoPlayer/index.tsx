import { mediaUrl } from "@Interfaces";

export const VideoPlayer: React.FunctionComponent<{ src: string}> = ({ src }) => {
    return <video controls>
        <source src={src} />
    </video>
}