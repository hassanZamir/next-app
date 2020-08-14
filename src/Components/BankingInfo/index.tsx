import { USER_SESSION } from "@Interfaces";
import { BankingInfoActions } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import { ParagraphText, LoadingSpinner, CircularImage, PrimaryButton } from "@Components";
import { BackgroundImage } from "@Components/Basic";
import React, { useEffect, useState } from "react";
import { theme } from "@Definitions/Styled";

interface IUploadImage {
    key: string,
    preview: "", 
    raw: {
        name: string,
        size: number,
        type: string,
        webkitRelativePath: ""
    }
}

const UploadProfileImages: React.FunctionComponent<{user: USER_SESSION; coverImageUrl: string, profileImageUrl: string }> 
    = ({ user, coverImageUrl, profileImageUrl }) => {

    const [files, setFiles] = useState<IUploadImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [stateCoverImageUrl, setStateCoverImageUrl] = useState(coverImageUrl);
    const [stateProfileImageUrl, setStateProfileImageUrl] = useState(profileImageUrl);
    const dispatch = useDispatch();

    const handleImageChange = (e: any, key: string) => {
        debugger;
        if (e.target.files.length) {
            const uploadedFiles = [];
            
            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    key: key,
                    preview: URL.createObjectURL(e.target.files[i]),
                    raw: e.target.files[i]
                } as IUploadImage);
            }
            const filteredFiles = files.filter((f) => {
                return f.key !== key;
            });
            setFiles([...filteredFiles, ...uploadedFiles]);
            if (key === 'coverImageUrl') setStateCoverImageUrl(uploadedFiles[0].preview);
            if (key === 'profileImageUrl') setStateProfileImageUrl(uploadedFiles[0].preview);
        }
    }

    const saveProfileImages = async () => {
        const payload: any = [];
        files.forEach((file) => {
            const formData = new FormData();
            formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
            payload.push({ 
               key: file.key, 
               url: formData
            });
        });
        setLoading(true);
        await dispatch(BankingInfoActions.UploadProfileImages({ 
            media_url: payload, 
            username: user.username
        }));
        setLoading(false);
    }


    return (<div className="d-flex flex-column w-100 px-4">
        <div className="bg-warningRed my-4 px-4 py-2 text-white font-12px w-100" style={{ borderRadius: "16px" }}>
            <div>Please fill the following fields:</div>
            <ul style={{ paddingLeft: "20px", margin: "0px" }}>
                <li>Cover Image</li>
                <li>Display Image</li>
            </ul>
        </div>
        <ParagraphText className="font-12px text-primary pl-2 mb-2">Edit Profile</ParagraphText>
        
        <div className="pt-2 border-top border-bottom" style={{ paddingBottom: "25.25%" }}>
            <div className="position-relative">
                <BackgroundImage src={[stateCoverImageUrl, "/images/cover_image_placeholder.jpg"]} 
                    paddingBottom={"17.25%"} 
                    backgroundPosition="top" />
                <div style={{ position: "absolute", top: "50%", left: "25px" }}>
                    <CircularImage src={[stateProfileImageUrl, '/images/profile_image_placeholder.jpg']} 
                        height="72px" 
                        width="72px" 
                        border={"1px solid " + theme.colors.primary} />
                </div>
                <div className="font-10px" 
                    onClick={() => { }}
                    style={{ position: "absolute", top: "50%", right: "25px" }}>
                    
                    <button className="bg-primary text-white" onClick={(e: any)=> { 
                            const _input = e.target.children[0];                        
                            _input && _input.click();
                        }}>
                            Upload Cover Photo
                            <input accept="image/*" 
                                id="upload-cover-image"
                                name="upload-cover-image"
                                type="file" 
                                style={{ display: "none" }} 
                                onChange={(e)=> { handleImageChange(e, 'coverImageUrl') }} />
                    </button>
                </div>
                <div className="font-10px" style={{ position: "absolute", top: "110%", right: "25px" }}>
                    <button className="bg-primary text-white" onClick={(e: any)=> { 
                            const _input = e.target.children[0];                        
                            _input && _input.click();
                        }}>
                            Upload Display Image
                            <input accept="image/*" 
                                id="upload-profile-image"
                                name="upload-profile-image"
                                type="file" 
                                style={{ display: "none" }} 
                                onChange={(e)=> { handleImageChange(e, 'profileImageUrl') }} />
                    </button>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <PrimaryButton onClick={saveProfileImages} 
                className="mt-2" isActive={files.length > 0} 
                padding="4px 8px" borderRadius="4px"
                showLoader={loading}>
                    Save Changes
            </PrimaryButton>
        </div>
    </div>);
}

const UploadPersonalInformation: React.FunctionComponent<{}> 
    = ({ }) => {

    return (<div>Personal Information</div>);
}

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION; }> 
    = ({ user }) => {
    
    const dispatch = useDispatch();
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const { creatorProfile, errors, showPersonalInformation } = bankingInfo;

    useEffect(() => {
        const params = { username: user.username };
        dispatch(BankingInfoActions.GetCreatorProfile(params));
    }, []);

    return <div className="d-flex flex-column align-items-center flex-fill h-100 body-background">
        <ParagraphText className="text-primary font-25px">Banking</ParagraphText>
        {!('name' in creatorProfile) && errors.length <= 0 && <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <LoadingSpinner size="3x"/>
        </div>}
        {!('name' in creatorProfile) && errors.length > 0 && <div className="d-flex flex-column">
            {errors.map((error: string, i: number) => {
                return <div className="text-danger font-12px">{ error }</div>
            })}</div>
        }
        {'name' in creatorProfile && errors.length <= 0 && <React.Fragment>
            {!showPersonalInformation ? <UploadProfileImages 
                coverImageUrl={creatorProfile.coverImageUrl}
                profileImageUrl={creatorProfile.profileImageUrl} 
                user={user} /> 
                : <UploadPersonalInformation />}
        </React.Fragment>}

        {/* <PrimaryButton isActive={true} onClick={()=> { dispatch(PaymentActions.OnBecomeCreator({ userName: user.username })) }}>
            Become Creator
        </PrimaryButton> */}
    </div>
}