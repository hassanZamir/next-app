import { USER_SESSION } from "@Interfaces";
import { BankingInfoActions, CreatorProfileActions } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import {
    ParagraphText,
    LoadingSpinner,
    CircularImage,
    PrimaryButton,
} from "@Components";
import { UploadPersonalInformation } from "@Components/BankingInfo/UploadPersonalInformation";
import { BackgroundImage } from "@Components/Basic";
import React, { useEffect, useState } from "react";
import { theme } from "@Definitions/Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Router, { useRouter } from "next/router";

interface IUploadImage {
    key: string;
    preview: "";
    raw: {
        name: string;
        size: number;
        type: string;
        webkitRelativePath: "";
    };
}

const UploadProfileImages: React.FunctionComponent<{
    user: USER_SESSION;
    coverImageUrl: string;
    profileImageUrl: string;
}> = ({ user, coverImageUrl, profileImageUrl }) => {
    const [files, setFiles] = useState<IUploadImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [stateCoverImageUrl, setStateCoverImageUrl] = useState(coverImageUrl);
    const [stateProfileImageUrl, setStateProfileImageUrl] = useState(
        profileImageUrl
    );
    const dispatch = useDispatch();

    const handleImageChange = (e: any, key: string) => {
        if (e.target.files.length) {
            const uploadedFiles = [];

            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    key: key,
                    preview: URL.createObjectURL(e.target.files[i]),
                    raw: e.target.files[i],
                } as IUploadImage);
            }
            const filteredFiles = files.filter(f => {
                return f.key !== key;
            });
            setFiles([...filteredFiles, ...uploadedFiles]);
            if (key === "coverImageUrl")
                setStateCoverImageUrl(uploadedFiles[0].preview);
            if (key === "profileImageUrl")
                setStateProfileImageUrl(uploadedFiles[0].preview);
        }
    };

    const saveProfileImages = async () => {
        const payload: any = [];
        files.forEach(file => {
            const formData = new FormData();
            formData.append(
                "mediaFiles",
                new Blob([file.raw as any]),
                file.raw.name
            );
            payload.push({
                key: file.key,
                url: formData,
            });
        });
        setLoading(true);
        await dispatch(
            BankingInfoActions.UploadProfileImages({
                media_url: {},
                username: user.username,
            })
        );
        setLoading(false);
    };

    return (
        <div className="d-flex flex-column w-100 px-4">
            <div
                className="bg-warningRed my-4 px-4 py-2 text-white font-12px w-100"
                style={{ borderRadius: "16px" }}
            >
                <div>Please fill the following fields:</div>
                <ul style={{ paddingLeft: "20px", margin: "0px" }}>
                    <li>Cover Image</li>
                    <li>Display Image</li>
                </ul>
            </div>
            <ParagraphText className="font-12px text-primary pl-2 mb-2">
                Edit Profile
            </ParagraphText>

            <div
                className="pt-2 border-top border-bottom"
                style={{ paddingBottom: "25.25%" }}
            >
                <div className="position-relative">
                    <BackgroundImage
                        src={[
                            stateCoverImageUrl,
                            "/images/cover_image_placeholder.jpg",
                        ]}
                        paddingBottom={"17.25%"}
                        backgroundPosition="top"
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "25px",
                        }}
                    >
                        <CircularImage
                            src={[
                                stateProfileImageUrl,
                                "/images/profile_image_placeholder.jpg",
                            ]}
                            height="72px"
                            width="72px"
                            border={"1px solid " + theme.colors.primary}
                        />
                    </div>
                    <div
                        className="font-10px"
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "25px",
                        }}
                    >
                        <button
                            className="bg-primary text-white"
                            onClick={(e: any) => {
                                const _input = e.target.children[0];
                                _input && _input.click();
                            }}
                        >
                            Upload Cover Photo
                            <input
                                accept="image/*"
                                id="upload-cover-image"
                                name="upload-cover-image"
                                type="file"
                                style={{ display: "none" }}
                                onChange={e => {
                                    handleImageChange(e, "coverImageUrl");
                                }}
                            />
                        </button>
                    </div>
                    <div
                        className="font-10px"
                        style={{
                            position: "absolute",
                            top: "110%",
                            right: "25px",
                        }}
                    >
                        <button
                            className="bg-primary text-white"
                            onClick={(e: any) => {
                                const _input = e.target.children[0];
                                _input && _input.click();
                            }}
                        >
                            Upload Display Image
                            <input
                                accept="image/*"
                                id="upload-profile-image"
                                name="upload-profile-image"
                                type="file"
                                style={{ display: "none" }}
                                onChange={e => {
                                    handleImageChange(e, "profileImageUrl");
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <PrimaryButton
                    onClick={saveProfileImages}
                    className="mt-2"
                    isActive={files.length > 0}
                    padding="4px 8px"
                    borderRadius="4px"
                    showLoader={loading}
                >
                    Save Changes
                </PrimaryButton>
            </div>
        </div>
    );
};

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile)
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const {
        errors,
        showPersonalInformation,
        success,
        defaultPersonalInformation,
    } = bankingInfo;
    const [loading, setLoading] = useState(true);
    const [loadEmbedId, setLoadEmbedId] = useState(true);

    const truliooServiceUrl = process.env.TRULIOO_MS_URL;
    const truliooFeKey = process.env.TRULIOO_FE_KEY;
    const apiUrl = `${process.env.API_URL}/api/accounts/${user.id}/upgrade`;

    useEffect(() => {
        success.splice(0, success.length);
        errors.splice(0, errors.length);

        if (userCreatorProfile)//&& defaultPersonalInformation)
            setLoading(false);

        if (userCreatorProfile.creatorProfileVerified)
            success.push("Account upgraded successfully.");
        else
            errors.push("Account Verification: PENDING");

        if (userCreatorProfile.idVerified && userCreatorProfile.docsVerified) {
            setLoadEmbedId(false);
            router.push("/");
        }
        else
            setLoadEmbedId(true);

        // if (userCreatorProfile.creatorProfileVerified) {

        // }
        // else {

        //     if (userCreatorProfile.idVerified)
        //         success.push("Identity Verification: DONE");
        //     else
        //         errors.push("Identity Verification: PENDING");

        //     if (userCreatorProfile.docsVerified)
        //         success.push("Document Verification: DONE");
        //     else
        //         errors.push("Document Verification: PENDING");
        // }
    }, [userCreatorProfile]);//, defaultPersonalInformation]);

    useEffect(() => {
        const params = {
            userid: user.id,
            authtoken: user.token,
        };
        dispatch(CreatorProfileActions.GetUserCreatorProfile(params));
    }, []);

    return <React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.push("/")}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Account Upgrade</ParagraphText>

        <div className="d-flex flex-column align-items-center flex-fill body-background">
            {!userCreatorProfile ? (
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
            ) : (
                    <React.Fragment>
                        {!userCreatorProfile.creatorProfileVerified && loadEmbedId && <iframe
                            name={`${user.token}#${apiUrl}#${truliooFeKey}`}
                            frameBorder="0px"
                            width="90%"
                            height="100%"
                            src={truliooServiceUrl}>
                        </iframe>}
                    </React.Fragment>
                )}
            {success.length > 0 && (
                <div className="d-flex flex-column">
                    {success.map((msg: string, i: number) => {
                        return (
                            <div className="text-success font-12px text-center">
                                {msg}
                            </div>
                        );
                    })}
                </div>
            )}
            {errors.length > 0 && (
                <div className="d-flex flex-column">
                    {errors.map((error: string, i: number) => {
                        return (
                            <div className="text-danger font-12px text-center">
                                {error}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    </React.Fragment>
};
