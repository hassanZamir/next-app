import { ISettingsPage, UserCreatorProfileModel, USER_CREATOR_PROFILE, USER_SESSION } from "@Interfaces";
import { SettingsActions, CreatorProfileActions } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import {
    ParagraphText,
    LoadingSpinner,
    CircularImage,
    PrimaryButton,
    StaticImage,
    FormComponent,
    LabelInput,
    SelectInput,
    TransparentButton,
} from "@Components";
import { BackgroundImage, Textarea, LinkText } from "@Components/Basic";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { theme } from "@Definitions/Styled";
import {
    SETTING_EDIT_PROFILE,
    SETTING_ACCOUNT_SETTINGS,
    SETTING_MESSAGE_SETTINGS,
    SETTING_NOTIFICATION_SETTINGS,
    SETTING_SECURITY_AND_PRIVACY_SETTINGS,
} from "config/SettingsConfigrator";
import Switch from "react-switch";
import { ResetPasswordModal } from "../Modals/ResetPasswordModal";
import { DeleteCardModal } from "../Modals/DeleteCardModal";
import { useModal } from "../Hooks";
import { useToasts } from "react-toast-notifications";
import { ICCBillConstants } from "@Constants";
import { ProfileSettings } from "./ProfileSettings";

const SettingsWrapper: React.FunctionComponent<{
    user: USER_SESSION;
    userCreatorProfile: USER_CREATOR_PROFILE;
    locationslist: any;
    isLoading: boolean;
}> = ({
    user,
    userCreatorProfile,
    locationslist,
    isLoading: _isLoading,
}) => {
        const { addToast } = useToasts();
        const [editProfile, setEditProfile] = useState(true);
        const [accountSettings, setAccountSettings] = useState(false);
        const [messageSettings, setMessageSettings] = useState(false);
        const [notificationSettings, setNotificationSettings] = useState(false);
        const [securityAndPrivacySettings, setSecurityAndPrivacySettings] = useState(false);
        const [loading, setLoading] = useState(_isLoading);
        const [enableSubmit, setEnableSubmit] = useState(false);
        const modalRef = useRef<HTMLDivElement>(null);
        const { isShowing, toggle } = useModal(modalRef);
        const [resetPasswordModal, setResetPasswordModal] = useState(false);
        const [deleteCardModal, setDeleteCardModal] = useState(false);
        const [currentPassword, setCurrentPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [changeUsername, setChangeUsername] = useState(false);
        const [changePassword, setChangePassword] = useState(false);
        const [triggerValidation, setTriggerValidation] = useState(false);
        const [pushNotifiaction, setPushNotification] = useState(false);
        const [emailNotification, setEmailNotification] = useState(false);
        const [nomad, setNomad] = useState(false);
        const [enableComments, setEnableComments] = useState(false);
        const [showNumberFollowing, setShowNumberFollowing] = useState(false);
        const [publicFriendsList, setPublicFriendsList] = useState(false);
        const [inputs, setInputs] = useState<any>({});

        const dispatch = useDispatch();

        const deleteCardClick = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            setDeleteCardModal(true);
            setResetPasswordModal(false);
            toggle();
        };

        useEffect(() => {
            if (currentPassword && newPassword && confirmPassword) {
                setChangePassword(true);
            } else {
                setChangePassword(false);
            }
        }, [currentPassword, newPassword, confirmPassword]);

        async function handleChangeUsernameSubmit(data: any) {
            console.log(data);
        }

        async function handleAccountSettingsSubmit(data: any) {
            console.log(data);
            // if (
            //     data.currentpassword &&
            //     data.newpassword &&
            //     data.confirmnewpassword
            // ) {
            //     const params = {
            //         oldPassword: data.currentpassword,
            //         newPassword: data.newpassword,
            //         authToken: "",
            //     };
            // dispatch(LoginActions.ChangePasswordFromSettings(params));
            // }
        }

        const selectListType = (e: any) => {
            if (e.target.name === SETTING_EDIT_PROFILE) {
                setEditProfile(true);
                setAccountSettings(false);
                setMessageSettings(false);
                setNotificationSettings(false);
                setSecurityAndPrivacySettings(false);
            } else if (e.target.name === SETTING_ACCOUNT_SETTINGS) {
                setAccountSettings(true);
                setEditProfile(false);
                setMessageSettings(false);
                setNotificationSettings(false);
                setSecurityAndPrivacySettings(false);
            } else if (e.target.name === SETTING_MESSAGE_SETTINGS) {
                setEditProfile(false);
                setAccountSettings(false);
                setMessageSettings(true);
                setNotificationSettings(false);
                setSecurityAndPrivacySettings(false);
            } else if (e.target.name === SETTING_NOTIFICATION_SETTINGS) {
                setMessageSettings(false);
                setEditProfile(false);
                setAccountSettings(false);
                setNotificationSettings(true);
                setSecurityAndPrivacySettings(false);
            } else if (e.target.name === SETTING_SECURITY_AND_PRIVACY_SETTINGS) {
                setNotificationSettings(false);
                setMessageSettings(false);
                setEditProfile(false);
                setAccountSettings(false);
                setSecurityAndPrivacySettings(true);
            }
        };

        const togglePushNotification = (e: any) => {
            if (pushNotifiaction) {
                setPushNotification(false);
            } else {
                setPushNotification(true);
            }
        };

        const toggleEmailNotification = (e: any) => {
            if (emailNotification) {
                setEmailNotification(false);
            } else {
                setEmailNotification(true);
            }
        };

        const toggleNomad = (e: any) => {
            if (nomad) {
                setNomad(false);
            } else {
                setNomad(true);
            }
        };

        const toggleEnableComments = (e: any) => {
            if (enableComments) {
                setEnableComments(false);
            } else {
                setEnableComments(true);
            }
        };

        const toggleShowNumberFollowing = (e: any) => {
            if (showNumberFollowing) {
                setShowNumberFollowing(false);
            } else {
                setShowNumberFollowing(true);
            }
        };

        const togglePublicFriendsList = (e: any) => {
            if (publicFriendsList) {
                setPublicFriendsList(false);
            } else {
                setPublicFriendsList(true);
            }
        };

        const handleSubmit = async (e: any) => {
            // console.log("Invoked => handleSubmit", e);
        }

        return (
            <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between border-top border-bottom topnav">
                    {resetPasswordModal && (
                        <ResetPasswordModal
                            isShowing={isShowing}
                            modalRef={modalRef}
                        />
                    )}
                    {deleteCardModal && (
                        <DeleteCardModal
                            isShowing={isShowing}
                            modalRef={modalRef}
                            userId={user.id}
                            toggle={toggle}
                        />
                    )}
                    <div className={editProfile ? "p-2 active" : "p-2 "}>
                        {editProfile ? (
                            <StaticImage
                                src="/images/outline-edit-24px@2x.png"
                                top="109px"
                                left="31px"
                                width="24px"
                                height="24px"
                                name="editProfile"
                                onClick={e => selectListType(e)}
                            />
                        ) : (
                                <StaticImage
                                    src="/images/outline-edit-24px@2x.png"
                                    top="109px"
                                    left="31px"
                                    width="24px"
                                    height="24px"
                                    name="editProfile"
                                    onClick={(e: any) => {
                                        selectListType(e);
                                    }}
                                />
                            )}
                    </div>
                    <div className={accountSettings ? "p-2 active" : "p-2 "}>
                        {accountSettings ? (
                            <StaticImage
                                src="/images/baseline-account_circle-24px.png"
                                top="90px"
                                left="31px"
                                width="24px"
                                height="24px"
                                name="accountSettings"
                                onClick={(e: any) => {
                                    selectListType(e);
                                }}
                            />
                        ) : (
                                <StaticImage
                                    src="/images/outline-person-24px@2x.png"
                                    top="90px"
                                    left="31px"
                                    width="24px"
                                    height="24px"
                                    name="accountSettings"
                                    onClick={(e: any) => {
                                        selectListType(e);
                                    }}
                                />
                            )}
                    </div>
                    <div className={messageSettings ? "p-2 active" : "p-2 "}>
                        {messageSettings ? (
                            <StaticImage
                                src="/images/baseline-feedback-24px.png"
                                top="90px"
                                left="31px"
                                width="24px"
                                height="24px"
                                name="messageSettings"
                                onClick={e => selectListType(e)}
                            />
                        ) : (
                                <StaticImage
                                    src="/images/baseline-chat_bubble_outline-24px@2x.png"
                                    top="90px"
                                    left="31px"
                                    width="24px"
                                    height="24px"
                                    name="messageSettings"
                                    onClick={(e: any) => {
                                        selectListType(e);
                                    }}
                                />
                            )}
                    </div>
                    <div className={notificationSettings ? "p-2 active" : "p-2 "}>
                        {notificationSettings ? (
                            <StaticImage
                                src="/images/Notification Filled.png"
                                top="90px"
                                left="31px"
                                width="20px"
                                height="20px"
                                name="notificationSettings"
                                onClick={e => selectListType(e)}
                            />
                        ) : (
                                <StaticImage
                                    src="/images/Notification Filled.png"
                                    top="90px"
                                    left="31px"
                                    width="20px"
                                    height="20px"
                                    name="notificationSettings"
                                    onClick={(e: any) => {
                                        selectListType(e);
                                    }}
                                />
                            )}
                    </div>
                    <div className={securityAndPrivacySettings ? "p-2 active" : "p-2 "}>
                        {securityAndPrivacySettings ? (
                            <StaticImage
                                src="/images/Group 292.png"
                                top="90px"
                                left="31px"
                                width="24px"
                                height="24px"
                                name="securityAndPrivacySettings"
                                onClick={e => selectListType(e)}
                            />
                        ) : (
                                <StaticImage
                                    src="/images/Group 292.png"
                                    top="90px"
                                    left="31px"
                                    width="24px"
                                    height="24px"
                                    name="securityAndPrivacySettings"
                                    onClick={(e: any) => {
                                        selectListType(e);
                                    }}
                                />
                            )}
                    </div>
                </div>

                {editProfile && <ProfileSettings user={user} />}
                {accountSettings && <React.Fragment>
                    <ParagraphText className="font-12px text-primary pl-2">
                        Account Settings
                    </ParagraphText>
                    <div className="d-flex justify-content-center border-top">
                        <div className="py-2" style={{ width: "300px" }}>
                            <FormComponent
                                onSubmit={handleAccountSettingsSubmit}
                                defaultValues={userCreatorProfile}
                                submitActive
                                submitSuccess={false}
                            >
                                <LabelInput
                                    type="text"
                                    labelText="Username"
                                    name="userName"
                                // value={username}
                                // onChange={(e: any) =>
                                //     handleUsernameChange(e)
                                // }
                                // validationRules={{
                                //     required: {
                                //         value: true,
                                //         message: "Username is required",
                                //     },
                                // }}
                                />
                                <div className="pl-4 change-username-btn">
                                    <TransparentButton
                                        borderRadius="4px"
                                        padding="5px 23px !important"
                                        className="mt-2 lato-semibold font-8px border-primary bg-primary text-white"
                                        isActive={changeUsername}
                                        type="submit"
                                    // onClick={e => {
                                    //     toggleTipModal(e);
                                    // }}
                                    >
                                        <span>Change Username</span>
                                    </TransparentButton>
                                </div>
                            </FormComponent>
                            <FormComponent
                                onSubmit={handleChangeUsernameSubmit}
                                submitActive
                                submitSuccess={false}
                            >
                                <LabelInput
                                    type="password"
                                    labelText="Password"
                                    name="currentpassword"
                                    wrapperClass="mb-3"
                                // value={currentPassword}
                                // onChange={(e: any) =>
                                //     handleCurrectPasswordChange(e)
                                // }
                                // validationRules={{
                                //     required: {
                                //         value: true,
                                //         message: "Password is required",
                                //     },
                                // }}
                                />
                                {/* <div className="w-100 mb-2 text-left">
                                    <LinkText
                                        style={{ textDecoration: "underline" }}
                                        className="text-primary font-10px cursor-pointer"
                                        onClick={forgetPasswordClick}
                                    >
                                        Forgot Password?
                                    </LinkText>
                                </div> */}

                                <LabelInput
                                    type="password"
                                    labelText="New Password"
                                    name="newpassword"
                                    wrapperClass="mb-3"
                                // value={newPassword}
                                // onChange={(e: any) =>
                                //     handleNewPasswordChange(e)
                                // }
                                // validationRules={{
                                //     required: {
                                //         value: true,
                                //         message: "New Password is required",
                                //     },
                                // }}
                                />

                                <LabelInput
                                    type="password"
                                    labelText="Confirm New Password"
                                    name="confirmnewpassword"
                                // value={confirmPassword}
                                // onChange={(e: any) =>
                                //     handleConfirmPasswordChange(e)
                                // }
                                // validationRules={{
                                //     required: {
                                //         value: true,
                                //         message:
                                //             "Confirm New Password is required",
                                //     },
                                // }}
                                />

                                <div className="pl-4 change-username-btn">
                                    <TransparentButton
                                        borderRadius="4px"
                                        padding="5px 23px !important"
                                        className="mt-2 mb-2 lato-semibold font-8px border-primary bg-primary text-white"
                                        type="submit"
                                        isActive={changePassword}
                                    >
                                        <span>Update Password</span>
                                    </TransparentButton>
                                </div>

                                {/* <div
                                    className={
                                        "d-flex flex-column align-items-start mt-3 w-100"
                                    }
                                >
                                    <label className="text-primary font-13px lato-regular">
                                        Login Sessions
                                    </label>
                                    <Textarea
                                        name="loginsessions"
                                        rows={5}
                                        columns={40}
                                        maxLength={500}
                                        className="border-primary rounded w-100 font-10px text-lightGrey bio-text-area"
                                        // onChange={e => handleBioChange(e)}
                                        // value={bio}
                                    />
                                </div> */}
                                {/* <div className="w-100 mb-2 text-left">
                                    <LinkText
                                        style={{ color: "#ff6666" }}
                                        className="delete-account-btn font-10px cursor-pointer"
                                        onClick={deleteCardClick}
                                    >
                                        Delete Account
                                    </LinkText>
                                </div> */}
                            </FormComponent>
                            <div className="delete-modal-btn">
                                <PrimaryButton
                                    onClick={deleteCardClick}
                                    type="submit"
                                    className="mt-2 font-10px"
                                    isActive
                                    padding="10px 23px"
                                    borderRadius="4px"
                                >
                                    Delete Account
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </React.Fragment>}
                {notificationSettings && <React.Fragment>
                    <ParagraphText className="font-12px text-primary pl-2">
                        Notification Settings
                    </ParagraphText>
                    <div className="row no-gutters justify-content-center border-top">
                        <div style={{ width: "320px" }}>
                            <FormComponent
                                onSubmit={handleSubmit}
                                defaultValues={{}}
                                submitActive={false}
                                submitSuccess
                                triggerValidation={triggerValidation}
                            >
                                <div className="d-flex flex-row bd-highlight link-anchor">
                                    <div className="p-2 mt-4 mr-2 bd-highlight">
                                        <p className="font-11px switch-label-padding-bottom text-grey100">
                                            Push Notifications
                                        </p>
                                    </div>
                                    <div className="p-2 mt-4 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e =>
                                                    togglePushNotification(e)
                                                }
                                                checked={pushNotifiaction}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row bd-highlight mb-4 link-anchor">
                                    <div className="p-2 bd-highlight">
                                        <p className="font-11px text-grey100">
                                            E-Mail Notifications
                                        </p>
                                    </div>
                                    <div className="p-2 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e =>
                                                    toggleEmailNotification(e)
                                                }
                                                checked={emailNotification}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="w-100 mt-1 text-left">
                                    {" "}
                                    <h6 className="heading-styles text-grey100">
                                        Receive Notifications About:
                                    </h6>
                                </div>
                                <div className="flex mt-2 d-flex container">
                                    <div className="round pl-3">
                                        <input type="checkbox" id="checkbox1" />
                                        <label htmlFor="checkbox1" />
                                    </div>
                                    <div>
                                        <p className="font-10px text-grey100">
                                            New Campaign Contribution
                                        </p>
                                    </div>
                                </div>
                                <div className="flex d-flex container">
                                    <div className="round pl-3">
                                        <input type="checkbox" id="checkbox2" />
                                        <label htmlFor="checkbox2" />
                                    </div>
                                    <div>
                                        <p className="font-10px text-grey100">
                                            New Like
                                        </p>
                                    </div>
                                </div>
                                <div className="flex d-flex container">
                                    <div className="round pl-3">
                                        <input type="checkbox" id="checkbox3" />
                                        <label htmlFor="checkbox3" />
                                    </div>
                                    <div>
                                        <p className="font-10px text-grey100">
                                            New Comment
                                        </p>
                                    </div>
                                </div>
                                <div className="flex d-flex container">
                                    <div className="round pl-3">
                                        <input type="checkbox" id="checkbox4" />
                                        <label htmlFor="checkbox4" />
                                    </div>
                                    <div>
                                        <p className="font-10px text-grey100">
                                            New Follower
                                        </p>
                                    </div>
                                </div>
                                <div className="flex d-flex container mb-5">
                                    <div className="round pl-3">
                                        <input type="checkbox" id="checkbox5" />
                                        <label htmlFor="checkbox5" />
                                    </div>
                                    <div>
                                        <p className="font-10px text-grey100">
                                            New Tip
                                        </p>
                                    </div>
                                </div>

                                <PrimaryButton
                                    onClick={deleteCardClick}
                                    type="submit"
                                    className="mt-2 font-10px"
                                    isActive
                                    padding="10px 23px"
                                    borderRadius="4px"
                                >
                                    Save Changes
                                </PrimaryButton>
                            </FormComponent>
                        </div>
                    </div>
                </React.Fragment>}
                {securityAndPrivacySettings && <React.Fragment>
                    <ParagraphText className="font-12px text-primary pl-2">
                        Security and Privacy Settings
                    </ParagraphText>
                    <div className="row no-gutters justify-content-center border-top">
                        <div style={{ width: "320px" }}>
                            <FormComponent
                                onSubmit={handleSubmit}
                                defaultValues={{}}
                                submitActive={false}
                                submitSuccess
                                triggerValidation={triggerValidation}
                            >
                                <div className="w-100 mt-1 mr-4 text-left">
                                    {" "}
                                    <h6 className="heading-styles text-grey100">
                                        Profile Privacy{" "}
                                    </h6>
                                </div>
                                <div className="d-flex flex-row bd-highlight link-anchor">
                                    <div className="p-2 bd-highlight switch-settings">
                                        <span className="font-11px text-grey100">
                                            Nomad (Completely Private)
                                        </span>
                                    </div>
                                    <div className="p-2 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e => toggleNomad(e)}
                                                checked={nomad}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row bd-highlight">
                                    <div className="p-2 bd-highlight switch-settings">
                                        <span className="font-11px text-grey100">
                                            Enable Comments
                                        </span>
                                    </div>
                                    <div className="p-2 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e =>
                                                    toggleEnableComments(e)
                                                }
                                                checked={enableComments}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row bd-highlight ">
                                    <div className="p-2 bd-highlight switch-settings">
                                        <span className="font-11px text-grey100">
                                            Show Number of `Following`
                                        </span>
                                    </div>
                                    <div className="p-2 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e =>
                                                    toggleShowNumberFollowing(e)
                                                }
                                                checked={showNumberFollowing}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row bd-highlight">
                                    <div className="p-2 bd-highlight switch-settings">
                                        <span className="font-11px text-grey100">
                                            Public Friend's List
                                        </span>
                                    </div>
                                    <div className="p-2 ml-5 bd-highlight align-self-center">
                                        <span className="ml-4 mr-4 pl-5">
                                            <Switch
                                                onChange={e =>
                                                    togglePublicFriendsList(e)
                                                }
                                                checked={publicFriendsList}
                                                onColor="#f57c52"
                                                offColor="#707070"
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                height={20}
                                                width={38}
                                                handleDiameter={14}
                                            />
                                        </span>
                                    </div>
                                </div>
                                {/* <div className="row no-gutters justify-content-center border-top"> */}
                                <div id="line">
                                    <hr />
                                </div>
                                <div className="row no-gutters w-100 mt-1 mr-4 text-left">
                                    {" "}
                                    <h6 className="heading-styles text-grey100">
                                        IP and Geo Blocking{" "}
                                    </h6>
                                </div>
                                <SelectInput
                                    type={["text"]}
                                    labelText="By Country"
                                    name={["location"]}
                                    options={[locationslist.countries]}
                                    wrapperClass="mt-1 text-grey100"
                                    validationRules={[
                                        {
                                            required:
                                                "Country selection is required.",
                                        },
                                    ]}
                                />
                                {/* </div> */}
                                <div id="line">
                                    <hr />
                                </div>
                                <div className="row no-gutters w-100 mt-1 mr-4 text-left">
                                    {" "}
                                    <h6 className="heading-styles text-grey100">
                                        Watermarks{" "}
                                    </h6>
                                    <div className="flex mt-2 d-flex container">
                                        <div className="round pl-3">
                                            <input
                                                type="checkbox"
                                                id="checkbox1"
                                            />
                                            <label htmlFor="checkbox1" />
                                        </div>
                                        <div>
                                            <p className="font-10px text-grey100">
                                                Watermark my Videos
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex d-flex container">
                                        <div className="round pl-3">
                                            <input
                                                type="checkbox"
                                                id="checkbox2"
                                            />
                                            <label htmlFor="checkbox2" />
                                        </div>
                                        <div>
                                            <p className="font-10px text-grey100">
                                                Watermark my Images
                                            </p>
                                        </div>
                                    </div>
                                    {/* <LabelInput
                                        type="text"
                                        labelText="Custom Watermark"
                                        name="username"
                                        wrapperClass="ml-3"
                                    /> */}
                                </div>
                                <PrimaryButton
                                    onClick={deleteCardClick}
                                    type="submit"
                                    className="mt-2 mb-2 font-10px"
                                    isActive
                                    padding="10px 23px"
                                    borderRadius="4px"
                                >
                                    Save Changes
                                </PrimaryButton>
                            </FormComponent>
                        </div>
                    </div>
                </React.Fragment>}
            </div >
        );
    };

