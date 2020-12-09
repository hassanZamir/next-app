import { USER_SESSION, IFeed, FEED } from "@Interfaces";
import { FeedsActions, FollowingInfoAction } from "@Actions";
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
import React, { useEffect, useState, useRef } from "react";
import { theme } from "@Definitions/Styled";
import Link from "next/link";
import {
    LIST_ALL_FOLLOWING,
    LIST_ACTIVE_FOLLOWING,
    LIST_EXPIRED_FOLLOWING,
    TYPE_ALL_FOLLOWING,
    TYPE_ACTIVE_FOLLOWING,
    TYPE_EXPIRED_FOLLOWING,
} from "config/FollowingConfigrator";

import { NonFeedTipSubmitModal } from "../Modals/NonFeedTipSubmitModal";
import { useModal } from "../Hooks";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Switch from "react-switch";
import { useRouter } from "next/router";

const mediaBaseUrl = "https://venodev.blob.core.windows.net/veno-media";

const FollowingCard: React.FunctionComponent<{
    user: USER_SESSION;
    followingList: any;
    followingType: any;
}> = ({ user, followingList, followingType }) => {
    const dispatch = useDispatch();
    const [allFollowing, setAllFollowing] = useState(true);
    const [activeFollowing, setActiveFollowing] = useState(false);
    const [expiredFollowing, setExpiredFollowing] = useState(false);
    const [displayedListType, setDisplayListType] = useState(`All Following`);
    const [toggleDetials, setToggleDetails] = useState(false);
    const [checkedItems, setCheckedItems] = useState<any>({});
    const modalRef = useRef<HTMLDivElement>(null);
    const [clickedTipFeed, setClickedTipFeed] = useState({});
    const { isShowing, toggle } = useModal(modalRef);
    const [loading, setLoading] = useState(false);
    const [fetchUpdatedData, setFetchUpdatedData] = useState(false);
    const { addToast } = useToasts();


    const toggleTipModal = (e: any) => {
        if (isShowing) {
            toggle();
        } else {
            toggle();
        }
    };

    useEffect(() => {
        if (allFollowing) {
            setDisplayListType(`All Following`);
        } else if (activeFollowing) {
            setDisplayListType(`Active Following`);
        } else if (expiredFollowing) {
            setDisplayListType(`Expired Following`);
        }
    }, [followingList]);

    useEffect(() => {
        const params = {
            authtoken: user.token,
            userId: user.id,
            username: user.username,
            type: followingType,
        };
        dispatch(FollowingInfoAction.GetFollowingInformation(params));
        setFetchUpdatedData(false);
    }, [
        dispatch,
        fetchUpdatedData,
        followingType,
        user.id,
        user.token,
        user.username,
    ]);

    const selectListType = async (e: any) => {
        if (e.target.name === LIST_ALL_FOLLOWING) {
            setAllFollowing(true);
            setActiveFollowing(false);
            setExpiredFollowing(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_ALL_FOLLOWING,
            };
            setLoading(true);
            await dispatch(FollowingInfoAction.GetFollowingInformation(params));
            setLoading(false);
            setCheckedItems({});
        } else if (e.target.name === LIST_ACTIVE_FOLLOWING) {
            setActiveFollowing(true);
            setAllFollowing(false);
            setExpiredFollowing(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_ACTIVE_FOLLOWING,
            };
            setLoading(true);
            await dispatch(FollowingInfoAction.GetFollowingInformation(params));
            setLoading(false);
            setCheckedItems({});
        } else if (e.target.name === LIST_EXPIRED_FOLLOWING) {
            setExpiredFollowing(true);
            setAllFollowing(false);
            setActiveFollowing(false);
            const params = {
                authtoken: user.token,
                userId: user.id,
                username: user.username,
                type: TYPE_EXPIRED_FOLLOWING,
            };
            setLoading(true);
            await dispatch(FollowingInfoAction.GetFollowingInformation(params));
            setLoading(false);
            setCheckedItems({});
        }
    };

    const tipSumit = async (amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = {
            contentId: 0,
            viewerId: user.id,
            message: message,
            amount: parseInt(amount),
            creatorUserName: user.username,
            authtoken: user.token,
        };
        toggle();
        FeedsActions.TipFeed(param)().then(resp => {
            if (resp.status)
                addToast("Tipped Successfuly !", { appearance: "success" });
            else addToast("Tip Error !", { appearance: "error" });
        });
    };

    const toggleCard = (e: any, name: string, currentState: any) => {
        if (name in checkedItems) {
            if (checkedItems[name]) {
                checkedItems[name] = false;
                const params = {
                    userId: user.id,
                    autoRenew: false,
                    username: name,
                    authtoken: user.token,
                };
                dispatch(FollowingInfoAction.PutRecurringFollower(params));
                setFetchUpdatedData(true);
            } else {
                checkedItems[name] = true;
                const params = {
                    userId: user.id,
                    autoRenew: true,
                    username: name,
                    authtoken: user.token,
                };
                dispatch(FollowingInfoAction.PutRecurringFollower(params));
                setFetchUpdatedData(true);
            }
        } else if (currentState) {
            checkedItems[name] = false;
            const params = {
                userId: user.id,
                autoRenew: false,
                username: name,
                authtoken: user.token,
            };
            dispatch(FollowingInfoAction.PutRecurringFollower(params));
            setFetchUpdatedData(true);
        } else {
            checkedItems[name] = true;
            const params = {
                userId: user.id,
                autoRenew: true,
                username: name,
                authtoken: user.token,
            };
            dispatch(FollowingInfoAction.PutRecurringFollower(params));
            setFetchUpdatedData(true);
        }
        if (checkedItems[name]) {
            setToggleDetails(false);
        } else {
            setToggleDetails(true);
        }
    };


    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between border-top border-bottom topnav">
                <div className={allFollowing ? "p-3 active" : "p-3 "}>
                    {allFollowing ? (
                        <StaticImage
                            src="/images/all_notif@3x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="allFollowing"
                            onClick={e => selectListType(e)}
                        />
                    ) : (
                            <StaticImage
                                src="/images/all_notif_white@3x.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="allFollowing"
                                onClick={e => selectListType(e)}
                            />
                        )}
                </div>
                <div className={activeFollowing ? "p-3 active" : "p-3 "}>
                    {activeFollowing ? (
                        <StaticImage
                            src="/images/baseline-check_circle-24px@2x.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="activeFollowing"
                            onClick={e => selectListType(e)}
                        />
                    ) : (
                            <StaticImage
                                src="/images/baseline-check_circle_outline-24px@2x.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="activeFollowing"
                                onClick={e => selectListType(e)}
                            />
                        )}
                </div>

                <NonFeedTipSubmitModal
                    isShowing={isShowing}
                    // clickedFeed={clickedTipFeed} // TODO: FIX THIS.. NEED TO PASS THE CREATOR DETAILS
                    modalRef={modalRef}
                    onSubmit={tipSumit}
                />
                <div className={expiredFollowing ? "p-3 active" : "p-3 "}>
                    {expiredFollowing ? (
                        <StaticImage
                            src="/images/baseline-restore-24px.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="expiredFollowing"
                            onClick={e => selectListType(e)}
                        />
                    ) : (
                            <StaticImage
                                src="/images/baseline-restore-24px.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="expiredFollowing"
                                onClick={e => selectListType(e)}
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
            {followingList.length == 0 ? (
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
                            <div>
                                {

                                    followingList.map((followingInfo: any) => {
                                        return (
                                            <div className="position-relative my-2 ml-2 mr-2 cursor-pointer">
                                                <div
                                                    className="primary-border-thick border-primary"
                                                    style={{
                                                        borderRadius: "13px 13px 0px 0px",
                                                        border: "1.5px solid",
                                                    }}
                                                >
                                                    <BackgroundImage
                                                        src={[
                                                            followingInfo.coverImageUrl
                                                                ? mediaBaseUrl +
                                                                "/" +
                                                                followingInfo.coverImageUrl
                                                                : "/images/cover_image_placeholder.jpg",
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
                                                                    followingInfo.profileImageUrl
                                                                        ? mediaBaseUrl +
                                                                        "/" +
                                                                        followingInfo.profileImageUrl
                                                                        : "/images/profile_image_placeholder.jpg",
                                                                ]}
                                                                height="75px"
                                                                width="75px"
                                                                border={
                                                                    "2px solid " +
                                                                    theme.colors.primary
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="primary-border-thick border-primary"
                                                    style={{
                                                        borderRadius: "0px 0px 13px 13px",
                                                        border: "1.5px solid",
                                                        padding: "0px 15px 80px 100px",
                                                    }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <ParagraphText className="lato-semibold font-13px text-primary">
                                                                {followingInfo.name}
                                                            </ParagraphText>
                                                            {!followingInfo.isExpired && (
                                                                <div className="d-flex">
                                                                    <TransparentButton
                                                                        borderRadius="4px"
                                                                        padding="0px 15px !important"
                                                                        className="mr-1 following-cards-btn lato-semibold border-primary bg-primary text-white"
                                                                        onClick={e => {
                                                                            toggleTipModal(e);
                                                                        }}
                                                                    >
                                                                        <span className="following-cards-btn-margin">
                                                                            SendTip
                                                         </span>
                                                                        <StaticImage
                                                                            src="/images/Group 324.png"
                                                                            className="user-information-sub-text-margin-bottom-xsmall"
                                                                            width="12.59px"
                                                                            height="12.59px"
                                                                        />
                                                                    </TransparentButton>
                                                                    <TransparentButton
                                                                        borderRadius="4px"
                                                                        padding="0px 15px !important"
                                                                        className="following-cards-btn lato-semibold border-primary bg-primary text-white"
                                                                    //onClick={(e) => redirectToMessage(e)}
                                                                    >
                                                                        <span className="following-cards-btn-margin">
                                                                            Message
                                                    </span>
                                                                        <StaticImage
                                                                            src="/images/baseline-chat_bubble-24px.png"
                                                                            className="user-information-sub-text-margin-bottom-xsmall"
                                                                            width="12.59px"
                                                                            height="12.59px"
                                                                        />
                                                                    </TransparentButton>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {!followingInfo.isExpired ? (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: "63%",
                                                                left: "100px",
                                                            }}
                                                        >
                                                            <Link
                                                                href={
                                                                    "/profile/" +
                                                                    followingInfo.username
                                                                }
                                                            >
                                                                <TransparentButton
                                                                    borderRadius="4px"
                                                                    padding="0px 15px !important"
                                                                    className="following-cards-btn lato-semibold border-primary bg-primary text-white"
                                                                >
                                                                    <span className="following-cards-btn-margin">
                                                                        Following for $
                                                    {followingInfo.newFee} a
                                                    month
                                                </span>
                                                                    <StaticImage
                                                                        src="/images/Path 6023.png"
                                                                        className="user-information-sub-text-margin-bottom-xsmall"
                                                                        width="12.59px"
                                                                        height="12.59px"
                                                                    />
                                                                </TransparentButton>
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "63%",
                                                                    left: "100px",
                                                                }}
                                                            >
                                                                <Link
                                                                    href={
                                                                        "/profile/" +
                                                                        followingInfo.username
                                                                    }
                                                                >
                                                                    <TransparentButton
                                                                        borderRadius="4px"
                                                                        padding="0px 15px !important"
                                                                        className="lato-semibold followers-cards-btn border-primary"
                                                                    >
                                                                        <span className="mr-2">
                                                                            Follow for $
                                                    {followingInfo.newFee} a
                                                    month
                                                </span>
                                                                        <FontAwesomeIcon
                                                                            icon={faPlus}
                                                                        />
                                                                    </TransparentButton>
                                                                </Link>
                                                            </div>
                                                        )}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "80%",
                                                            left: "25px",
                                                        }}
                                                    >
                                                        {!followingInfo.isExpired ? (
                                                            <div className="d-flex justify-content-around">
                                                                <div className="p-1">
                                                                    {followingInfo.recurringFollower ?
                                                                        <p className="font-8px user-information-text-color text-primary">
                                                                            Renews automatically on{" "}
                                                                            <br />{" "}
                                                                            {followingInfo.renewDate
                                                                                ? moment(
                                                                                    followingInfo.renewDate
                                                                                ).format("LL")
                                                                                : moment().format("LL")}
                                                                        </p> : <p className="font-8px user-information-text-color text-primary">
                                                                            Expires automatically on{" "}
                                                                            <br />{" "}
                                                                            {followingInfo.renewDate
                                                                                ? moment(
                                                                                    followingInfo.renewDate
                                                                                ).format("LL")
                                                                                : moment().format("LL")}
                                                                        </p>
                                                                    }
                                                                </div>
                                                                <div className="switch-spacing-col-left">
                                                                    <div className="p-1 text-primary">
                                                                        <Switch
                                                                            onChange={e =>
                                                                                toggleCard(
                                                                                    e,
                                                                                    followingInfo.username,
                                                                                    followingInfo.recurringFollower
                                                                                )
                                                                            }
                                                                            checked={
                                                                                checkedItems[
                                                                                    followingInfo
                                                                                        .username
                                                                                ] !== undefined
                                                                                    ? checkedItems[
                                                                                        followingInfo
                                                                                            .username
                                                                                    ]
                                                                                        ? true
                                                                                        : false
                                                                                    : followingInfo.recurringFollower
                                                                                        ? true
                                                                                        : false
                                                                            }
                                                                            onColor="#f57c52"
                                                                            offColor="#f57c52"
                                                                            uncheckedIcon={false}
                                                                            checkedIcon={false}
                                                                            height={20}
                                                                            width={46}
                                                                            handleDiameter={18}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                                <div className="d-flex justify-content-around">
                                                                    <div className="p-1">
                                                                        <p className="font-8px user-information-text-color text-primary">
                                                                            Expired on{" "}
                                                                            {followingInfo.renewDate
                                                                                ? moment(
                                                                                    followingInfo.renewDate
                                                                                ).format("LL")
                                                                                : moment().format("LL")}
                                                                        </p>
                                                                    </div>
                                                                    {/* <div className="switch-spacing-col-left"> */}
                                                                    {/* <div className="p-1 text-primary"> */}
                                                                    {/* <Switch
                                                            checked={false}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            className="switch-styles text-primary"
                                                            offColor="#F57B52"
                                                            onColor="#F57B52"
                                                            height={22}
                                                            width={45}
                                                        /> */}
                                                                    {/* </div> */}
                                                                    {/* </div> */}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })

                                }
                            </div>
                        }
                    </>
                )}
        </div>
    );
};

export const FollowingInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const followingInfo = useSelector((state: IStore) => state.followingInfo);
    const {
        creatorProfile,
        defaultFollowingInformation,
        errors,
        success,
        followingType,
    } = followingInfo;

    useEffect(() => {
        const params = {
            authtoken: user.token,
            userId: user.id,
            username: user.username,
            type: followingType,
        };
        dispatch(FollowingInfoAction.GetFollowingInformation(params));
    }, [dispatch, user.id, user.token, user.username]);

    console.log(followingType);

    return (
        <div className="d-flex flex-column align-items-center flex-fill body-background">
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
                Following
            </ParagraphText>
            <React.Fragment>
                {defaultFollowingInformation.length >= 0 && (
                    <FollowingCard
                        user={user}
                        followingList={defaultFollowingInformation}
                        followingType={followingType}
                    />
                )}
            </React.Fragment>
        </div>
    );
};
