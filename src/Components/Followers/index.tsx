import { USER_SESSION } from "@Interfaces";
import { BankingInfoActions } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import {
    ParagraphText,
    LoadingSpinner,
    CircularImage,
    PrimaryButton,
    StaticImage,
} from "@Components";
import { UploadPersonalInformation } from "@Components/BankingInfo/UploadPersonalInformation";
import { BackgroundImage } from "@Components/Basic";
import React, { useEffect, useState } from "react";
import { theme } from "@Definitions/Styled";
import {
    LIST_ALL_FOLLOWERS,
    LIST_ACTIVE_FOLLOWERS,
    LIST_RESTRICTED_FOLLOWERS,
    LIST_BLOCKED_FOLLOWERS,
} from "config/AppConfigrator";

interface IUploadImage {
    key: string;
    preview: "";
    raw: {
        name: string;
        size: number;
        type: string;
        webkitRelativePath: "";
    };
}

const UploadProfileImages: React.FunctionComponent<{
    user: USER_SESSION;
    coverImageUrl: string;
    profileImageUrl: string;
}> = ({ user, coverImageUrl, profileImageUrl }) => {
    const [files, setFiles] = useState<IUploadImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [stateCoverImageUrl, setStateCoverImageUrl] = useState(coverImageUrl);
    const [stateProfileImageUrl, setStateProfileImageUrl] = useState(
        profileImageUrl
    );
    const [allFollowers, setAllFollowers] = useState(true);
    const [activeFollowers, setActiveFollowers] = useState(false);
    const [blockedFollowers, setBlockedFollowers] = useState(false);
    const [restrictedFollowers, setRestrictedFollowers] = useState(false);
    const [displayedListType, setDisplayListType] = useState(
        "All Followers (2)"
    );
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch();

    const saveProfileImages = async () => {
        const payload: any = [];
        files.forEach(file => {
            const formData = new FormData();
            formData.append(
                "mediaFiles",
                new Blob([file.raw as any]),
                file.raw.name
            );
            payload.push({
                key: file.key,
                url: formData,
            });
        });
        setLoading(true);
        await dispatch(
            BankingInfoActions.UploadProfileImages({
                media_url: payload,
                username: user.username,
            })
        );
        setLoading(false);
    };

    const selectListType = (e: any) => {
        if (e.target.name === LIST_ALL_FOLLOWERS) {
            setAllFollowers(true);
            setActiveFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(false);
            setDisplayListType("All Followers (2)");
        } else if (e.target.name === LIST_ACTIVE_FOLLOWERS) {
            setActiveFollowers(true);
            setAllFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(false);
            setDisplayListType("Active Followers (2)");
        } else if (e.target.name === LIST_RESTRICTED_FOLLOWERS) {
            setAllFollowers(false);
            setActiveFollowers(false);
            setBlockedFollowers(false);
            setRestrictedFollowers(true);
            setDisplayListType("Restricted Followers (2)");
        } else if (e.target.name === LIST_BLOCKED_FOLLOWERS) {
            setBlockedFollowers(true);
            setAllFollowers(false);
            setActiveFollowers(false);
            setRestrictedFollowers(false);
            setDisplayListType("Blocked Followers (2)");
        }
    };

    const toggleFilters = () => {
        if (!showFilters) {
            setShowFilters(true);
        } else {
            setShowFilters(false);
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
                            onClick={(e: any) => { selectListType(e) }}
                        />
                    ) : (
                            <StaticImage
                                src="/images/all_notif_white@3x.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="allFollowers"
                                onClick={(e: any) => { selectListType(e) }}
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
                            onClick={(e: any) => { selectListType(e) }}
                        />
                    ) : (
                            <StaticImage
                                src="/images/baseline-check_circle_outline-24px@2x.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="activeFollowers"
                                onClick={(e: any) => { selectListType(e) }}
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
                            onClick={(e: any) => { selectListType(e) }}
                        />
                    ) : (
                            <StaticImage
                                src="/images/baseline-add_circle-24px@2xx.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="restrictedFollowers"
                                onClick={(e: any) => { selectListType(e) }}
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
                            onClick={(e: any) => { selectListType(e) }}
                        />
                    ) : (
                            <StaticImage
                                src="/images/baseline-not_interested-24px@2xxx.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="blockedFollowers"
                                onClick={(e: any) => { selectListType(e) }}
                            />
                        )}
                </div>
            </div>
            {/* <ParagraphText className="font-12px text-primary border-bottom"> */}
            <div className="d-flex justify-content-between">
                <div className="text-padding-left-lrg">
                    {displayedListType}
                </div>
                <div className="text-padding-right-lrg">
                    {" "}
                    {!showFilters ? (
                        <StaticImage
                            src="/images/filter not filled.png"
                            top="109px"
                            left="31px"
                            width="22px"
                            height="22px"
                            name="filterStatus"
                            onClick={() => toggleFilters}
                        />
                    ) : (
                            <StaticImage
                                src="/images/filter filled@2x.png"
                                top="109px"
                                left="31px"
                                width="22px"
                                height="22px"
                                name="filterStatus"
                                onClick={() => toggleFilters}
                            />
                        )}
                </div>
            </div>
            {/* </ParagraphText> */}

            <div
                className="pt-2 border-color-radius user-information-sub-text-margin-right-lrg user-information-sub-text-margin-left-lrg"
                style={{ paddingBottom: "45.25%" }}
            >
                {/* Image placeholder */}
                <div className="position-relative ">
                    <BackgroundImage
                        src={[
                            stateCoverImageUrl,
                            "/images/cover_image_placeholder.jpg",
                        ]}
                        paddingBottom={"17.25%"}
                        backgroundPosition="top"
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "23px",
                            width: "73px",
                            height: "71px",
                        }}
                    >
                        <CircularImage
                            src={[
                                stateProfileImageUrl,
                                "/images/profile_image_placeholder.jpg",
                            ]}
                            height="72px"
                            width="72px"
                            border={"1px solid " + theme.colors.primary}
                        />
                    </div>
                    {/* Name tag*/}

                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "121px",
                            width: "102px",
                            height: "22px",
                        }}
                    >
                        <ParagraphText className="font-12px text-primary">
                            {user.name}
                        </ParagraphText>
                    </div>
                    {/* Add to fav list */}
                    <div
                        style={{
                            position: "absolute",
                            top: "135%",
                            left: "120px",
                            width: "120px",
                            height: "10px",
                        }}
                    >
                        {/* <ParagraphText className="font-8px"> */}
                        <div className={"d-flex"}>
                            <StaticImage
                                className="user-information-sub-text-margin-left-xsmall"
                                src="/images/Notification unfilled like@2x.png"
                                width="13px"
                                height="13px"
                                onClick={() => toggleFilters}
                            />
                            <p className="user-information-sub-text-padding-left-small user-information-text-color user-informaton-text-size">
                                Add to Favourtes List
                                </p>
                        </div>
                        {/* </ParagraphText> */}
                    </div>
                    {/* follow/restrict button */}
                    <div
                        style={{
                            position: "absolute",
                            top: "170%",
                            left: "84px",
                            width: "155px",
                            height: "31px",
                        }}
                    >
                        <div className={"d-flex"}>
                            <button className="btn warning text-padding-left-small text-padding-right-small">
                                Restrict{" "}
                                <StaticImage
                                    src="/images/baseline-add_circle-24px@2xx.png"
                                    width="16px"
                                    height="13px"
                                />
                            </button>
                            <button className="btn warning text-padding-left-small text-padding-right-small text-margin-left-lrg">
                                Follow{" "}
                                <StaticImage
                                    src="/images/money_copy@2x.png"
                                    width="16px"
                                    height="13px"
                                />
                            </button>
                        </div>
                    </div>
                    {/* User information */}
                    <div
                        style={{
                            position: "absolute",
                            top: "220%",
                            left: "47px",
                        }}
                    >
                        <div className="d-flex justify-content-around">
                            <div className="p-1">
                                <ParagraphText className="font-8px user-information-text-color">
                                    Recurring Follower
                                </ParagraphText>
                            </div>
                            <div className="p-1 card-details-spacing">
                                <ParagraphText className="font-8px user-information-text-color">
                                    Yes
                                </ParagraphText>
                            </div>
                        </div>
                    </div>
                    {/* 2nd row user information */}
                    <div
                        style={{
                            position: "absolute",
                            top: "265%",
                            left: "47px",
                        }}
                    >
                        <div className="d-flex justify-content-around">
                            <div className="p-1">
                                <ParagraphText className="font-8px user-information-text-color">
                                    Renew Date
                                </ParagraphText>
                            </div>
                            <div className="p-1 card-details-spacing">
                                <ParagraphText className="font-8px user-information-text-color">
                                    March 17, 2020
                                </ParagraphText>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            top: "330%",
                            left: "0px",
                            width: "353px",
                            height: "40px",
                        }}
                    >
                        <div
                            className={
                                "d-flex justify-content-between border-top border-color"
                            }
                        >
                            <ParagraphText className="font-15px text-margin-left-xxxlrg">
                                Subscription
                            </ParagraphText>
                            <ParagraphText className="font-15px text-margin-right-xxxlrg">
                                Earnings
                            </ParagraphText>
                        </div>
                    </div>
                    <div
                        className="font-10px"
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "25px",
                        }}
                    ></div>
                    <div
                        className="font-10px"
                        style={{
                            position: "absolute",
                            top: "110%",
                            right: "25px",
                        }}
                    ></div>
                </div>
            </div>
            {showFilters && (
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
            )}
        </div>
    );
};

