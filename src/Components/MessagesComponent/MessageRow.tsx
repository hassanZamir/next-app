// #region Global Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faCommentAlt, faUserPlus, faDollarSign, faBullhorn } from '@fortawesome/free-solid-svg-icons';
// import { faCommentAlt as faRegularCommentAlt} from '@fortawesome/free-regular-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { CurrentTimeDifference }from "@Services/Time";
import { LoadingSpinner } from "@Components";
import { BackgroundImage } from "@Components/Basic";
import { USER_SESSION } from "@Interfaces";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const MessageRow: React.FunctionComponent<{ message: any }> 
    = ({ message }) => {
    
    console.log("message", message);
    return (<div onClick={()=>{ }} 
        style={{ 
            marginBottom: "1px", 
            marginLeft: "-1.5rem",
            marginRight: "-1.5rem"
        }}
        className="hover-bg cursor-pointer d-flex px-4 py-3">
        <div style={{ minHeight: "50px", minWidth: "50px" }}>
            <BackgroundImage 
                paddingBottom="100%"
                borderRadius="12px" 
                src={[message.profileImageUrl ,'/images/profile_image_placeholder.jpg']} />
        </div>
        <div className="d-flex flex-column px-3 justify-content-between w-100">
            <div className="d-flex justify-content-between align-items-center">
                <div className="gibson-semibold font-16px text-primary">
                    { message.name }
                </div>
                <div className="font-14px gibson-regular text-inputText">
                    { CurrentTimeDifference(message.timeStamp) }
                </div>
            </div>
            <div className={"font-14px gibson-regular " + (message.seen ? "text-inputText" : "text-darkGrey")}>
                {message.text}
            </div>
        </div>
    </div>);
}
