
export const VideoPlayer: React.FunctionComponent<{ src: string, poster?: string, videoHeight?: string, onClick?: (e: any) => void }>
    = ({ src, poster, videoHeight, onClick }) => {

        return <video poster={poster} onClick={onClick} controls className="w-100" height={videoHeight ? videoHeight : "100%"}>
            <source src={src} />
        </video>
    }