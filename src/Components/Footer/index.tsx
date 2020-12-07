// #region Global Imports
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IFooter } from "./Footer";
import { StaticImage } from "@Components";
import Router, { useRouter } from "next/router";
import { LoginActions, NotificationActions, MessagesActions, BankingInfoActions, CreatorProfileActions } from "@Actions";
import { NotificationPusher } from '@Services/Pusher';
import { NOTIFICATION, CONVERSATION_RESPONSE, MESSAGE_LIST_ITEM, USER_CREATOR_PROFILE } from "@Interfaces";

// #endregion Local Imports

const Footer: React.FunctionComponent<IFooter.IProps> = ({
    selected,
    session,
    onMenuClick,
}): JSX.Element => {
    const dispatch = useDispatch();
    const persistState = useSelector((state: IStore) => state.persistState);
    const { notificationStats } = persistState;
    const router = useRouter();


    const notificationSubscriptionCallback = (param: NOTIFICATION) => {
        if (window.location.href.includes("notifications"))
            dispatch(NotificationActions.AddPusherNotificationToList(param));

        dispatch(NotificationActions.PusherNotificationRecieved({}));
    };

    const newMessageRecievedCallBack = (message: CONVERSATION_RESPONSE) => {
        if (message.senderId !== session.id)
            dispatch(MessagesActions.MessageRecieved(message));
    }

    const newConversationRecievedCallBack = (conversation: MESSAGE_LIST_ITEM) => {
        dispatch(MessagesActions.NewConversationRecieved(conversation));
        dispatch(NotificationActions.GetNotificationStats({ userId: session.id, authtoken: session.token }));
    }

    const verificationStatusCallback = (userCreatorProfile: USER_CREATOR_PROFILE) => {
        dispatch(CreatorProfileActions.VerficationStatusUpdated(userCreatorProfile));
    }

    const followingPaymentCallback = (payload: any) => {
        //console.log("followingPaymentCallback: ", payload);
        if (payload.status == true)
            dispatch(LoginActions.TokenVerify({
                session: session
            }))
        setTimeout(() => {
            router.push(`/profile/${payload.creatorUsername}?f=${btoa(payload.status)}&p=${btoa(payload)}`);
        }, 3000);
    }

    useEffect(() => {
        dispatch(NotificationActions.GetNotificationStats({ userId: session.id, authtoken: session.token }));

        if (typeof window !== "undefined" && !(window as any).Pusher) {
            const channelName = 'creators-' + session.id;
            NotificationPusher.getChannel(channelName, { cluster: 'ap4', encrypted: true })
                .then((channel: any) => {
                    NotificationPusher.subscribe('like', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('comment', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('subscribe', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('tip', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('message-purchase', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('comment-like', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('message-purchase', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('new-message', channel, newMessageRecievedCallBack);
                    // NotificationPusher.subscribe('new-conversation', channel, newConversationRecievedCallBack);
                    NotificationPusher.subscribe('conversation-update', channel, newConversationRecievedCallBack);
                    NotificationPusher.subscribe('verification-update', channel, verificationStatusCallback)
                    NotificationPusher.subscribe('follow-payment-update', channel, followingPaymentCallback)
                }).catch((err: any) => {
                    console.log("Error occured while subscribing to push events: ", err);
                });
        }
    }, []);

    return <div style={{ height: "40px" }}
        className={"footer-navigation d-flex align-items-center justify-content-between text-white bg-primary"}>
        {FooterConfig.map((config, index) => {
            return <div key={index}
                onClick={() => {
                    if (config.name === 'Account') {
                        onMenuClick();
                        return;
                    } else if (config.name === 'Home') {
                        Router.push('/');
                        return;
                    } else if (config.name === 'Notification') {
                        Router.push('/notifications');
                        return;
                    } else if (config.name === 'Messages') {
                        Router.push('/message');
                        return;
                    } else if (config.name === 'App Middle Icon') {
                        Router.push('/suggestions');
                        return;
                    } else {
                        return null
                    }
                }}
                className="cursor-pointer d-flex align-items-center justify-content-center h-100"
                style={{ width: "20%", position: 'relative' }}>

                <div className={"d-flex align-items-center justify-content-center " + (selected === config.name ? "highlight-footer-option" : "")}>
                    {notificationStats && config.name === 'Notification' && notificationStats.notifications_unseen_counter > 0 &&
                        <span className="notification-counter">
                            {notificationStats.notifications_unseen_counter}
                        </span>}
                    {notificationStats && config.name === 'Messages' && notificationStats.conversation_unseen_counter > 0 &&
                        <span className="notification-counter">
                            {notificationStats.conversation_unseen_counter}
                        </span>}
                    <StaticImage
                        src={selected === config.name ? config.imageSelected.src : config.image.src}
                        height={selected === config.name ? config.imageSelected.height : config.image.height}
                        width={selected === config.name ? config.imageSelected.width : config.image.width} />
                </div>
            </div>
        })}
    </div>;
};

const FooterConfig = [
    {
        name: "Home",
        image: {
            src: "/images/home_run_white@2x.png",
            height: "18px",
            width: "18px",
        },
        imageSelected: {
            src: "/images/home_filled_icon@2x.png",
            height: "18px",
            width: "18px",
        },
    },
    {
        name: "Notification",
        image: {
            src: "/images/bell_white@2x.png",
            height: "20px",
            width: "20px",
        },
        imageSelected: {
            src: "/images/notification_filled@3x.png",
            height: "18px",
            width: "18px",
        },
    },
    {
        name: "App Middle Icon",
        image: {
            src: "/images/app_middle_icon_navbar_white@2x.png",
            height: "24px",
            width: "24px",
        },
        imageSelected: {
            src: '/images/app_middle_icon_navbar@2x.png',
            height: '18px',
            width: '18px'
        }
    },
    {
        name: 'Messages',
        image: {
            src: '/images/comment_white@2x.png',
            height: '20px',
            width: '20px'
        },
        imageSelected: {
            src: '/images/messages_filled@2x.png',
            height: '18px',
            width: '18px'
        }
    },
    {
        name: "Account",
        image: {
            src: "/images/profile_white@2x.png",
            height: "20px",
            width: "20px",
        },
        imageSelected: {
            src: "/images/profile_filled@2x.png",
            height: "18px",
            width: "18px",
        },
    },
];

export { Footer };
