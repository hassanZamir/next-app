import { ISettingsPage, UserCreatorProfileModel, USER_CREATOR_PROFILE, USER_SESSION } from "@Interfaces";
import { SettingsActions, CreatorProfileActions, LoginActions } from "@Actions";
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
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
        const [changeUsernameStatus, setChangeUsernameStatus] = useState({});
        const [changePasswordStatus, setChangePasswordStatus] = useState(false);
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

        async function handleChangeUsernameSubmit(data: any) {
            dispatch(LoginActions.ChangeUsername({
                userId: user.id,
                newUsername: data.userName,
                authtoken: user.token
            }));
        }

        async function handleAccountSettingsSubmit(data: any) {
            if (
                data.currentpassword &&
                data.newpassword &&
                data.confirmnewpassword
                && data.newpassword == data.confirmnewpassword
            ) {
                dispatch(LoginActions.ChangePasswordFromSettings({
                    userId: user.id,
                    oldPassword: data.currentpassword,
                    newPassword: data.newpassword,
                    authtoken: user.token,
                }));
            }
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

        async function validateUserName(inputValue: { [key: string]: string }) {
            const key = Object.keys(inputValue)[0];
            const params = {
                [key]: inputValue[key],
                account_created: false,
            };
            return LoginActions.checkUserNameAvailability(params);
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
                            user={user}
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
                    <div className="d-flex border-top">
                        {false && <div className="w-100 d-flex flex-column" style={{
                            paddingTop: "30%",
                            paddingBottom: "30%"
                        }}>
                            <div
                                style={{ flex: 1 }}
                                className="w-100 h-100 d-flex align-items-center justify-content-center"
                            >
                                <LoadingSpinner size="3x" />
                            </div>
                            <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                                Please wait ..
                            </ParagraphText>
                        </div>}
                        {true && <div className="d-flex flex-column py-2 px-4 w-100" style={{}}>
                            <FormComponent
                                onSubmit={handleChangeUsernameSubmit}
                                defaultValues={userCreatorProfile}
                                submitActive
                                submitSuccess={false}
                            >
                                <LabelInput
                                    type="text"
                                    labelText="Username"
                                    name="userName"
                                    validationRules={{
                                        required: "Username is required",
                                        validate: async (value: string) => {
                                            var regex = /^[a-zA-Z0-9_-]+$/;
                                            if (!regex.test(value))
                                                return "Username can contain alphanumeric characters, _ or -";

                                            if (value == userCreatorProfile.userName) return "Username is already taken.";

                                            const helper = await validateUserName({
                                                username: value,
                                            });
                                            const response = await helper();
                                            if (
                                                response &&
                                                response.errors.filter(error => {
                                                    return (
                                                        error &&
                                                        error.field === "username"
                                                    );
                                                }).length > 0
                                            )
                                                return "Username is already taken.";

                                            return true;
                                        },
                                    }}
                                />
                                <div className="w-100 d-flex flex-row justify-content-center">
                                    <PrimaryButton
                                        borderRadius="4px"
                                        padding=""
                                        className="mt-2 lato-semibold font-12px bg-primary-gradient text-white"
                                        isActive={true}
                                        type="submit"
                                    >
                                        <span>Change Username</span>
                                    </PrimaryButton>
                                </div>
                            </FormComponent>
                            <div className="mt-5">
                                <FormComponent
                                    onSubmit={handleAccountSettingsSubmit}
                                    submitActive
                                    submitSuccess={false}
                                >
                                    <LabelInput
                                        type="password"
                                        labelText="Current Password"
                                        name="currentpassword"
                                        wrapperClass="mb-3"
                                        validationRules={{ required: { value: true, message: "Current Password is required" } }}
                                    />

                                    <LabelInput
                                        type="password"
                                        labelText="New Password"
                                        name="newpassword"
                                        wrapperClass="mb-3"
                                        validationRules={{ required: { value: true, message: "New Password is required" } }}
                                    />

                                    <LabelInput
                                        type="password"
                                        labelText="Confirm New Password"
                                        name="confirmnewpassword"
                                        validationRules={{ required: { value: true, message: "Confirm New Password is required" } }}
                                    />

                                    <div className="">
                                        <PrimaryButton
                                            borderRadius="4px"
                                            padding=""
                                            className="mt-2 mb-2 lato-semibold font-12px bg-primary-gradient text-white"
                                            type="submit"
                                            isActive={true}
                                        >
                                            <span>Change Password</span>
                                        </PrimaryButton>
                                    </div>

                                    {/* <div className="d-flex flex-column align-items-start mt-3 w-100">
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

                            </div>
                            <div className="mt-5 d-flex justify-content-center">
                                <span></span>
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
                        </div>}
                    </div>
                </React.Fragment>}
                {
                    messageSettings && <React.Fragment>
                        <ParagraphText className="font-12px text-primary pl-2">
                            Message Settings
                        </ParagraphText>
                        <div className="row no-gutters justify-content-center border-top">
                            <div className="w-100 d-flex flex-column" style={{
                                paddingTop: "30%",
                                paddingBottom: "30%"
                            }}>
                                <div
                                    style={{ flex: 1 }}
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                >
                                    {/* <LoadingSpinner size="3x" /> */}
                                </div>
                                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                                    Coming Soon!
                            </ParagraphText>
                            </div>
                        </div>
                    </React.Fragment>
                }
                {
                    notificationSettings && <React.Fragment>
                        <ParagraphText className="font-12px text-primary pl-2">
                            Notification Settings
                        </ParagraphText>
                        <div className="row no-gutters justify-content-center border-top">
                            <div className="w-100 d-flex flex-column" style={{
                                paddingTop: "30%",
                                paddingBottom: "30%"
                            }}>
                                <div
                                    style={{ flex: 1 }}
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                >
                                    {/* <LoadingSpinner size="3x" /> */}
                                </div>
                                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                                    Coming Soon!
                            </ParagraphText>
                            </div>
                            {false && <div style={{ width: "320px" }}>
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
                            </div>}
                        </div>
                    </React.Fragment>
                }
                {
                    securityAndPrivacySettings && <React.Fragment>
                        <ParagraphText className="font-12px text-primary pl-2">
                            Security and Privacy Settings
                        </ParagraphText>
                        <div className="row no-gutters border-top">
                            {true && <div className="w-100 d-flex flex-column" style={{
                                paddingTop: "30%",
                                paddingBottom: "30%"
                            }}>
                                <div
                                    style={{ flex: 1 }}
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                >
                                    {/* <LoadingSpinner size="3x" /> */}
                                </div>
                                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                                    Coming Soon!
                                </ParagraphText>
                            </div>}
                            {false && <div className="d-flex flex-column py-2 px-4 w-100">
                                <FormComponent
                                    onSubmit={handleSubmit}
                                    defaultValues={{}}
                                    submitActive={false}
                                    submitSuccess
                                    triggerValidation={triggerValidation}
                                >
                                    <div className="w-100 mt-1 mr-4 text-left">
                                        <h6 className="heading-styles text-grey100">
                                            Profile Privacy{" "}
                                        </h6>
                                    </div>
                                    <div className="d-flex row w-100 py-2 justify-content-between">
                                        <div className="text-left">Nomad (Completely Private)</div>
                                        <div className="ml-2 text-right"><Switch
                                            onChange={e => toggleNomad(e)}
                                            checked={nomad}
                                            onColor="#f57c52"
                                            offColor="#707070"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={20}
                                            width={38}
                                            handleDiameter={14}
                                            name="nomad"
                                        /></div>
                                    </div>
                                    <div className="d-flex row w-100 py-2 justify-content-between">
                                        <div className="text-left">Disable Comments</div>
                                        <div className="ml-2 text-right"><Switch
                                            onChange={e => toggleNomad(e)}
                                            checked={enableComments}
                                            onColor="#f57c52"
                                            offColor="#707070"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={20}
                                            width={38}
                                            handleDiameter={14}
                                            name="comments"
                                        /></div>
                                    </div>
                                    <div className="d-flex row w-100 py-2 justify-content-between">
                                        <div className="text-left">Show Followers</div>
                                        <div className="ml-2 text-right"><Switch
                                            onChange={e => toggleNomad(e)}
                                            checked={showNumberFollowing}
                                            onColor="#f57c52"
                                            offColor="#707070"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={20}
                                            width={38}
                                            handleDiameter={14}
                                            name="comments"
                                        /></div>
                                    </div>
                                    <div className="d-flex row w-100 py-2 justify-content-between">
                                        <div className="text-left">Show Followers</div>
                                        <div className="ml-2 text-right"><Switch
                                            onChange={e => toggleNomad(e)}
                                            checked={showNumberFollowing}
                                            onColor="#f57c52"
                                            offColor="#707070"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={20}
                                            width={38}
                                            handleDiameter={14}
                                            name="comments"
                                        /></div>
                                    </div>

                                    <div className="row no-gutters w-100 mt-3 mr-4 text-left">
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
                                    <div className="row no-gutters w-100 mt-3 mr-4 text-left">
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
                            </div>}
                        </div>
                    </React.Fragment>
                }
            </div >
        );
    };

export const SettingsComponent: React.FunctionComponent<{
    user: USER_SESSION;
    locationslist: any;
}> = ({ user, locationslist }) => {

    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile);
    const { httpStatus } = useSelector((state: IStore) => state.settings);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const dispatch = useDispatch();

    const { addToast } = useToasts();
    const action = router.query["action"] as string;
    useEffect(() => {
        // console.log(action);
        if (action == "upgrade")
            addToast("Please upload profile and cover image before upgrading to creator account.", { appearance: "info" });
    }, []);


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
        <div className="d-flex flex-column flex-fill">
            <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
                <FontAwesomeIcon
                    onClick={() => router.push("/")}
                    className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            </div>
            <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Statements</ParagraphText>

            <SettingsWrapper
                userCreatorProfile={userCreatorProfile}
                user={user}
                locationslist={locationslist}
                isLoading={loading}
            />

            {/* {!user.isCreator &&  <div className="mt-5 d-flex flex-column align-items-center">
                <ParagraphText className="text-primary font-14px align-self-center">
                    Upgrade your account to post content and earn
                    </ParagraphText>
                <Link href="/account-upgrade">
                    <PrimaryButton isActive={true}>Become a creator</PrimaryButton>
                </Link>
            </div>} */}
        </div>
    );
}