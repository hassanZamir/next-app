// #region Global Imports
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt, faUserPlus, faDollarSign, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt as faRegularCommentAlt} from '@fortawesome/free-regular-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { Tabs, Tab } from "@Components/Basic";
import { LoadingSpinner } from "@Components";
import { Notification } from "@Components/NotificationComponent/Notification";
import { NotificationTabs } from "@Components/NotificationComponent/NotificationTabs";
import { USER_SESSION, NOTIFICATION } from "@Interfaces";
import { NotificationActions } from "@Actions";
import { ParagraphText } from "@Components/ParagraphText";
// #endregion Local Imports

export const NotificationCreator: React.FunctionComponent<{ user: USER_SESSION, scrolledToBottom: boolean }> 
    = ({ user, scrolledToBottom }) => {
    const notificationState = useSelector((state: IStore) => state.notification);
    const { notifications } = notificationState;
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSetectedTab] = useState(0);
    const dispatch = useDispatch();
    
    const currentTabKey = NotificationTabs[selectedTab].key;

    useEffect(() => {
        if (!notifications[NotificationTabs[0].key].values.length) {
            (async () => {
                setLoading(true);
                await getNotifications(0);
                setLoading(false);
            })();
        }
    }, []);

    useEffect(() => {
        if (scrolledToBottom) getNotifications(selectedTab);
    }, [scrolledToBottom]);

    const getNotifications = async (index: number) => {
        if (notifications[NotificationTabs[index].key] !== 'promotions') {
            const params = { 
                userId: user.id, 
                type: NotificationTabs[index].type, 
                key: NotificationTabs[index].key,
                page: notifications[NotificationTabs[index].key].paginationNo
            };
            await dispatch(NotificationActions.GetNotification(params));
        }
    }

    const changeTab = async (index: number) => {
        setSetectedTab(index);

        if (notifications[NotificationTabs[index].key].emptyPaginationNo 
            > notifications[NotificationTabs[index].key].paginationNo) {
            
            if (!notifications[NotificationTabs[index].key].values.length) {   
                setLoading(true);
                await getNotifications(index);
                setLoading(false);
            }
        }
    }

    return (<div className="d-flex flex-column" 
            style={{ flex: 1 }}>
            
            {user.isCreator && <Tabs
                borderBottom="1px solid #A0A0A0">
                    
                <Tab active={selectedTab === 0} 
                    onClick={() => changeTab(0) } 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <img width="24px"
                        height="24px" 
                        src={selectedTab === 0 ? "/images/all_notif@3x.png" : "/images/all_notif_white@3x.png"} />
                </Tab>
                <Tab active={selectedTab === 1} 
                    onClick={() => changeTab(1)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <FontAwesomeIcon icon={faHeart} 
                        color={selectedTab === 1 ? "#F57B52" : "#A0A0A0"} size="lg" />
                </Tab>
                <Tab active={selectedTab === 2} 
                    onClick={() => changeTab(2)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <FontAwesomeIcon icon={selectedTab === 2 ? faCommentAlt : faRegularCommentAlt} 
                        color="#F57B52" size="lg" />
                </Tab>
                <Tab active={selectedTab === 3} 
                    onClick={() => changeTab(3)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <FontAwesomeIcon icon={faUserPlus} 
                        color="#F57B52" size="lg" />
                </Tab>
                <Tab active={selectedTab === 4} 
                    onClick={() => changeTab(4)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <FontAwesomeIcon icon={faDollarSign} 
                        color={selectedTab === 4 ? "#F57B52" : "#A0A0A0"} size="lg" />
                </Tab>
                <Tab active={selectedTab === 5} 
                    onClick={() => changeTab(5)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <FontAwesomeIcon icon={faBullhorn} 
                        color={selectedTab === 5 ? "#F57B52" : "#A0A0A0"} size="lg" />
                </Tab>
                <Tab active={selectedTab === 6} 
                    onClick={() => changeTab(6)} 
                    padding="0px"
                    width="14%"
                    borderRight={false}
                    showBorderBottom={true}>
                    <img width="28px"
                        height="28px" 
                        src={selectedTab === 6 ? "/images/price_tag_filled@3x.png" : "/images/price_outlined@3x.png"} />
                </Tab>
            </Tabs>}
            <ParagraphText className="my-2 font-12px text-primary px-2">
                {NotificationTabs[selectedTab].name}
            </ParagraphText>
            
            {currentTabKey !== 'promotions' ? <div className="d-flex align-items-center justify-content-center"
                style={{ flex: 1 }}>
                <LoadingSpinner size="3x" showLoading={loading}>
                    <div className="d-flex flex-column h-100 w-100 px-2">
                        {notifications[currentTabKey].values.length > 0 ? notifications[currentTabKey].values.map((notification: NOTIFICATION, i: number) => {
                            return <Notification 
                                        notification={notification} 
                                        key={i} 
                                        user={user} />
                        }) : <div className="text-darkGrey lato-simibold">
                            You don't have any Notification in this section
                        </div>}
                    </div>
                </LoadingSpinner>
            </div> : <div className="px-2 text-darkGrey lato-simibold">
                This feature is not availaible yet
            </div>}
        </div>);
}
