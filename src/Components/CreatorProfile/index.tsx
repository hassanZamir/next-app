import React from "react";
import { BackgroundImage } from "@Components/Basic";
import { CircularImage, ParagraphText, PrimaryButton } from "@Components";
import { CREATOR_PROFILE } from "@Interfaces";

export const CreatorProfile: React.FunctionComponent<{creatorProfile: CREATOR_PROFILE}> = ({ creatorProfile, ...rest }) => {
    return <React.Fragment>
        <BackgroundImage src={creatorProfile.coverImageUrl} paddingBottom="56.25%" />
        <div className="position-relative">
            <div style={{ position: "absolute", left: "1rem", bottom: "-2rem" }}>
                <CircularImage src={creatorProfile.profileImageUrl} height="100px" width="100px" />
            </div>
        </div>
        <div className="d-flex justify-content-between w-100 px-4 py-2" style={{ marginTop: "2rem" }}>
            {creatorProfile.id && <div>
                <ParagraphText className="text-primary font-20px gibson-semibold">{creatorProfile.name}</ParagraphText>
                <ParagraphText className="text-inputText font-15px gibson-regular">{creatorProfile.address}</ParagraphText>
                <ParagraphText className="text-inputText font-15px gibson-regular">{creatorProfile.totalFollowers + " Followers"}</ParagraphText>
                <div className="text-inputText seoge-ui-bold font-10px">Show Bio</div>
            </div>}
            <div>
                <PrimaryButton isActive={true} className="gibson-semibold font-9px">Follow for $9.99 a month</PrimaryButton>
            </div>
        </div>
    </React.Fragment>
}