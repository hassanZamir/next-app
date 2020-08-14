import React ,{ useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { useToasts } from 'react-toast-notifications'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments, faDollarSign, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { IFeedsList, IFeed, IFeedOptions, FEED, mediaUrl } from "@Interfaces";
import { BackgroundImage } from "@Components/Basic";
import { ParagraphText, VideoPlayer } from "@Components";
import { TipSubmitModal } from "../Modals/TipSubmitModal";
import { FeedOptionsModal } from "../Modals/FeedOptionsModal";
import { ReportFeedModal } from "../Modals/ReportFeedModal";
import { CurrentTimeDifference }from "@Services/Time";
import { useModal } from '../Hooks';
import { FeedsActions } from "@Actions";
import { ActionConsts } from "@Definitions";

const mediaBaseUrl = 'https://venodev.blob.core.windows.net/veno-media';

const FeedOptions: React.FunctionComponent<IFeedOptions.IProps> = 
    ({ likeContent, feed, index, toggleTipModal, onReportClick, onCopyClick, onCommentClick }) => {

    const { content_viewer_like, likesCount, commentsCount, timeStamp } = feed;
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);

    return (<div className="d-flex justify-content-between my-2 pl-2">
        <div className="d-flex align-items-center cursor-pointer" onClick={(e) => {likeContent(e, index)}}>
            <FontAwesomeIcon icon={faHeart} color={content_viewer_like ? "#F57B52" : "#A0A0A0"} size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ likesCount }</div>
        </div>
        <Link href={"/profile/" + feed.username + "/status/" + feed.id}>
        <div className="d-flex align-items-center cursor-pointer" onClick={(e) => {onCommentClick(e, index)}}>
            <FontAwesomeIcon icon={faComments} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ commentsCount || 0 }</div>
        </div>
        </Link>
        <div className="d-flex align-items-center cursor-pointer" onClick={(e) => {toggleTipModal(e, index)}}>
            <FontAwesomeIcon icon={faDollarSign} color="#707070" size="lg" />
            <div className="text-darkGrey font-10px ml-1">Tip</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
            <FontAwesomeIcon icon={faClock} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ CurrentTimeDifference(timeStamp) }</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer position-relative" 
            onClick={(e) => {e.preventDefault(); toggle();}}>
           <FeedOptionsModal 
                isShowing={isShowing} 
                modalRef={modalRef} 
                onReportClick={onReportClick} 
                onCopyClick={onCopyClick} 
                feed={feed} />

            <FontAwesomeIcon icon={faEllipsisV} color="#F57B52" />
        </div>
    </div>);
};

const MediaContainer: React.FunctionComponent<{ mediaUrl: mediaUrl[]}>
    = ({ mediaUrl }) => {
    
    const [selected, setSelected] = useState(0);
    const mediaRefs: any = [];
    const container: any = useRef(null);

    const setMediaRef = (ref: any) => {
        ref !== null && mediaRefs.push(ref);
    }

    const navigateTo = (index: number) => {
        if (index < 0 || index > (mediaRefs.length - 1) ) return;
        
        if (container.current.scrollTo) {
            container.current.scrollTo({
                left: mediaRefs[index].offsetLeft,
                behavior: 'smooth',
            });
        } else {
            container.current.scrollLeft = mediaRefs[index].offsetLeft;        
        }
    }
    
    const renderNavigation = () => {
        return (<div className="d-flex align-items-center justify-content-center position-absolute bottom-0"
            style={{ left: "45%", right: "45%" }}>

            {mediaUrl.map((validMQ, index) => (
              <div
                  key={index}
                  onClick={() => { setSelected(index); navigateTo(index) }}
                  className={selected === index ? "navigation-dot active" : "navigation-dot"}
                />
            ))}
        </div>);
    }
    
    return (<div className="d-flex flex-column position-relative">
        {mediaUrl.length > 1 && <div className="position-absolute rounded text-white bg-darkGrey font-8px d-flex align-items-center justify-content-center" 
            style={{ width: "22px", height: "12px", right: "20px", top: "10px" }}>
            {(selected + 1) + '/' + mediaUrl.length}
        </div>}
        <div className="scroll-flex" ref={container}>
            {mediaUrl.map((media, i) => {
                return <div key={i}
                        className="scroll-item align-items-center justify-content-center"
                        ref={setMediaRef}>
                            {media.type === 2 && <VideoPlayer src={mediaBaseUrl + '/' + media.url + media.token}  />}
                            {media.type === 1 && <BackgroundImage paddingBottom="54.25%" src={ [mediaBaseUrl + '/' + media.url + media.token, '/images/feed_placeholder.png'] } />}
                            {/* {media.type === 1 && <BackgroundImage src={"https://storage.cricingif.com/cig-live-images/article-images/reduce/620x350/74327.jpg?v=2020-08-06T19:45:35.177Z"} />} */}
                </div>
            })}
        </div>
        {mediaUrl.length > 1 && renderNavigation()}
    </div>);
}
const Feed: React.FunctionComponent<IFeed.IProps> 
    = ({ likeContent, feed, index, toggleTipModal, onReportClick, onCopyClick, onCommentClick }) => {
    return (
        <div className="w-100 h-100 my-2 move-enter move-enter-active" style={{ boxShadow: "0 -1px 6px rgba(0,0,0,.1)" }}>
            <MediaContainer mediaUrl={feed.media_url} />
            <div className="d-flex flex-column w-100 px-2">
                <ParagraphText className="text-primary lato-semibold font-12px">
                    {feed.title}
                </ParagraphText>
                <Link href="/profile/[username]" as={"/profile/" + feed.username} passHref>
                    <span style={{ textDecoration: "underline" }} className="text-lightGrey lato-semibold font-10px my-0 cursor-pointer">{feed.username}</span>
                </Link>
                <FeedOptions 
                    feed={feed}
                    index={index}
                    toggleTipModal={toggleTipModal}
                    likeContent={likeContent}
                    onReportClick={onReportClick} 
                    onCommentClick={onCommentClick}
                    onCopyClick={onCopyClick}>
                </FeedOptions>
            </div>
        </div>
    );
}

