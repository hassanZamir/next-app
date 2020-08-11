import React from "react";
import { BackgroundImage } from "@Components/Basic";
import { CircularImage, ParagraphText } from "@Components";
import { CREATOR_PROFILE } from "@Interfaces";
import { theme } from "@Definitions/Styled/theme";

export const CreatorProfileRules: React.FunctionComponent<{creatorProfile: CREATOR_PROFILE}> = ({ creatorProfile }) => {
    return <div className="position-relative">
        <BackgroundImage 
            src={[creatorProfile.coverImageUrl, "/images/cover_image_placeholder.jpg"]} 
            paddingBottom="26.25%" 
            borderRadius="16px 16px 0px 0px" />
        <div className="position-relative">
            <div style={{ position: "absolute", left: "1rem", bottom: "-2rem" }}>
                <CircularImage 
                    src={[creatorProfile.profileImageUrl, '/images/profile_image_placeholder.jpg']} 
                    height="75px" 
                    width="75px" 
                    border={"2px solid " + theme.colors.primary} />
            </div>
            <div style={{ position: "absolute", left: "6rem", bottom: "-2rem" }}>
                <ParagraphText className="font-17px text-primary gibson-regular">{creatorProfile.name}</ParagraphText>
            </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-100 px-4 py-2" style={{ marginTop: "2rem" }}>
            <ParagraphText className="gibson-semibold font-17px text-primary">Whats Included:</ParagraphText>
            <ul>
                <li className="text-primary">
                    <ParagraphText className="text-lightGrey font-11px">Access to creator content.</ParagraphText>
                </li>
                <li className="text-primary">
                    <ParagraphText className="text-lightGrey font-11px">Exclusive 1-on-1 communication with your favourite charector.</ParagraphText>
                </li>
                <li className="text-primary">
                    <ParagraphText className="text-lightGrey font-11px">Cancel subscription at any time.</ParagraphText>
                </li>
                <li className="text-primary">
                    <ParagraphText className="text-lightGrey font-11px">This profile may contain media only suitable for ages 18 and over.</ParagraphText>
                </li>
            </ul>
        </div>
    </div>
}