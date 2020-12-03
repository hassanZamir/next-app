import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import Link from "next/link";
import Router from "next/router";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faComments,
    faDollarSign,
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { IFeedsList, IFeed, IFeedOptions, FEED, mediaUrl } from "@Interfaces";
import { BackgroundImage, BackgroundImageSmart } from "@Components/Basic";
import { ParagraphText, VideoPlayer, MediaCarousel } from "@Components";
import { TipSubmitModal } from "../Modals/TipSubmitModal";
import { FeedOptionsModal } from "../Modals/FeedOptionsModal";
import { ReportFeedModal } from "../Modals/ReportFeedModal";
import { CurrentTimeDifference } from "@Services/Time";
import { useModal } from "../Hooks";
import { FeedsActions } from "@Actions";
import { ActionConsts } from "@Definitions";

const mediaBaseUrl = process.env.MEDIA_BASE_URL + "/";

const FeedOptions: React.FunctionComponent<IFeedOptions.IProps> = ({
    likeContent,
    feed,
    index,
    toggleTipModal,
    onReportClick,
    onCopyClick,
    onCommentClick,
}) => {
    const { content_viewer_like, likesCount, commentsCount, timeStamp } = feed;
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    return (
        <div className="d-flex justify-content-between my-2 pl-2">
            <div
                className="d-flex align-items-center cursor-pointer"
                onClick={e => {
                    likeContent(e, index);
                }}
            >
                <img src={content_viewer_like ? "/images/like_filled.svg" : "/images/like.svg"} alt="Like" />
                <div className="text-darkGrey font-10px ml-1">{likesCount}</div>
            </div>
            <Link href={"/profile/" + feed.username + "/status/" + feed.id}>
                <div
                    className="d-flex align-items-center cursor-pointer"
                    onClick={e => {
                        onCommentClick(e, index);
                    }}
                >
                    <img src="/images/comments.svg" />
                    <div className="text-darkGrey font-10px ml-1">
                        {commentsCount || 0}
                    </div>
                </div>
            </Link>
            <div
                className="d-flex align-items-center cursor-pointer"
                onClick={e => {
                    toggleTipModal(e, index);
                }}
            >
                <img src="/images/tip_grey.svg" />
                <div className="text-darkGrey font-10px ml-1">Tip</div>
            </div>
            <div className="d-flex align-items-center cursor-pointer">
                <img src="/images/clock.svg"></img>
                <div className="text-darkGrey font-10px ml-1">
                    {CurrentTimeDifference(timeStamp)}
                </div>
            </div>
            <div
                className="d-flex align-items-center cursor-pointer position-relative"
                onClick={e => {
                    e.preventDefault();
                    toggle();
                }}
            >
                <FeedOptionsModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    onReportClick={onReportClick}
                    onCopyClick={onCopyClick}
                    feed={feed}
                />

                <FontAwesomeIcon icon={faEllipsisV} color="#F57B52" />
            </div>
        </div>
    );
};