export const FeedsList: React.FunctionComponent<IFeedsList.IProps> = ({ feeds, user }) => {
    const modalRef = useRef<HTMLDivElement>(null);    
    const [ clickedTipFeed, setClickedTipFeed ] = useState({});
    const [ reportFeed, setReportFeed ] = useState({});
    const [_FEEDS, set_FEEDS] = useState<FEED[]>([]);
    const { isShowing, toggle } = useModal(modalRef);
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const toggleTipModal = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault();
        setClickedTipFeed(feeds[index]);
        toggle();
    }

    const tipSumit = async (feed: FEED, amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = { 
            contentId: feed.id, 
            viewerId: user.id, 
            message: message, 
            amount: parseInt(amount),
            creatorUserName: feed.username
        };
        toggle();
        FeedsActions.TipFeed(param)().then((resp) => {
            if (resp.status) addToast("Tipped Successfuly !", { appearance: 'success' });
            else addToast("Tip Error !", { appearance: 'error' });
        });
    }

    const updateLikeStatus = (like: boolean, contentId: number) => {
        const updatedFeeds = feeds.map((feed) => {
            if (feed.id === contentId) {
                feed.content_viewer_like = (like ? true : false);
                like ? feed.likesCount++ : feed.likesCount--
            }
            return feed;
        });  
        return updatedFeeds;
    }
    const likeContent = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault();

        const param: IFeed.Actions.ILikeFeedPayload = { 
            contentId: feeds[index].id, 
            userId: user.id
        }
        if (_FEEDS && _FEEDS[index] && !_FEEDS[index].content_viewer_like) {
            FeedsActions.LikeFeed(param)().then((resp) => {
                if (resp.status) {
                    set_FEEDS(updateLikeStatus(true, feeds[index].id));
                }
            });
        } else {
            FeedsActions.UnLikeFeed(param)().then((resp) => {
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
    }

    const onReportClick = (feed: FEED) => {
        setReportFeed(feed);
        toggle();
    }

    const onCopyClick = (feed: FEED) => {
        // const input: Input = document.createElement("INPUT");
        // input.setAttribute("value", "asssa");

        // input.select();
        // input.setSelectionRange(0, 99999);
        // document.execCommand("copy");
        console.log("Copy link address");
    }

    const onCommentClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
        const selectedFeed = feeds[index];
        dispatch({
            payload: { feed: selectedFeed },
            type: ActionConsts.Feeds.SetPersistFeed
        });

        Router.push({
            pathname: "/profile/" + selectedFeed.username + "/status/" + selectedFeed.id
        });
    }

    useEffect(() => {
        if (feeds && feeds.length > 0) set_FEEDS(feeds);
    }, [feeds]);

    if (feeds && feeds.length <= 0)
        return <div className="d-flex flex-column w-100 px-4">
            <ParagraphText className="font-20px text-primary">No Content To Show</ParagraphText>
        </div>

    return (<div className="d-flex flex-column w-100 px-4">
            
        {'id' in clickedTipFeed && <TipSubmitModal 
            isShowing={isShowing} 
            clickedFeed={clickedTipFeed} 
            modalRef={modalRef} 
            onSubmit={tipSumit} />}
        
        {'id' in reportFeed && <ReportFeedModal 
            isShowing={isShowing} 
            toggle={toggle}
            modalRef={modalRef} 
            feed={reportFeed} 
            user={user} />}

        {_FEEDS && _FEEDS.map((feed: FEED, i: number) => {
            return ('id' in feed ? <Feed feed={feed} 
                index={i} 
                key={i} 
                toggleTipModal={toggleTipModal} 
                likeContent={likeContent} 
                onReportClick={onReportClick} 
                onCommentClick={onCommentClick}
                onCopyClick={onCopyClick} /> : null);
        })}
    </div>);
}

export const FeedsLoaderDiv: React.FunctionComponent<{}> = () => {
    return (<div>Loading...</div>);
}