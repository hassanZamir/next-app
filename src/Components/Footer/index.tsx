// #region Global Imports
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { IFooter } from "./Footer";
import { StaticImage } from "@Components";
import { AccountOptionsModal } from "@Components/AccountOptionsModal";
import Router from "next/router";
import { LoginActions, NotificationActions } from "@Actions";
import { useModal } from '../Hooks';
import { NotificationPusher } from '@Services/Pusher';
// #endregion Local Imports

const Footer: React.FunctionComponent<IFooter.IProps> = ({ selected, user, onPaymentSettingsClick }): JSX.Element => {
    const dispatch = useDispatch();
    const persistState = useSelector((state: IStore) => state.persistState);
    const { notificationStats } = persistState;
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    const onLogout = () => { dispatch(LoginActions.UserLogout()); };

    const notificationSubscriptionCallback = (param: any) => {
        dispatch(NotificationActions.PusherNotificationRecieved({}));
    }

    useEffect(() => {
        dispatch(NotificationActions.GetNotificationStats({ userId: user.id }))

        if (typeof window !== "undefined" && !(window as any).Pusher) {
            const channelName = 'creators-' + user.id;
            NotificationPusher.getChannel(channelName)
                .then((channel: any) => {
                    NotificationPusher.subscribe('like', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('comment', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('subscribe', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('tip', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('message-purchase', channel, notificationSubscriptionCallback);
                    NotificationPusher.subscribe('comment-like', channel, notificationSubscriptionCallback);
                }).catch((err: any) => {
                    console.log("Error occured subscribing pusher : ", err);
                });
        }
    }, []);

    
    return <div style={{ height: "40px" }} 
        className={"footer-navigation d-flex align-items-center justify-content-between text-white bg-primary"}>
        {FooterConfig.map((config, index) => {
            return <div key={index} 
                onClick={() => { 
                    if (config.name === 'Account') {
                        toggle();
                        return;
                    } else if (config.name === 'Home') {
                        Router.push('/');
                        return;
                    } else if (config.name === 'Notification') {
                        Router.push('/notifications');
                        return;
                    } else {
                        return null
                    }
                }}
                className="cursor-pointer d-flex align-items-center justify-content-center h-100"
                style={{ width: "20%", position: 'relative' }}>
                
                <div className={"d-flex align-items-center justify-content-center " + (selected === config.name ? "highlight-footer-option" : "")}>
                    { notificationStats && config.name === 'Notification' && notificationStats.notifications_unseen_counter > 0 && 
                        <span className="notification-counter">
                        { notificationStats.notifications_unseen_counter }
                    </span>}
                    <StaticImage 
                        src={selected === config.name ? config.imageSelected.src : config.image.src} 
                        height={selected === config.name ? config.imageSelected.height : config.image.height} 
                        width={selected === config.name ? config.imageSelected.width : config.image.width} />
                </div>
                {config.name === 'Account' && 'id' in user &&  <AccountOptionsModal 
                    isShowing={isShowing} 
                    modalRef={modalRef}
                    onLogout={onLogout} 
                    onPaymentSettings={onPaymentSettingsClick} />}
            </div>
        })}
    </div>;
};


const FooterConfig = [{
    name: 'Home',
    image: {
        src: '/images/home_run_white@2x.png',
        height: '18px',
        width: '18px'
    },
    imageSelected: {
        src: '/images/home_filled_icon@2x.png',
        height: '18px',
        width: '18px'
    }
}, {
    name: 'Notification',
    image: {
        src: '/images/bell_white@2x.png',
        height: '20px',
        width: '20px'
    },
    imageSelected: {
        src: '/images/notification_filled@3x.png',
        height: '18px',
        width: '18px'
    }
}, {
    name: 'App Middle Icon',
    image: {
        src: '/images/app_middle_icon_navbar_white@2x.png',
        height: '24px',
        width: '24px'
    },
    imageSelected: {
        src: '',
        height: '18px',
        width: '18px'
    }
}, {
    name: 'Comments',
    image: {
        src: '/images/comment_white@2x.png',
        height: '20px',
        width: '20px'
    },
    imageSelected: {
        src: '',
        height: '18px',
        width: '18px'
    }
}, {
    name: 'Account',
    image: {
        src: '/images/profile_white@2x.png',
        height: '20px',
        width: '20px'
    },
    imageSelected: {
        src: '/images/profile_filled@2x.png',
        height: '18px',
        width: '18px'
    }
}];

export { Footer };