const MediaContainer: React.FunctionComponent<{ mediaUrl: mediaUrl[] }> = ({
    mediaUrl,
}) => {
    const [selected, setSelected] = useState(0);
    const mediaRefs: any = [];
    const container: any = useRef(null);
    const [showMediaCarousel, setShowMediaCarousel] = useState(-1);
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    const setMediaRef = (ref: any) => {
        ref !== null && mediaRefs.push(ref);
    };

    const navigateTo = (index: number) => {
        if (index < 0 || index > mediaRefs.length - 1) return;

        if (container.current.scrollTo) {
            container.current.scrollTo({
                left: mediaRefs[index].offsetLeft,
                behavior: "smooth",
            });
        } else {
            container.current.scrollLeft = mediaRefs[index].offsetLeft;
        }
    };

    const renderNavigation = () => {
        return (
            <div
                className="d-flex align-items-center justify-content-center position-absolute bottom-0"
                style={{ left: "45%", right: "45%" }}
            >
                <div className="navigation-dot-background">
                    {mediaUrl.map((validMQ, index) => (

                        <div
                            key={index}
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelected(index);
                                navigateTo(index);
                            }}
                            className={
                                selected === index
                                    ? "navigation-dot active"
                                    : "navigation-dot"
                            }
                        />
                    ))}

                </div>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column position-relative">
            {mediaUrl && mediaUrl.length > 1 && (
                <div
                    className="position-absolute rounded text-white bg-darkGrey font-8px d-flex align-items-center justify-content-center"
                    style={{
                        width: "22px",
                        height: "12px",
                        right: "20px",
                        top: "10px",
                    }}
                >
                    {selected + 1 + "/" + mediaUrl.length}
                </div>
            )}
            <div
                className="scroll-flex"
                ref={container}
                onScroll={e => {
                    const _scrollLeft = container.current.scrollLeft + 20;
                    for (let i = 0; i < mediaRefs.length; i++) {
                        if (_scrollLeft <= 20) {
                            setSelected(0);
                            return;
                        }

                        if (i < mediaRefs.length - 1) {
                            if (
                                _scrollLeft > mediaRefs[i].offsetLeft &&
                                _scrollLeft < mediaRefs[i + 1].offsetLeft
                            ) {
                                setSelected(i);
                                return;
                            }
                        } else {
                            setSelected(mediaRefs.length - 1);
                        }
                    }
                }}
            >
                {mediaUrl &&
                    mediaUrl.map((media, i) => {
                        return (
                            <div
                                key={i}
                                className="scroll-item align-items-center justify-content-center"
                                ref={setMediaRef}
                            >
                                {media.type === 2 && (
                                    <VideoPlayer
                                        onClick={e => {
                                            e.preventDefault();
                                            setShowMediaCarousel(i);
                                            toggle();
                                        }}
                                        videoHeight="260px"
                                        src={
                                            mediaBaseUrl +
                                            media.url +
                                            media.token
                                        }
                                    />
                                )}
                                {media.type === 1 && (
                                    <BackgroundImageSmart
                                        onClick={e => {
                                            setShowMediaCarousel(i);
                                            toggle();
                                        }}
                                        paddingBottom="73.335%"
                                        src={
                                            mediaBaseUrl +
                                            media.url
                                        }
                                        token={media.token}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>
            {mediaUrl && mediaUrl.length > 1 && renderNavigation()}
            {showMediaCarousel >= 0 && (
                <MediaCarousel
                    media={mediaUrl}
                    isShowing={isShowing}
                    modalRef={modalRef}
                    toggle={toggle}
                    startingIndex={showMediaCarousel}
                />
            )}
        </div>
    );
};
const Feed: React.FunctionComponent<IFeed.IProps> = ({
    likeContent,
    feed,
    index,
    toggleTipModal,
    onReportClick,
    onCopyClick,
    onCommentClick,
}) => {
    return (
        <div
            className="w-100 h-100 my-2 move-enter move-enter-active"
            style={{ boxShadow: "0 -1px 6px rgba(0,0,0,.1)" }}
        >
            <MediaContainer mediaUrl={feed.media_url} />
            <div className="d-flex flex-column w-100 px-3">
                <ParagraphText className="text-black lato-semibold font-12px">
                    {feed.title}
                </ParagraphText>
                <Link
                    href="/profile/[username]"
                    as={"/profile/" + feed.username}
                    passHref
                >
                    <span
                        //style={{ textDecoration: "underline" }}
                        className="text-primary lato-semibold font-10px my-0 cursor-pointer"
                    >
                        {feed.name}
                    </span>
                </Link>
                <FeedOptions
                    feed={feed}
                    index={index}
                    toggleTipModal={toggleTipModal}
                    likeContent={likeContent}
                    onReportClick={onReportClick}
                    onCommentClick={onCommentClick}
                    onCopyClick={onCopyClick}
                ></FeedOptions>
            </div>
        </div>
    );
};

export const FeedsList: React.FunctionComponent<IFeedsList.IProps> = ({
    feeds,
    user,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [clickedTipFeed, setClickedTipFeed] = useState({});
    const [reportFeed, setReportFeed] = useState({});
    const [_FEEDS, set_FEEDS] = useState<FEED[]>([]);
    const { isShowing, toggle } = useModal(modalRef);
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const toggleTipModal = (
        e: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        e.preventDefault();
        // Prevent user to tip himself
        if (feeds[index].username == user.username) return;
        setClickedTipFeed(feeds[index]);
        toggle();
    };

    const tipSumit = async (feed: FEED, amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = {
            contentId: feed.id,
            viewerId: user.id,
            message: message,
            amount: parseInt(amount),
            creatorUserName: feed.username,
            authtoken: user.token,
        };
        toggle();
        FeedsActions.TipFeed(param)().then(resp => {
            if (resp.status)
                addToast("Tipped Successfuly !", { appearance: "success" });
            else addToast("Tip Error !", { appearance: "error" });
        });
    };

    const updateLikeStatus = (like: boolean, contentId: number) => {
        const updatedFeeds = feeds.map(feed => {
            if (feed.id === contentId) {
                feed.content_viewer_like = like ? true : false;
                like ? feed.likesCount++ : feed.likesCount--;
            }
            return feed;
        });
        return updatedFeeds;
    };
    const likeContent = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault();

        const param: IFeed.Actions.ILikeFeedPayload = {
            contentId: feeds[index].id,
            userId: user.id,
            authtoken: user.token,
        };
        if (_FEEDS && _FEEDS[index] && !_FEEDS[index].content_viewer_like) {
            FeedsActions.LikeFeed(param)().then(resp => {
                if (resp.status) {
                    set_FEEDS(updateLikeStatus(true, feeds[index].id));
                }
            });
        } else {
            FeedsActions.UnLikeFeed(param)().then(resp => {
                if (resp.status) {
                    set_FEEDS(updateLikeStatus(false, feeds[index].id));
                }
            });
        }

        // if (!feeds[index].content_viewer_like) {
        //     dispatch(FeedsActions.LikeFeed(param));
        // } else {
        //     dispatch(FeedsActions.UnLikeFeed(param));
        // }
    };

    const onReportClick = (feed: FEED) => {
        setReportFeed(feed);
        toggle();
    };

    const onCopyClick = (feed: FEED) => {
        // const input: Input = document.createElement("INPUT");
        // input.setAttribute("value", "asssa");
        // input.select();
        // input.setSelectionRange(0, 99999);
        // document.execCommand("copy");
    };

    const onCommentClick = (
        e: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        const selectedFeed = feeds[index];
        dispatch({
            payload: { feed: selectedFeed },
            type: ActionConsts.Feeds.SetPersistFeed,
        });

        Router.push({
            pathname:
                "/profile/" +
                selectedFeed.username +
                "/status/" +
                selectedFeed.id,
        });
    };

    useEffect(() => {
        if (feeds && feeds.length > 0) set_FEEDS(feeds);
    }, [feeds]);


    if (feeds && feeds.length <= 0)
        return (
            <div className="d-flex flex-column w-100 px-0">
                <ParagraphText className="font-20px text-primary">
                    No Content To Show
                </ParagraphText>
            </div>
        );

    return (
        <div className="d-flex flex-column w-100 px-0">
            {"id" in clickedTipFeed && (
                <TipSubmitModal
                    isShowing={isShowing}
                    clickedFeed={clickedTipFeed}
                    modalRef={modalRef}
                    onSubmit={tipSumit}
                />
            )}

            {"id" in reportFeed && (
                <ReportFeedModal
                    isShowing={isShowing}
                    toggle={toggle}
                    modalRef={modalRef}
                    feed={reportFeed}
                    user={user}
                />
            )}

            {_FEEDS &&
                _FEEDS.map((feed: FEED, i: number) => {
                    return feed != undefined && "id" in feed ? (
                        <Feed
                            feed={feed}
                            index={i}
                            key={feed.id}
                            toggleTipModal={toggleTipModal}
                            likeContent={likeContent}
                            onReportClick={onReportClick}
                            onCommentClick={onCommentClick}
                            onCopyClick={onCopyClick}
                        />
                    ) : null;
                })}
        </div>
    );
};

export const FeedsLoaderDiv: React.FunctionComponent<{}> = () => {
    return <div>Loading...</div>;
};