export const Followers: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const dispatch = useDispatch();
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const {
        creatorProfile,
        errors,
        showPersonalInformation,
        success,
        defaultPersonalInformation,
    } = bankingInfo;

    useEffect(() => {
        if (showPersonalInformation) {
            const params = { userId: user.id };
            dispatch(BankingInfoActions.GetPersonalInformation(params));
        }
    }, [showPersonalInformation]);

    useEffect(() => {
        const params = { username: user.username };
        dispatch(BankingInfoActions.GetCreatorProfile(params));
    }, []);

    return (
        <div className="d-flex flex-column align-items-center flex-fill body-background">
            <ParagraphText className="text-primary font-25px">
                Followers
            </ParagraphText>
            {!creatorProfile.name && errors.length <= 0 && (
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
            )}
            {creatorProfile.name && (
                <React.Fragment>
                    {!showPersonalInformation ? (
                        <UploadProfileImages
                            coverImageUrl={creatorProfile.coverImageUrl}
                            profileImageUrl={creatorProfile.profileImageUrl}
                            user={user}
                        />
                    ) : (
                            <UploadPersonalInformation
                                user={user}
                                defaultPersonalInformation={
                                    defaultPersonalInformation
                                }
                            />
                        )}
                </React.Fragment>
            )}
            {success.length > 0 && (
                <div className="d-flex flex-column">
                    {success.map((msg: string, i: number) => {
                        return (
                            <div className="text-success font-12px text-center">
                                {msg}
                            </div>
                        );
                    })}
                </div>
            )}
            {errors.length > 0 && (
                <div className="d-flex flex-column">
                    {errors.map((error: string, i: number) => {
                        return (
                            <div className="text-danger font-12px text-center">
                                {error}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
