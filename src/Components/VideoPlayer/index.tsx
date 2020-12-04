
export const VideoPlayer: React.FunctionComponent<{ src: string, videoHeight?: string, onClick?: (e: any) => void }>
    = ({ src, videoHeight, onClick }) => {

        return <video onClick={onClick} controls className="w-100" height={videoHeight ? videoHeight : "100%"}>
            <source src={src} />
        </video>
    }