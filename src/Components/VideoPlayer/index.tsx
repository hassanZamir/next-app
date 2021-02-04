
export const VideoPlayer: React.FunctionComponent<{ src: string, classNames: string,videoHeight?: string, onClick?: (e: any) => void }>
    = ({ src, videoHeight, onClick, classNames }) => {

        return <video 
            onClick={onClick} 
            controls 
            className={"w-100 " + (classNames ? classNames : '')}
            height={videoHeight ? videoHeight : "100%"}>

            <source src={src} />
        </video>
    }