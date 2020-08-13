import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

export const TakePictureWithWebcam: React.FunctionComponent<{ onClose: (a: boolean)=>void, onUploadPhoto: (a: any, b: any) => void }> 
    = ({ onUploadPhoto, onClose }) => {
    
    const canvasRef = useRef(document.createElement("canvas"));
    const videoRef = useRef(document.createElement("video"));
    const containerRef = useRef(document.createElement("div"));
    const [showCamVideo, setShowCamVideo] = useState(true);
    const [currentStream, setCurrentStream] = useState<any>();
    let localStream: any = null;

    const processDevices = (devices: any) => {
        devices.forEach((device: any) => {
            setDevice(device);
        });
    }

    const setDevice = async (device: any) => {
        const { deviceId } = device;
        const stream: any = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        setCurrentStream(stream);
        // console.log("setDevice", stream);
        localStream = stream;
        // console.log("localStream", localStream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    }

    useEffect(() => {
        (async () => {
            const cameras = await navigator.mediaDevices.enumerateDevices();
            processDevices(cameras);
        })();

        return () => {
            closeCamera();
        }
    }, []);

    const takePhoto = () => {
        const containerWidth = containerRef.current.clientWidth - 100;
        const canvasContainer = document.getElementById('cam-photo') as HTMLImageElement;
        const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
        canvas.setAttribute('height', '260px');
        canvas.setAttribute('width', containerWidth.toString() + 'px');
        const context = canvas.getContext('2d');
        context!.drawImage(videoRef.current, 0, 0, containerWidth, 260);
        const dataUri = canvas.toDataURL("image/png");
        canvasContainer.src = dataUri;
    }

    const closeCamera = () => {
        try {
            const stream: any = videoRef.current.srcObject;
            const tracks = stream.getTracks();
    
            tracks.forEach(function(track: any) {
                track.stop();
            });
    
            videoRef.current.srcObject = null;
    
            if (currentStream) {
                currentStream.getTracks().forEach(function(track: any) {
                    track.stop();
                });
            }
            if (localStream) {
                localStream.getTracks().forEach(function(track: any) {
                    track.stop();
                });
            }
        } catch(e) {
            console.log("Exception closing webcam : ", e);
        } finally {
            onClose(false);
        }
    }

    const uploadPhoto = (blob: any) => {
        const image = document.getElementById('cam-photo') as HTMLImageElement;
        onUploadPhoto(image.src, new File([blob], new Date().valueOf() + ".png"));
        closeCamera();
    }
    
    return <div ref={containerRef} 
            className="w-100 px-2 py-1 d-flex flex-column align-items-center justify-content-start"
            >
                <div className="d-flex align-items-center justify-content-between bg-primary w-100 p-2 mb-1">
                    <div>
                        <FontAwesomeIcon className="cursor-pointer" icon={faTimes} color="white" onClick={closeCamera} />
                        <span className="text-white font-20px ml-2">Take Photo</span>
                    </div>
                    {!showCamVideo && <div className="cursor-pointer" onClick={()=> {
                        const photoElem = document.getElementById("cam-photo") as HTMLImageElement;
                        photoElem.src = '';
                        setShowCamVideo(true);
                    }}>
                        <FontAwesomeIcon icon={faUndo} color="white" />
                        <span className="text-white font-20px ml-2">Retake</span>
                    </div>}
                </div>
                <img id="cam-photo" />
                <video ref={videoRef} width="100%" height={260} style={{ display: showCamVideo ? 'block' : 'none' }} />

                {showCamVideo && <button className="bg-primary text-white mt-2" onClick={() => { takePhoto(); setShowCamVideo(false); videoRef.current.style.zIndex = "-1" }}>Capture</button>}
                {!showCamVideo && <button className="bg-primary text-white mt-2" onClick={(e) => { 
                    canvasRef.current.toBlob(uploadPhoto);
                }}>Upload</button>}
        </div>
}