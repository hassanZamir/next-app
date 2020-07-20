import React, { useState } from "react";
import { BackgroundImage } from "@Components/Basic";
import { CircularImage, ParagraphText, PrimaryButton } from "@Components";
import { CREATOR_PROFILE } from "@Interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEnvelope, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const CreatorProfile: React.FunctionComponent<{isFollower: boolean; creatorProfile: CREATOR_PROFILE, onFollow: (followOrUnfolow: boolean)=>void}> 
    = ({ creatorProfile, onFollow, isFollower }) => {
    
    const [bioToggle, setBioToggle] = useState(false);
    return <React.Fragment>
        <BackgroundImage src={creatorProfile.coverImageUrl} paddingBottom="56.25%" />
        <div className="position-relative">
            <div style={{ position: "absolute", left: "1rem", bottom: "-2rem" }}>
                <CircularImage src={creatorProfile.profileImageUrl} height="100px" width="100px" />
            </div>
        </div>
        <div className="d-flex justify-content-between w-100 px-4 py-2" style={{ marginTop: "2rem", minHeight: "100px" }}>
            <div style={{ width: "50%"}}>
                {creatorProfile.name && <div>
                    <ParagraphText className="text-primary font-20px gibson-semibold">{creatorProfile.name}</ParagraphText>
                    <ParagraphText className="text-inputText font-15px gibson-regular">{creatorProfile.location}</ParagraphText>
                    <ParagraphText className="text-inputText font-15px gibson-regular">{creatorProfile.followersCount + " Followers"}</ParagraphText>
                    <div className="d-flex flex-column">
                        <div className="d-flex cursor-pointer align-items-center" onClick={() => {setBioToggle(!bioToggle)}}>
                            <span className="text-inputText seoge-ui-bold font-10px mr-1">{!bioToggle ? 'Show Bio' : 'Hide Bio'}</span>
                            {!bioToggle && <FontAwesomeIcon icon={faChevronDown} color="#78849E" size="xs"/>}
                            {bioToggle && <FontAwesomeIcon icon={faChevronUp} color="#78849E" size="xs"/>} 
                        </div>
                        {bioToggle && <span className="font-12px gibson-regular">{ creatorProfile.bio }</span>}
                    </div>
                </div>}
            </div>
            <div className="d-flex justify-content-end" style={{ width: "50%" }}>
                <div>
                    {!isFollower && <PrimaryButton onClick={() => onFollow(true)} isActive={true} className="gibson-semibold font-12px">Follow for $9.99 a month</PrimaryButton>}
                    {isFollower && <div className="d-flex flex-column">
                        <PrimaryButton borderRadius="10px" isActive={true} onClick={() => onFollow(false)}
                            className="gibson-regular font-15px">
                            <span className="mr-2">Following</span>
                            <FontAwesomeIcon icon={faCheck} color="white" />
                        </PrimaryButton>
                        <PrimaryButton borderRadius="10px" isActive={true} className="gibson-regular font-15px mt-2">
                            <span className="mr-2">Message</span>
                            <FontAwesomeIcon icon={faEnvelope} color="white" />
                        </PrimaryButton>
                    </div>}
                </div>
            </div>
        </div>
    </React.Fragment>
}