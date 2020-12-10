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
    faArrowLeft,
    faChevronCircleDown,
    faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useRouter } from "next/router";

const mediaBaseUrl = process.env.MEDIA_BASE_URL;

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
        `All Followers` //(${followersList.length})`
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
                            onClick={(e: any) => selectListType(e)}
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
            <div className="font-12px text-primary border-bottom">
                <div className="d-flex justify-content-between">
                    <div className="text-padding-left-lrg text-padding-bottom-xsmall">
                        {displayedListType}
                    </div>
                </div>
            </div>
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
                                        <div key={follower.id} className="position-relative my-2 cursor-pointer user-information-sub-text-margin-right-lrg user-information-sub-text-margin-left-lrg pb-3">
                                            <div
                                                className="primary-border-thick border-primary"
                                                style={{
                                                    borderRadius: "30px 30px 0px 0px",
                                                    border: "3px solid",
                                                }}
                                            >
                                                <BackgroundImage
                                                    src={[
                                                        follower.coverImageUrl
                                                            ? `${mediaBaseUrl}/${follower.coverImageUrl}`
                                                            : "/images/cover_image_placeholder.png",
                                                    ]}
                                                    paddingBottom="20%"
                                                    borderRadius="30px 30px 0px 0px"
                                                    backgroundPosition="center"
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
                                                    borderLeft: "3px solid",
                                                    borderRight: "3px solid",
                                                    // padding: "0px 15px 65px 100px",
                                                }}
                                            >
                                                <div className="d-flex flex-row justify-content-between">
                                                    <div style={{
                                                        width: "30%",
                                                    }} />
                                                    <div style={{
                                                        width: "70%"
                                                    }}>
                                                        <ParagraphText className="lato-semibold font-13px text-primary">
                                                            {follower.name}
                                                        </ParagraphText>
                                                        {!follower.isFavourite ? (
                                                            <div className="font-12px pt-2 pb-2">
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
                                                                        Add to Favourites List
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                                <div className="font-8px">
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
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="d-inline-flex justify-content-center w-100">
                                                    <div className="d-flex flex-row justify-content-around">
                                                        {followerType !== TYPE_BLOCKED_FOLLOWERS && !follower.isBlocked &&
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
                                                                        className="mr-2 lato-semibold border-primary followers-cards-btn"
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
                                                {<div className="d-flex flex-column font-12px user-information-text-color" style={{
                                                    margin: "0vw 15vw"
                                                }}>
                                                    <div className="d-flex flex-row justify-content-between m-2">
                                                        <span className="align-self-left">Recurring Follower</span>
                                                        <span className="align-self-right">{follower.recurringFollower ? "Yes" : "No"}</span>
                                                    </div>
                                                    <div className="d-flex flex-row justify-content-between m-2">
                                                        <span className="align-self-left">Renew Date</span>
                                                        <span className="align-self-right">{moment(follower.renewDate).format("LL")}</span>
                                                    </div>
                                                </div>}
                                            </div>


                                            <div
                                                className="border-primary"
                                                style={{
                                                    borderRadius: checkedItems[
                                                        follower.username
                                                    ]
                                                        ? "0px 0px 0px 0px"
                                                        : "0px 0px 30px 30px",
                                                    border: "3px solid",
                                                }}
                                            >
                                                <div className="d-flex justify-content-center" style={{
                                                    margin: "0vw 1vw"
                                                }}>
                                                    <div className=""
                                                        onClick={() => toggleOptions("Subscription")}
                                                        style={{
                                                            width: "100px",
                                                            marginRight: "12vw",
                                                            textAlign: "end"
                                                        }}>
                                                        <ParagraphText>
                                                            Subscription
                                                        </ParagraphText>
                                                    </div>
                                                    <div className="text-primary" style={{
                                                        // border: "2px solid",
                                                        margin: "1vh auto",
                                                        position: "absolute",
                                                        alignSelf: "center"
                                                    }}>|</div>
                                                    <div className=""
                                                        onClick={() => toggleOptions("Earnings")}
                                                        style={{
                                                            width: "100px",
                                                            marginLeft: "8vw"
                                                        }}>
                                                        <ParagraphText>
                                                            Earnings
                                                        </ParagraphText>
                                                    </div>
                                                </div>
                                            </div>
                                            {checkedItems[follower.username] && (
                                                <div
                                                    className="border-primary"
                                                    style={{
                                                        borderRadius: "0px 0px 30px 30px",
                                                        border: "3px solid",
                                                        borderTop: "0px",
                                                    }}
                                                >
                                                    {selectEarning && <div className="d-flex flex-column font-12px user-information-text-color" style={{
                                                        margin: "0vw 15vw"
                                                    }}>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">Tips</span>
                                                            <span className="align-self-right">{`$ ${follower.earnings.tips.toFixed(2)}`}</span>
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">Messages</span>
                                                            <span className="align-self-right">{`$ ${follower.earnings.messages.toFixed(2)}`}</span>
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">Subscription</span>
                                                            <span className="align-self-right">{`$ ${follower.earnings.subscription.toFixed(2)}`}</span>
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between m-2 font-15px">
                                                            <span className="align-self-left">Total</span>
                                                            <span className="align-self-right">{`$ ${(follower.earnings.tips + follower.earnings.messages + follower.earnings.subscription).toFixed(2)}`}</span>
                                                        </div>
                                                    </div>}

                                                    {selectSubscription && <div className="d-flex flex-column font-12px user-information-text-color" style={{
                                                        margin: "0vw 15vw"
                                                    }}>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">Subscription Price</span>
                                                            <span className="align-self-right"> {`$ ${follower.currentSubscriptionFee.toFixed(2)}`}</span>
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">New Price</span>
                                                            <span className="align-self-right">{`$ ${follower.newFee.toFixed(2)}`}</span>
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between m-2">
                                                            <span className="align-self-left">Started On</span>
                                                            <span className="align-self-right">{moment(follower.startDate).format("LL")}</span>
                                                        </div>
                                                        {/* <div className="d-flex flex-row justify-content-between m-2 font-15px">
                                                            <span className="align-self-left">Renew On</span>
                                                            <span className="align-self-right">{moment(follower.renewDate).format("LL")}</span>
                                                        </div> */}
                                                    </div>}
                                                </div>
                                            )}
                                            <div className="d-flex justify-content-center"
                                                style={{
                                                    // textAlign: "center",
                                                    // paddingTop: "10px",
                                                    color: "#f57b52",
                                                    // // height: "10px",
                                                    // paddingBottom: "12px",
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
    const router = useRouter();
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

    return <React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => router.back()}
                className="cursor-pointer"
                icon={faArrowLeft}
                color={theme.colors.primary}
                size="lg"
            />
        </div>
        <ParagraphText className="mb-2 font-40px gibson-semibold font-40px text-center text-primary">
            Followers
            </ParagraphText>
        <div className="d-flex flex-column align-items-center flex-fill">
            {defaultFollowersInformation.length >= 0 && (
                <FollowerCard
                    user={user}
                    followersList={defaultFollowersInformation}
                    followerType={followerType}
                />
            )}

        </div>
    </React.Fragment>
};
