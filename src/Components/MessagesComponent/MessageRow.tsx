// #region Global Imports
import React from "react";
// #endregion Global Imports

// #region Local Imports
import { CurrentTimeDifference }from "@Services/Time";
import { BackgroundImage } from "@Components/Basic";
import { MESSAGE_LIST_ITEM } from "@Interfaces";
import { theme } from "@Definitions/Styled";
// #endregion Local Imports

export const MessageRow: React.FunctionComponent<{ message: MESSAGE_LIST_ITEM }> 
    = ({ message }) => {
    
    return (<div onClick={()=>{ }} 
        style={{ 
            marginBottom: "1px",
            borderBottom: "1px solid " + theme.colors.grey300
        }}
        className="hover-bg cursor-pointer d-flex mx-4 py-4">
        <div style={{ minHeight: "62px", minWidth: "62px" }}>
            <BackgroundImage 
                paddingBottom="100%"
                borderRadius="12px" 
                src={[message.profileImageUrl ,'/images/profile_image_placeholder.jpg']} />
        </div>
        <div className="d-flex flex-column px-3 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <div className="gibson-semibold font-16px text-primary">
                    { message.name }
                </div>
                <div className="position-relative">
                    <div className="font-15px gibson-semibold text-inputText ">{ CurrentTimeDifference(message.lastVisited, 'short') }</div>
                    {message.participantSeenStatus && <div className="circle position-absolute" style={{ 
                        background: theme.colors.purple, 
                        width: "8px", 
                        height: "8px",
                        right: "-20px",
                        top: "5px"
                    }}></div>}
                </div>
            </div>
            <div className={"font-12px " + (message.participantSeenStatus ? "gibson-regular text-inputText" : "gibson-semibold text-primary")}>
                {message.message}
            </div>
        </div>
    </div>);
}
