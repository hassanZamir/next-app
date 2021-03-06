import React, { useState } from "react";
import { BackgroundImage } from "@Components/Basic";
import { CircularImage, ParagraphText, PrimaryButton } from "@Components";
import { CREATOR_PROFILE, USER_SESSION } from "@Interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEnvelope,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { MessagesActions } from "@Actions";
import { useToasts } from "react-toast-notifications";

const mediaBaseUrl = process.env.MEDIA_BASE_URL;

export const CreatorProfile: React.FunctionComponent<{ user: USER_SESSION, isFollower: boolean; creatorProfile: CREATOR_PROFILE, onFollow: (followOrUnfolow: boolean) => void }>
    = ({ user, creatorProfile, onFollow, isFollower }) => {
        const dispatch = useDispatch();
        const { addToast } = useToasts();
        const [bioToggle, setBioToggle] = useState(false);

        const onCopyClick = () => {
            if (creatorProfile) {
                var copyText = window.location.host + "/profile/" + creatorProfile.userName;
                var textField = document.createElement('textarea');
                textField.innerText = copyText;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();

                addToast("Copied Profile Link: " + creatorProfile.userName);
            }
        };

        return (
            <React.Fragment>
                <BackgroundImage
                    src={[
                        mediaBaseUrl + "/" + creatorProfile.coverImageUrl,
                        "/images/cover_image_placeholder.png",
                    ]}
                    paddingBottom="70.25%"
                />

                <div className="position-relative">
                    <div
                        style={{
                            position: "absolute",
                            left: "1rem",
                            bottom: "-2rem",
                        }}
                    >
                        <CircularImage
                            src={[
                                mediaBaseUrl + "/" + creatorProfile.profileImageUrl,
                                "/images/profile_image_placeholder.png",
                            ]}
                            height="100px"
                            width="100px"
                        />
                    </div>
                </div>
                <div
                    className="d-flex justify-content-between w-100 px-4 pb-2"
                    style={{
                        minHeight: "100px",
                        paddingTop: "40px",
                        marginTop: "-10px",
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                        zIndex: 99,
                    }}
                >
                    <div style={{ width: "50%" }}>
                        {creatorProfile.name && (
                            <div>
                                <ParagraphText className="text-primary font-20px gibson-semibold">
                                    {creatorProfile.name}
                                </ParagraphText>
                                <ParagraphText className="text-inputText font-15px gibson-regular">
                                    {creatorProfile.location}
                                </ParagraphText>
                                <ParagraphText className="text-inputText font-15px gibson-regular">
                                    {creatorProfile.followersCount + " Followers"}
                                </ParagraphText>
                                <div className="d-flex flex-column">

                                    <div className="d-flex">
                                        <div
                                            className="d-flex cursor-pointer align-items-center"
                                            onClick={() => {
                                                setBioToggle(!bioToggle);
                                            }}
                                        >
                                            <span className="text-inputText seoge-ui-bold font-10px mr-1">
                                                {!bioToggle ? "Show Bio" : "Hide Bio"}
                                            </span>
                                            {!bioToggle && (
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    color="#78849E"
                                                    size="xs"
                                                />
                                            )}
                                            {bioToggle && (
                                                <FontAwesomeIcon
                                                    icon={faChevronUp}
                                                    color="#78849E"
                                                    size="xs"
                                                />
                                            )}
                                        </div>
                                        <div onClick={() => { onCopyClick() }}
                                            className="ml-2 cursor-pointer bg-primary-gradient d-flex align-items-center justify-content-center"
                                            style={{
                                                // right: "20px",
                                                // bottom: "80px",
                                                height: "24px",
                                                width: "24px",
                                                borderRadius: "6px"
                                            }}>
                                            <span><img src="/images/baseline-reply_all-24px.svg"></img></span>
                                        </div>
                                    </div>
                                    {bioToggle && (
                                        <span className="font-12px gibson-regular">
                                            {creatorProfile.bio}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-end" style={{ width: "50%" }}>
                        {<div>
                            {!isFollower && creatorProfile && creatorProfile.userName && !(user && user.username == creatorProfile.userName) &&
                                <PrimaryButton onClick={() => onFollow(true)} isActive={true} className="gibson-semibold font-12px">
                                    Follow for ${creatorProfile.followingFee} a month
                                </PrimaryButton>}
                            {isFollower && <div className="d-flex flex-column">
                                <PrimaryButton borderRadius="10px" isActive={true}
                                    onClick={() => onFollow(false)}
                                    className="gibson-regular font-15px">
                                    <span className="mr-2">Following</span>
                                    <FontAwesomeIcon icon={faCheck} color="white" />
                                </PrimaryButton>
                                <PrimaryButton borderRadius="10px" isActive={true} className="gibson-regular font-15px mt-2" onClick={() => {
                                    dispatch(MessagesActions.CreateConversation({
                                        userName: user.username,
                                        recipientUsername: creatorProfile.userName,
                                        authtoken: user.token,
                                    }));
                                }}>
                                    <span className="mr-2">Message</span>
                                    <FontAwesomeIcon icon={faEnvelope} color="white" />
                                </PrimaryButton>
                            </div>}
                        </div>}
                        {creatorProfile && creatorProfile.name && user && user.name && creatorProfile.name === user.name && <div>
                            <div className="d-flex flex-column">
                                <PrimaryButton borderRadius="10px" isActive={true} className="gibson-regular font-15px mt-2">
                                    <Link href="/settings"><span className="mr-2">Edit Profile</span></Link>
                                </PrimaryButton>
                            </div>
                        </div>}
                    </div>
                </div>
            </React.Fragment>
        );
    };