export const SettingsComponent: React.FunctionComponent<{
    user: USER_SESSION;
    locationslist: any;
}> = ({ user, locationslist }) => {
    const { addToast } = useToasts();

    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile);
    const { httpStatus } = useSelector((state: IStore) => state.settings);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        // On every post request make the loader block user actions
        // until the reducer updates the loading status after api call
        if (httpStatus == "awaiting") {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [httpStatus]);


    return (
        <div className="d-flex flex-column align-items-center flex-fill body-background">
            <ParagraphText className="text-primary font-25px">
                Settings
            </ParagraphText>
            <SettingsWrapper
                userCreatorProfile={userCreatorProfile}
                user={user}
                locationslist={locationslist}
                isLoading={loading}
            />
            {/* {success.length > 0 && (
                <div className="d-flex flex-column">
                    {success.map((msg: string, i: number) => {
                        // return (
                        //     <div className="text-success font-12px text-center">
                        //         {msg}
                        //     </div>
                        // );

                    })}
                </div>
            )} */}
            {/* {errors.length > 0 && (
                <div className="d-flex flex-column">
                    {errors.map((error: string, i: number) => {
                        // return (
                        //     <div className="text-danger font-12px text-center">
                        //         {error}
                        //     </div>
                        // );
                    })}
                </div>
            )} */}
        </div >
    );
}