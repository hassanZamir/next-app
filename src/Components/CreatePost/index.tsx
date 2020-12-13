import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";

import { USER_SESSION } from "@Interfaces";
import { PrimaryButton, TakePictureWithWebcam } from "@Components";
import { Textarea, ToggleAnimate, AnimatePopup } from "@Components/Basic";
import { FeedsActions } from "@Actions";
import { useToasts } from "react-toast-notifications";

interface IUploadImage {
    preview: "",
    raw: {
        name: string,
        size: number,
        type: string,
        webkitRelativePath: ""
    }
}
export const CreatePost: React.FunctionComponent<{ user: USER_SESSION; }>
    = ({ user }) => {
        const { addToast } = useToasts();
        const [showPostSelection, setShowPostSelection] = useState(false);
        const [files, setFiles] = useState<IUploadImage[]>([]);
        const [title, setTitle] = useState("");
        const [loading, setLoading] = useState(false);
        const [showWebam, setShowWebcam] = useState(false);
        const dispatch = useDispatch();
        const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;
            setTitle(value);
        }

        const convertBytesToString = (bytes: any, decimals: any = 2) => {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        const handleChange = (e: any) => {
            if (e.target.files.length) {
                const uploadedFiles = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    if (e.target.files[i].size > 10053651) {
                        addToast(`Can't upload file greater than 10.00 MB. ${e.target.files[i].name}, Size=${convertBytesToString(e.target.files[i].size)}.`);
                        continue;
                    }
                    uploadedFiles.push({
                        preview: URL.createObjectURL(e.target.files[i]),
                        raw: e.target.files[i]
                    } as IUploadImage)
                }
                setFiles([...files, ...uploadedFiles]);
            }
        };

        const savePost = async () => {
            const formData = new FormData();
            const videoFormData = new FormData();
            files.forEach((file) => {
                const isVideo = file.raw.name.split('.')[1] === ('mp4' || '3gpp' || 'quicktime' || 'avi');
                if (isVideo)
                    videoFormData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
                else
                    formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
            });

            // for (var value of formData.values() as any) {
            //     console.log("formdata: ", value);
            // } for (var value of videoFormData.values() as any) {
            //     console.log("videoFormdata: ", value);
            // }

            setLoading(true);
            const postContent: any = await dispatch(FeedsActions.PostContent({
                media_url: files.length > 0 ? formData : null,
                video_media_url: files.length > 0 ? videoFormData : null,
                title: title,
                userId: user.id,
                authtoken: user.token,
            }));
            if (postContent && postContent.status) { setFiles([]); setTitle(""); setShowPostSelection(false); }
            setLoading(false);
            setShowWebcam(false);
        };

        const isActivePost = !loading && (title.length > 0 || files.length > 0);
        return <div
            className="my-3 d-flex flex-column flex-fil border-top border-bottom border-primary">

            {files.length > 0 && <div className="px-2 py-1 d-flex align-items-center">
                {files.map((url, i) => {
                    const isVideo = url.raw.name.split('.')[1] === ('mp4' || '3gpp' || 'quicktime');
                    return (<React.Fragment key={i}>
                        {url.preview && !isVideo && <img src={url.preview} width="38" height="36" className={i > 0 ? "ml-1" : ""} />}
                        {url.preview && isVideo && <video className={i > 0 ? "ml-1" : ""} width="38" height="36" controls={false}>
                            <source type="video/mp4" src={url.preview} />
                        </video>}
                    </React.Fragment>)
                })}
                <div onClick={() => {
                    const _input = document.getElementById('upload-media');
                    _input && _input.click();
                }}
                    className="add-icon border border-lightGrey ml-1 cursor-pointer">+</div>
            </div>}
            <Textarea
                value={title}
                rows={files.length <= 0 ? 2 : 1}
                maxLength={256}
                onChange={handleTitleChange}
                columns={100}
                placeholder="Compose new post..."
                className={(files.length > 0 ? "py-1" : "py-3") + " lato-semibold font-12px border-0 px-2 text-lightGrey"} />

            <div className="px-2 d-flex flex-fil justify-content-end text-grey100 font-8px lato-semibold">{256 - title.length + ' Characters'}</div>

            <div style={{ flexGrow: 1 }}
                className="px-2 border-top border-primary d-flex justify-content-between align-items-center">
                <div style={{ minHeight: "53px" }} className="d-flex align-items-center">
                    <div className="upload-image-icon" onClick={(e: any) => {
                        const _input = e.target.children[0];
                        _input && _input.click();
                    }}>
                        <input accept="image/*,video/mp4,video/3gpp,video/quicktime"
                            id="upload-media"
                            name="upload-media"
                            type="file"
                            multiple={true}
                            style={{ display: "none" }}
                            onChange={handleChange} />
                    </div>
                    {/* <FontAwesomeIcon
                        onClick={() => { setShowPostSelection(!showPostSelection) }}
                        className="mr-2 cursor-pointer"
                        icon={faFileImage}
                        size="lg"
                        color={files.length > 0 ? "#F57B52" : "#A0A0A0"} />

                    {showPostSelection &&
                        <ToggleAnimate>
                            <button className="upload-image-icon" onClick={(e: any) => {
                                const _input = e.target.children[0];
                                _input && _input.click();
                            }}>
                                <input accept="image/*,video/mp4,video/3gpp,video/quicktime"
                                    id="upload-media"
                                    name="upload-media"
                                    type="file"
                                    multiple={true}
                                    style={{ display: "none" }}
                                    onChange={handleChange} />
                            </button>
                            <button className="take-picture-icon" onClick={(e: any) => {
                                setShowWebcam(true);
                            }}>
                            </button>
                        </ToggleAnimate>} */}
                </div>
                <PrimaryButton
                    borderRadius="10px"
                    isActive={isActivePost}
                    onClick={() => { isActivePost && savePost() }}
                    showLoader={loading}>
                    Post
            </PrimaryButton>
            </div>
            {showWebam && <div className="animate-in-from-bottom position-absolute bg-white w-100">
                <TakePictureWithWebcam
                    onUploadPhoto={(preview: any, file: any) => {
                        setFiles([...files, {
                            preview: preview,
                            raw: file
                        } as IUploadImage]);
                    }}
                    onClose={setShowWebcam} />
            </div>}
        </div>
    }