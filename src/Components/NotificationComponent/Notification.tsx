// #region Global Imports
import React from "react";
import { useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { NOTIFICATION, USER_SESSION } from "@Interfaces";
import { BackgroundImage } from "@Components/Basic";
import { CurrentTimeDifference }from "@Services/Time";
import { NotificationTabs } from "@Components/NotificationComponent/NotificationTabs";
import { NotificationActions } from "@Actions";
import Router from "next/router";
// #endregion Local Imports

export const Notification: React.FunctionComponent<{ notification: NOTIFICATION, user: USER_SESSION }> 
    = ({ notification, user }) => {
    
    const dispatch = useDispatch();

    const getRedirectUrl = (notification: NOTIFICATION) => {
        if (notification.type === 2 || notification.type === 3 || notification.type === 4 || notification.type === 6)
            return "/profile/" + user.username + "/status/" + notification.contentId; 
        else
            return "";
    }

    const onNotificationClick = async (notification: NOTIFICATION) => {
        const param = {
            notifications: [{ id: notification.id }]
        }
        if (!notification.seen)
            await dispatch(NotificationActions.SeenNotification(param));
        
        const redirectUrl = getRedirectUrl(notification);
        if (redirectUrl) {
            Router.push(redirectUrl, redirectUrl);
        }
    }

    return (<div onClick={()=>{ onNotificationClick(notification) }} 
        style={{ 
            marginBottom: "1px", 
            marginLeft: "-1.5rem",
            marginRight: "-1.5rem"
        }}
        className={"hover-bg cursor-pointer d-flex px-4 py-3 " + (notification.seen ? "" : "bg-primary")}>
            <div style={{ minHeight: "50px", minWidth: "50px" }}>
                <BackgroundImage 
                    paddingBottom="100%"
                    borderRadius="12px" 
                    src={[notification.profileImageUrl ,'/images/profile_image_placeholder.jpg']} />
            </div>
            <div className="d-flex flex-column px-3 justify-content-between w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div className={"gibson-semibold font-16px " + (notification.seen ? "text-primary" : "text-offWhite" )}>
                        { notification.name }
                    </div>
                    <div className={"font-14px gibson-regular " + (notification.seen ? "text-primary" : "text-white")}>
                        { CurrentTimeDifference(notification.timeStamp) }
                    </div>
                </div>
                <div className={"font-14px gibson-regular " + (notification.seen ? "text-darkGrey" : "text-white")}>
                    { 
                        notification.type === NotificationTabs[1].type 
                            && <span>
                                    Liked your <span className={(notification.seen ? "text-primary" : "text-darkGrey" )}>post</span>
                            </span>
                    }
                    {
                        notification.type === NotificationTabs[2].type 
                            && <div className="d-flex flex-column">
                                    <span>
                                        Commented on your <span className={(notification.seen ? "text-primary" : "text-darkGrey" )}>post:</span>
                                </span>
                                <span style={{ fontStyle: "italic" }}>"{notification.commentText}"</span>
                            </div>
                    }
                    {
                        notification.type === NotificationTabs[3].type 
                            && <span>Subscribed to your profile!</span>
                    }
                    {
                        notification.type === NotificationTabs[4].type 
                            && <span>Paid you a tip of ${notification.tipAmount}</span>
                    }
                    {/* {
                        notification.type === NotificationTabs[5].type 
                            && <span>has purchased your <span className={(notification.seen ? "text-primary" : "text-darkGrey" )}>
                                message
                            </span> for $ {notification.tipAmount}!
                        </span>
                    } */}
                    {
                        notification.type === 6 
                            &&  <div className="d-flex flex-column">
                                <span>
                                    has liked your <span className={(notification.seen ? "text-primary" : "text-darkGrey" )}>comment:</span>
                            </span>
                            <span style={{ fontStyle: "italic" }}>"{notification.commentText}"</span>
                        </div>
                    }
                </div>
            </div>
        </div>);
}
