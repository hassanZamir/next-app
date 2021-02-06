
export const VideoPlayer: React.FunctionComponent<{ src: string, classNames: string, poster?: string, videoHeight?: string, onClick?: (e: any) => void }>
    = ({ src, videoHeight, onClick, classNames, poster }) => {

        return <video 
            poster={poster}
            onClick={onClick} 
            controls 
            className={"w-100 " + (classNames ? classNames : '')}
            height={videoHeight ? videoHeight : "100%"}
            controlsList="nodownload">

            <source src={src} />
        </video>
    }