// #region Global Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IProfilePage, ISettingsPage, USER_SESSION } from "@Interfaces";
import { CircularImage, FormComponent, LabelInput, LoadingSpinner, ParagraphText, PrimaryButton, SelectInput } from '@Components';
import { CreatorProfileActions, SettingsActions } from "@Actions";
import { useToasts } from "react-toast-notifications";
import { BackgroundImage, Textarea } from "@Components/Basic";
import { theme } from "@Definitions/Styled";
import { ICCBillConstants } from "@Constants";
import { Locations } from "@Constants"
import { useRef } from "react";
// #endregion Local Imports

export interface IUploadImage {
    key: string;
    preview: "";
    raw: {
        name: string;
        size: number;
        type: string;
        webkitRelativePath: "";
    };
}

export const ProfileSettings: React.FunctionComponent<{
    user: USER_SESSION;
}> = ({ user }) => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const bioRef = useRef<HTMLTextAreaElement>(null);

    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile);
    const { httpStatus } = useSelector((state: IStore) => state.settings);
    const [files, setFiles] = useState<IUploadImage[]>([]);
    const [inputs, setInputs] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [userCreatorProfileData, setUserCreatorProfileData] = useState({
        name: "",
        bio: "",
        followingFee: 0,
        location: "",
    });
    const [stateCoverImageUrl, setStateCoverImageUrl] = useState(userCreatorProfile.coverImageUrl);
    const [stateProfileImageUrl, setStateProfileImageUrl] = useState(userCreatorProfile.profileImageUrl);


    useEffect(() => {
        if (!userCreatorProfile.name) {
            dispatch(SettingsActions.UpdateHttpStatus("awaiting"));
            const params: IProfilePage.Actions.IGetUserCreatorProfilePayload = {
                userid: user.id,
                authtoken: user.token,
            };
            setLoading(true);
            dispatch(CreatorProfileActions.GetUserCreatorProfile(params));
        } else {
            setUserCreatorProfileData({
                name: userCreatorProfile.name ?? "",
                bio: userCreatorProfile.bio ?? "",
                followingFee: userCreatorProfile.followingFee ?? 0,
                location: userCreatorProfile.location ?? "",
            });
            setStateCoverImageUrl(process.env.MEDIA_BASE_URL + "/" + userCreatorProfile.coverImageUrl ?? '');
            setStateProfileImageUrl(process.env.MEDIA_BASE_URL + "/" + userCreatorProfile.profileImageUrl ?? '');
        }
    }, [userCreatorProfile]);

    useEffect(() => {
        if (httpStatus != "awaiting")
            setLoading(false);
    }, [userCreatorProfile])

    /// ---- Edit Profile ---- ///
    const handleEditProfileSubmit = async (e: any) => {
        const bio = inputs.bio ?? "";
        const name = e.name ?? "";
        const followingFee = e.followingFee ?? 0;
        const location = e.location ?? "";
        const feeMinimumThreshold = ICCBillConstants.MinimumLimit;

        // console.log("Settings-formData: ", name, followingFee, bio, location);

        if (user.isCreator && (!stateProfileImageUrl || !stateCoverImageUrl))
            addToast("Please upload both cover and profile images!", { appearance: "warning" });
        else if (user.isCreator && followingFee < feeMinimumThreshold)
            addToast(`Following fee must be $${feeMinimumThreshold} minimum!`, { appearance: "warning" });
        else if (location == "")
            addToast(`Please select any location to continue!`, { appearance: "warning" });
        else {
            setLoading(true);
            const params: ISettingsPage.Actions.IPostUploadSettingsProfileImagesPayload = {
                media_url: files ?? null,
                profileImageUrl: "", // will be set in action after uploading media
                coverImageUrl: "", // will be set in action after uploading media
                userId: user.id,
                followingFee,
                bio,
                location,
                authtoken: user.token,
                name: name
            }
            dispatch(
                SettingsActions.PostEditProfileSettings(params)
            );
            setFiles([]);
            setInputs({});
        }
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs((inputs: any) => ({ ...inputs, [name]: value }));
    };

    const handleImageChange = (e: any, key: string) => {
        if (e.target.files.length) {
            const uploadedFiles = [];

            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    key,
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

    return <React.Fragment>
        <ParagraphText className="font-12px text-primary pl-2">
            Edit Profile
        </ParagraphText>
        <div
            className="pt-2 border-bottom"
            style={{ paddingBottom: "13.25%" }}
        >
            <div className="position-relative">
                <BackgroundImage
                    src={[
                        stateCoverImageUrl,
                        "/images/cover_image_placeholder.png",
                    ]}
                    paddingBottom="17.25%"
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
                            "/images/profile_image_placeholder.png",
                        ]}
                        height="72px"
                        width="72px"
                        border={`1px solid ${theme.colors.primary}`}
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
                                handleImageChange(
                                    e,
                                    "coverImageUrl"
                                );
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
                        Upload Profile Photo
                                    <input
                            accept="image/*"
                            id="upload-profile-image"
                            name="upload-profile-image"
                            type="file"
                            style={{ display: "none" }}
                            onChange={e => {
                                handleImageChange(
                                    e,
                                    "profileImageUrl"
                                );
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
        {loading && <div className="w-100 d-flex flex-column">
            <div
                style={{ flex: 1 }}
                className="w-100 h-100 d-flex align-items-center justify-content-center"
            >
                <LoadingSpinner size="3x" />
            </div>
            <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                Please wait ...!
            </ParagraphText>
        </div>}
        {!loading && userCreatorProfileData.name && <div className="d-flex justify-content-center ">
            <div className="py-2" style={{ width: "300px" }}>
                {userCreatorProfileData.name && <FormComponent
                    onSubmit={handleEditProfileSubmit}
                    defaultValues={userCreatorProfileData}
                    submitActive={true}
                    submitSuccess={false}

                >
                    <LabelInput
                        type="text"
                        labelText="Display Name"
                        name="name"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Name is Required",
                            },
                            validate: async (value: string) => {
                                var regex = /^[a-zA-Z.]{1,10}(?: [a-zA-Z]{1,10}){1,3}$/;
                                if (!regex.test(value.trim()))
                                    return "Please enter valid full name e.g. John Doe or J. Doe or John D";
                            }
                        }}
                    />
                    {user.isCreator && <LabelInput
                        wrapperClass="mt-2"
                        type="number"
                        labelText="Following Fee ($USD)"
                        name="followingFee"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Fee is required",
                            },
                            min: {
                                value: ICCBillConstants.MinimumLimit,
                                message: `Fee must be set to $${ICCBillConstants.MinimumLimit} minumim.`
                            }
                        }}
                    />}

                    <div className="d-flex flex-column align-items-start mt-3 w-100">
                        <label className="text-primary font-13px lato-regular">
                            Bio
                                        </label>
                    </div>
                    <Textarea
                        ref={bioRef}
                        defaultValue={userCreatorProfileData.bio ?? ""}
                        name="bio"
                        rows={5}
                        columns={40}
                        maxLength={500}
                        className="border-primary rounded w-100 font-10px text-lightGrey bio-text-area"
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        type={["text"]}
                        labelText="Location"
                        name={["location"]}
                        options={[Locations.countries]}
                        wrapperClass="mt-3"
                        validationRules={[
                            {
                                required:
                                    "Country selection is required.",
                            },
                        ]}
                    />
                    <PrimaryButton
                        className="mt-2"
                        isActive={true}
                        padding="4px 8px"
                        borderRadius="4px"
                        showLoader={loading}
                        type="submit"
                    >
                        Save Changes
                                </PrimaryButton>
                </FormComponent>
                }
            </div>
        </div>
        }
    </React.Fragment>
};