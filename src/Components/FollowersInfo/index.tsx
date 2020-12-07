import { USER_SESSION } from "@Interfaces";
import { FollowersInfoAction } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import {
    ParagraphText,
    LoadingSpinner,
    CircularImage,
    StaticImage,
    TransparentButton,
} from "@Components";

import { BackgroundImage } from "@Components/Basic";
import React, { useEffect, useState } from "react";
import { theme } from "@Definitions/Styled";
import {
    LIST_ALL_FOLLOWERS,
    LIST_ACTIVE_FOLLOWERS,
    LIST_RESTRICTED_FOLLOWERS,
    LIST_BLOCKED_FOLLOWERS,
    TYPE_ALL_FOLLOWERS,
    TYPE_ACTIVE_FOLLOWERS,
    TYPE_RESTRICTED_FOLLOWERS,
    TYPE_BLOCKED_FOLLOWERS,
} from "config/FollowersConfigrator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronCircleDown,
    faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const mediaBaseUrl = "https://venodev.blob.core.windows.net/veno-media";

const FollowerCard: React.FunctionComponent<{
    user: USER_SESSION;
    followersList: any;
    followerType: number;
}> = ({ user, followersList, followerType }) => {
    const dispatch = useDispatch();
    const [allFollowers, setAllFollowers] = useState(true);
    const [activeFollowers, setActiveFollowers] = useState(false);
    const [blockedFollowers, setBlockedFollowers] = useState(false);
    const [restrictedFollowers, setRestrictedFollowers] = useState(false);
    const [displayedListType, setDisplayListType] = useState(
        `All Followers (${followersList.length})`
    );
    const [showFilters, setShowFilters] = useState(false);
    const [toggleDetials, setToggleDetails] = useState(false);
    const [selectEarning, setSelectEarning] = useState(false);
    const [selectSubscription, setSelectSubscription] = useState(false);
    const [checkedItems, setCheckedItems] = useState<any>({});
    const [fetchUpdatedData, setFetchUpdatedData] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allFollowers) {
            setDisplayListType(`All Followers (${followersList.length})`);
        } else if (activeFollowers) {
            setDisplayListType(`Active Followers`);
        } else if (restrictedFollowers) {
            setDisplayListType(`Restricted Followers`);
        } else {
            setDisplayListType(`Blocked Followers`);
        }
    }, [activeFollowers, allFollowers, followersList, restrictedFollowers]);

    useEffect(() => {
        const params = {
            authtoken: user.token,
            userId: user.id,
            username: user.username,
            type: followerType,
        };
        setLoading(true);
        dispatch(FollowersInfoAction.GetFollowersInformation(params));
        setLoading(false);
        setFetchUpdatedData(false);
    }, [
        dispatch,
        fetchUpdatedData,
        followerType,
        user.id,
        user.token,
        user.username,
    ]);

    const selectListType = async (e: any) => {
        if (e.target.name === LIST_ALL_FOLLOWERS) {
            setAllFollowers(true);
            setActiveFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_ALL_FOLLOWERS,
            };
            setLoading(true);
            await dispatch(FollowersInfoAction.GetFollowersInformation(params));
            setLoading(false);
            setCheckedItems({});
        } else if (e.target.name === LIST_ACTIVE_FOLLOWERS) {
            setActiveFollowers(true);
            setAllFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_ACTIVE_FOLLOWERS,
            };
            setLoading(true);
            await dispatch(FollowersInfoAction.GetFollowersInformation(params));
            setLoading(false);
            setCheckedItems({});
        } else if (e.target.name === LIST_RESTRICTED_FOLLOWERS) {
            setAllFollowers(false);
            setActiveFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(true);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_RESTRICTED_FOLLOWERS,
            };
            setLoading(true);
            await dispatch(FollowersInfoAction.GetFollowersInformation(params));
            setLoading(false);

            setCheckedItems({});
        } else if (e.target.name === LIST_BLOCKED_FOLLOWERS) {
            setBlockedFollowers(true);
            setAllFollowers(false);
            setActiveFollowers(false);
            setRestrictedFollowers(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_BLOCKED_FOLLOWERS,
            };
            setLoading(true);
            await dispatch(FollowersInfoAction.GetFollowersInformation(params));
            setLoading(false);
            setCheckedItems({});
        }
    };

    const restrictedFollower = (username: string) => {
        const restrictParams = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostRestrictFollower(restrictParams));
        setFetchUpdatedData(true);
    };

    const unRestrictedFollower = (username: string) => {
        const params = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostUnRestrictFollower(params));
        setFetchUpdatedData(true);
    };

    const blockedFollower = (username: string) => {
        const params = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostBlockedFollower(params));
        setFetchUpdatedData(true);
    };

    const unBlockedFollower = (username: string) => {
        const params = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostUnBlockedFollower(params));
        setFetchUpdatedData(true);
    };

    const favourite = (username: string) => {
        const params = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostFavouriteFollower(params));
        setFetchUpdatedData(true);
    };

    const unFavourite = (username: string) => {
        const params = {
            authtoken: user.token,
            recipientUsername: username,
            username: user.username,
        };
        dispatch(FollowersInfoAction.PostUnFavouriteFollower(params));
        setFetchUpdatedData(true);
    };

    const toggleCard = (name: any) => {
        if (name in checkedItems) {
            if (checkedItems[name]) {
                checkedItems[name] = false;
            } else {
                checkedItems[name] = true;
            }
        } else {
            checkedItems[name] = true;
        }
        if (toggleDetials) {
            setToggleDetails(false);
        } else {
            setToggleDetails(true);
            setSelectSubscription(true);
            setSelectEarning(false);
        }
    };

    const toggleOptions = (selectedOption: string) => {
        if (selectedOption === "Subscription") {
            setSelectSubscription(true);
            setSelectEarning(false);
        } else if (selectedOption === "Earnings") {
            setSelectSubscription(false);
            setSelectEarning(true);
        }
    };

    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between border-top border-bottom topnav">
                <div className={allFollowers ? "p-3 active" : "p-3 "}>
                    {allFollowers ? (
                        <StaticImage
                            src="/images/all_notif@3x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="allFollowers"
                            onClick={(e: any) => selectListType(e)}
                        />
                    ) : (
                        <StaticImage
                            src="/images/all_notif_white@3x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="allFollowers"
                            onClick={(e: any) => {
                                selectListType(e);
                            }}
                        />
                    )}
                </div>
                <div className={activeFollowers ? "p-3 active" : "p-3 "}>
                    {activeFollowers ? (
                        <StaticImage
                            src="/images/baseline-check_circle-24px@2x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="activeFollowers"
                            onClick={(e: any) => {
                                selectListType(e);
                            }}
                        />
                    ) : (
                        <StaticImage
                            src="/images/baseline-check_circle_outline-24px@2x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="activeFollowers"
                            onClick={(e: any) => {
                                selectListType(e);
                            }}
                        />
                    )}
                </div>
                <div className={restrictedFollowers ? "p-3 active" : "p-3 "}>
                    {restrictedFollowers ? (
                        <StaticImage
                            src="/images/baseline-add_circle-24px@2x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="restrictedFollowers"
                            onClick={(e: any) => selectListType(e)}
                        />
                    ) : (
                        <StaticImage
                            src="/images/baseline-add_circle-24px@2xx.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="restrictedFollowers"
                            onClick={(e: any) => {
                                selectListType(e);
                            }}
                        />
                    )}
                </div>
                <div className={blockedFollowers ? "p-3 active" : "p-3 "}>
                    {blockedFollowers ? (
                        <StaticImage
                            src="/images/baseline-not_interested-24px@2xxx.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="blockedFollowers"
                            onClick={(e:any) => selectListType(e)}
                        />
                    ) : (
                        <StaticImage
                            src="/images/baseline-not_interested-24px@2xxx.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="blockedFollowers"
                            onClick={(e: any) => {
                                selectListType(e);
                            }}
                        />
                    )}
                </div>
            </div>
            <p className="font-12px text-primary border-bottom">
                <div className="d-flex justify-content-between">
                    <div className="text-padding-left-lrg text-padding-bottom-xsmall">
                        {displayedListType}
                    </div>
                </div>
            </p>
            {followersList.length == 0 ? (
                <>
                {loading ? 
                    <div className="empty-list-text">   
                        <LoadingSpinner size="3x" showLoading={loading}></LoadingSpinner>
                    </div>
                    :
                     <div className="empty-list-text">No Data to Display</div>
                }
                </>
            ) : (
                <>
                {loading ?  
                        <div className="d-flex flex-column align-items-center flex-fill body-background">

                <div className="empty-list-text">
                        <LoadingSpinner size="3x" showLoading={loading}></LoadingSpinner>
                    </div>
                    </div>
                    :
                    <div className="followers-cards">
                    {followersList.map((follower: any) => {
                        return (
                            <div className="position-relative my-2 cursor-pointer user-information-sub-text-margin-right-lrg user-information-sub-text-margin-left-lrg pb-3">
                                <div
                                    className="primary-border-thick border-primary"
                                    style={{
                                        borderRadius: "13px 13px 0px 0px",
                                        border: "1.5px solid",
                                    }}
                                >
                                    <BackgroundImage
                                        src={[
                                            follower.coverImageUrl
                                                ? `${mediaBaseUrl}/${follower.coverImageUrl}`
                                                : "/images/cover_image_placeholder.png",
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
                                                    follower.profileImageUrl
                                                        ? `${mediaBaseUrl}/${follower.profileImageUrl}`
                                                        : "/images/profile_image_placeholder.png",
                                                ]}
                                                height="75px"
                                                width="75px"
                                                border={`2px solid ${theme.colors.primary}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="primary-border-thick border-primary"
                                    style={{
                                        borderRadius: "0px 0px 0px 0px",
                                        border: "1.5px solid",
                                        padding: "0px 15px 65px 100px",
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <ParagraphText className="lato-semibold font-13px text-primary">
                                                {follower.name}
                                            </ParagraphText>
                                            {!follower.isFavourite ? (
                                                <p className="font-8px">
                                                    <div className="d-flex">
                                                        <StaticImage
                                                            className="user-information-sub-text-margin-left-xsmall"
                                                            src="/images/Favourite star symbol.png"
                                                            width="13px"
                                                            height="13px"
                                                            onClick={() =>
                                                                favourite(
                                                                    follower.username
                                                                )
                                                            }
                                                        />
                                                        <p className="user-information-sub-text-padding-left-small text-margin-bottom-small user-information-text-color">
                                                            Add to Favourtes
                                                            List
                                                        </p>
                                                    </div>
                                                </p>
                                            ) : (
                                                <p className="font-8px">
                                                    <div className="d-flex">
                                                        <StaticImage
                                                            className="user-information-sub-text-margin-left-xsmall"
                                                            src="/images/Group 308.png"
                                                            width="13px"
                                                            height="13px"
                                                            onClick={() =>
                                                                unFavourite(
                                                                    follower.username
                                                                )
                                                            }
                                                        />
                                                        <p className="user-information-sub-text-padding-left-small text-margin-bottom-small user-information-text-color">
                                                            Add to Favourtes
                                                            List
                                                        </p>
                                                    </div>
                                                </p>
                                            )}
                                        <div className="d-flex">
                                            {followerType !==
                                                TYPE_BLOCKED_FOLLOWERS &&
                                                (!follower.isRestricted ? (
                                                    <TransparentButton
                                                        borderRadius="4px"
                                                        padding="0px 15px !important"
                                                        className="mr-2 lato-semibold border-primary followers-cards-btn"
                                                        onClick={() =>
                                                            restrictedFollower(
                                                                follower.username
                                                            )
                                                        }
                                                    >
                                                        <span className="followers-cards-btn-margin">
                                                            Restrict
                                                        </span>
                                                        <StaticImage
                                                            src="/images/baseline-add_circle-24px@2xx.png"
                                                            className="user-information-sub-text-margin-bottom-xsmall"
                                                            width="12.59px"
                                                            height="12.59px"
                                                        />
                                                    </TransparentButton>
                                                ) : (
                                                    <TransparentButton
                                                        borderRadius="4px"
                                                        padding="0px 15px !important"
                                                        className="lato-semibold border-primary followers-cards-btn"
                                                        onClick={() =>
                                                            unRestrictedFollower(
                                                                follower.username
                                                            )
                                                        }
                                                    >
                                                        <span className="followers-cards-btn-margin">
                                                            UnRestrict
                                                        </span>
                                                        <StaticImage
                                                            src="/images/baseline-add_circle-24px@2x.png"
                                                            className="user-information-sub-text-margin-bottom-xsmall"
                                                            width="12.59px"
                                                            height="12.59px"
                                                        />
                                                    </TransparentButton>
                                                ))}
                                            {!follower.isBlocked ? (
                                                <TransparentButton
                                                    borderRadius="4px"
                                                    padding="0px 15px !important"
                                                    className="lato-semibold  border-primary followers-cards-btn"
                                                    onClick={() =>
                                                        blockedFollower(
                                                            follower.username
                                                        )
                                                    }
                                                >
                                                    <span className="followers-cards-btn-margin">
                                                        Block
                                                    </span>
                                                    <StaticImage
                                                        src="/images/baseline-not_interested-24px@2xxx.png"
                                                        className="user-information-sub-text-margin-bottom-xsmall"
                                                        width="12.59px"
                                                        height="12.59px"
                                                    />
                                                </TransparentButton>
                                            ) : (
                                                <TransparentButton
                                                    borderRadius="4px"
                                                    padding="0px 15px !important"
                                                    className={
                                                        followerType ===
                                                        TYPE_BLOCKED_FOLLOWERS
                                                            ? "lato-semibold border-primary button-margin-left-xsmall followers-cards-btn"
                                                            : "lato-semibold border-primary followers-cards-btn"
                                                    }
                                                    onClick={() =>
                                                        unBlockedFollower(
                                                            follower.username
                                                        )
                                                    }
                                                >
                                                    <span className="followers-cards-btn-margin">
                                                        UnBlock
                                                    </span>
                                                    <StaticImage
                                                        src="/images/baseline-not_interested-24px@2xxx.png"
                                                        className="user-information-sub-text-margin-bottom-xsmall"
                                                        width="12.59px"
                                                        height="12.59px"
                                                    />
                                                </TransparentButton>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {selectEarning ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: checkedItems[
                                                    follower.username
                                                ]
                                                    ? "39%"
                                                    : "57%",
                                                left: "60px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        Recurring Follower
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1 card-details-spacing-col-top">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        {follower.recurringFollower
                                                            ? "Yes"
                                                            : "No"}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: checkedItems[
                                                    follower.username
                                                ]
                                                    ? "36%"
                                                    : "57%",
                                                left: "60px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        Recurring Follower
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1 card-details-spacing-col-top">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        {follower.recurringFollower
                                                            ? "Yes"
                                                            : "No"}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectEarning ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: checkedItems[
                                                    follower.username
                                                ]
                                                    ? "45%"
                                                    : "66%",
                                                left: "60px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-around ml-1">
                                                <div>
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        Renew Date
                                                    </ParagraphText>
                                                </div>
                                                <div className="card-details-spacing-col-bottom">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        {follower.renewDate !== null ? moment(
                                                            follower.renewDate
                                                        ).format("LL") : "-"}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: checkedItems[
                                                    follower.username
                                                ]
                                                    ? "42%"
                                                    : "66%",
                                                left: "60px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-around ml-1">
                                                <div>
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        Renew Date
                                                    </ParagraphText>
                                                </div>
                                                <div className="card-details-spacing-col-bottom">
                                                    <ParagraphText className="font-8px user-information-text-color">
                                                        {moment(
                                                            follower.renewDate
                                                        ).format("LL")}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="primary-border-thick border-primary"
                                    style={{
                                        borderRadius: checkedItems[
                                            follower.username
                                        ]
                                            ? "0px 0px 0px 0px"
                                            : "0px 0px 13px 13px",
                                        border: "1.5px solid",
                                    }}
                                >
                                    <div className="d-flex justify-content-between">
                                        <div
                                            onClick={() =>
                                                toggleOptions("Subscription")
                                            }
                                        >
                                            <ParagraphText
                                                className={
                                                    checkedItems[
                                                        follower.username
                                                    ] && selectSubscription
                                                        ? "font-15px text-margin-left-xxxlrg text-primary"
                                                        : "font-15px text-margin-left-xxxlrg"
                                                }
                                            >
                                                Subscription
                                            </ParagraphText>
                                        </div>
                                        <div
                                            className={
                                                followerType ===
                                                TYPE_BLOCKED_FOLLOWERS
                                                    ? "vertical-line-blocked-followers"
                                                    : "vertical-line"
                                            }
                                        />
                                        <div
                                            onClick={() =>
                                                toggleOptions("Earnings")
                                            }
                                        >
                                            <ParagraphText
                                                className={
                                                    checkedItems[
                                                        follower.username
                                                    ] && selectEarning
                                                        ? "font-15px text-margin-right-xxxlrg text-primary"
                                                        : "font-15px text-margin-right-xxxlrg"
                                                }
                                            >
                                                Earnings
                                            </ParagraphText>
                                        </div>
                                    </div>
                                </div>
                                {checkedItems[follower.username] && (
                                    <div
                                        className="primary-border-thick border-primary"
                                        style={{
                                            borderRadius: "0px 0px 13px 13px",
                                            border: "1.5px solid",
                                        }}
                                    >
                                        {selectEarning && (
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-5 user-information-text-color">
                                                        Tips
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        {`$ ${follower.earnings.tips.toFixed(2)}`}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                        {selectEarning && (
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-4 user-information-text-color">
                                                        Messages
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-1 pr-1 user-information-text-color">
                                                        {`$ ${follower.earnings.messages.toFixed(2)}`}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                        {selectEarning && (
                                            <div
                                                style={{
                                                    top: "75%",
                                                    left: "60px",
                                                }}
                                            >
                                                <div className="d-flex justify-content-around">
                                                    <div className="p-1">
                                                        <ParagraphText className="font-8px mr-3 user-information-text-color">
                                                            Subscription
                                                        </ParagraphText>
                                                    </div>
                                                    <div className="p-1">
                                                        <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                            {`$ ${follower.earnings.subscription.toFixed(2)}`}
                                                        </ParagraphText>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {selectEarning && (
                                            <div
                                                style={{
                                                    top: "80%",
                                                    left: "50px",
                                                }}
                                            >
                                                <div className="d-flex justify-content-around">
                                                    <div className="p-1 subscription-text-margin-left-small">
                                                        <ParagraphText className="font-8px mr-5 user-information-text-color">
                                                            Total
                                                        </ParagraphText>
                                                    </div>
                                                    <div className="p-1">
                                                        <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                            {`$ ${(follower.earnings.tips + follower.earnings.messages + follower.earnings.subscription).toFixed(2)}`}
                                                        </ParagraphText>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {selectSubscription && (
                                           <div className="d-flex justify-content-around">
                                           <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        Current Subscription
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        {`$ ${follower.currentSubscriptionFee.toFixed(2)}`}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                        {selectSubscription && (
                                            <div className="d-flex justify-content-around">
                                            <div className="p-1">
                                                    <ParagraphText className="font-8px mr-5 user-information-text-color">
                                                        New Price
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        {`$ ${follower.newFee.toFixed(2)}`}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                        {selectSubscription && (
                                                 <div className="d-flex justify-content-around">
                                                 <div className="p-1">
                                                        <ParagraphText className="font-8px mr-3 user-information-text-color">
                                                            Started
                                                        </ParagraphText>
                                                    </div>
                                                    <div className="p-1">
                                                        <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                            {moment(
                                                                follower.startDate
                                                            ).format("LL")}
                                                        </ParagraphText>
                                                    </div>
                                                </div>
                                        )}
                                        {selectSubscription && (
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-4 user-information-text-color">
                                                        Renews
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        {moment(
                                                            follower.renewDate
                                                        ).format("LL")}
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                        {selectSubscription && (
                                            <div className="d-flex justify-content-around">
                                                <div className="p-1 subscription-text-margin-right-large">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        Recurring Followers
                                                    </ParagraphText>
                                                </div>
                                                <div className="p-1">
                                                    <ParagraphText className="font-8px mr-2 user-information-text-color">
                                                        {follower.isRestricted?
                                                            "Yes" : "No"
                                                        }
                                                    </ParagraphText>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div
                                    style={{
                                        textAlign: "center",
                                        paddingTop: "10px",
                                        color: "#f57b52",
                                        height: "10px",
                                        paddingBottom: "12px",
                                    }}
                                >
                                    <span
                                        onClick={() =>
                                            toggleCard(follower.username)
                                        }
                                    >
                                        {checkedItems[follower.username] ? (
                                            <FontAwesomeIcon
                                                style={{
                                                    width: "25px",
                                                    height: "25px",
                                                }}
                                                icon={faChevronCircleUp}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                style={{
                                                    width: "25px",
                                                    height: "25px",
                                                }}
                                                icon={faChevronCircleDown}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                }
                </>
                            )}
            {/* {showFilters && (
                <div className="main-sticky visible-phone layout-center">
                    <div className="filter-border">
                        <p>Alphabetical</p>
                    </div>
                    <div className="filter-border">
                        <p>Top Billing</p>
                    </div>
                    <div>
                        <p>Data Started</p>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export const FollowersInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const dispatch = useDispatch();
    const followersInfo = useSelector((state: IStore) => state.followersInfo);
    const {
        creatorProfile,
        defaultFollowersInformation,
        errors,
        success,
        followerType,
    } = followersInfo;

    useEffect(() => {
        const params = {
            authtoken: user.token,
            userId: user.id,
            username: user.username,
            type: TYPE_ALL_FOLLOWERS,
        };
        dispatch(FollowersInfoAction.GetFollowersInformation(params));
    }, [dispatch, user.id, user.token, user.username]);


    return (
        <div className="d-flex flex-column align-items-center flex-fill body-background">
            <ParagraphText className="text-primary font-25px">
                Followers
            </ParagraphText>
            <React.Fragment>
                {/* {errors.length <= 0 && (
                    <div
                        style={{ flex: 1 }}
                        className="w-100 h-100 d-flex align-items-center justify-content-center"
                    >
                        <LoadingSpinner size="3x" />
                    </div>
                )} */}
                {/* {loading && 
                    <div className="mr-2">
                        <LoadingSpinner size="1x" showLoading={loading}></LoadingSpinner>
                    </div>
                } */}
                {defaultFollowersInformation.length >= 0 && (
                    <FollowerCard
                        user={user}
                        followersList={defaultFollowersInformation}
                        followerType={followerType}
                    />
                )}
            </React.Fragment>
        </div>
    );
};
