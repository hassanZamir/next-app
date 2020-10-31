import React from "react";
import Link from "next/link";
import { BackgroundImage } from "@Components/Basic";
import { CircularImage, ParagraphText, TransparentButton } from "@Components";
import { CREATOR_PROFILE } from "@Interfaces";
import { theme } from "@Definitions/Styled/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const mediaBaseUrl = "https://venodev.blob.core.windows.net/veno-media";

export const ProfileSuggestion: React.FunctionComponent<{
    creatorProfile: CREATOR_PROFILE;
}> = ({ creatorProfile }) => {
    return (
        <Link href={"/profile/" + creatorProfile.userName}>
            <div className="position-relative my-3 cursor-pointer">
                <div
                    className="primary-border-thick border-primary"
                    style={{
                        borderRadius: "13px 13px 0px 0px",
                        border: "1.5px solid",
                    }}
                >
                    <BackgroundImage
                        src={[
                            mediaBaseUrl + "/" + creatorProfile.coverImageUrl,
                            "/images/cover_image_placeholder.jpg",
                        ]}
                        paddingBottom="17.25%"
                        borderRadius="13px 13px 0px 0px"
                        backgroundPosition="top"
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
                                    mediaBaseUrl +
                                        "/" +
                                        creatorProfile.profileImageUrl,
                                    "/images/profile_image_placeholder.jpg",
                                ]}
                                height="75px"
                                width="75px"
                                border={"2px solid " + theme.colors.primary}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="primary-border-thick border-primary"
                    style={{
                        borderRadius: "0px 0px 13px 13px",
                        border: "1.5px solid",
                        padding: "0px 15px 15px 100px",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <ParagraphText className="lato-semibold font-13px text-primary">
                                {creatorProfile.name}
                            </ParagraphText>
                            <ParagraphText className="lato-regular font-8px text-primary">
                                {creatorProfile.followersCount + " Followers"}
                            </ParagraphText>
                        </div>
                        <Link href={"/profile/" + creatorProfile.userName}>
                            <a>
                                <TransparentButton
                                    borderRadius="4px"
                                    padding="0px 15px !important"
                                    className="mt-2 mr-2 lato-semibold font-13px border-primary"
                                >
                                    <span className="mr-2">Follow</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </TransparentButton>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    );
};
