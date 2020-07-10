import React ,{ useState, useRef, useEffect } from "react";
import { useToasts } from 'react-toast-notifications'
import { IFeedsList, IFeed, IFeedOptions, FEED } from "@Interfaces";
import { BackgroundImage  } from "@Components/Basic";
import { ParagraphText } from "@Components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments, faDollarSign, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { TipSubmitModal }from "../Modals/TipSubmitModal";

import { useModal } from '../Hooks';
import { useSelector, useDispatch } from "react-redux";

import { FeedsActions } from "@Actions";

const FeedOptions: React.FunctionComponent<IFeedOptions.IProps> = ({ likeContent, contentLiked, likes, comments, time, index, toggleTipModal }) => {

    return (<div className="d-flex justify-content-between my-2 pl-2">
        <div className="d-flex align-items-center cursor-pointer" onClick={() => likeContent(index)}>
            <FontAwesomeIcon icon={faHeart} color={contentLiked ? "#F57B52" : "#A0A0A0"} size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ likes }</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
            <FontAwesomeIcon icon={faComments} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ comments || 0 }</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer" onClick={() => toggleTipModal(index)}>
            <FontAwesomeIcon icon={faDollarSign} color="#707070" size="lg" />
            <div className="text-darkGrey font-10px ml-1">Tip</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
            <FontAwesomeIcon icon={faClock} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ time }</div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisV} color="#F57B52" />
        </div>
    </div>);
};

const Feed: React.FunctionComponent<IFeed.IProps> = ({ likeContent, feed, index, toggleTipModal }) => {
    return (
        <div className="w-100 h-100 my-2" style={{ boxShadow: "0 -1px 6px rgba(0,0,0,.1)" }}>
            <BackgroundImage src={feed.mediaUrl} />
            <div className="d-flex flex-column w-100 px-2">
                <ParagraphText className="text-primary lato-semibold font-12px">
                    {feed.title}
                </ParagraphText>
                <ParagraphText className="text-lightGrey lato-semibold font-10px my-0">
                    {feed.username}
                </ParagraphText>
                <FeedOptions 
                    contentLiked={feed.contentLiked} 
                    index={index} 
                    likes={feed.likes} 
                    comments={feed.comments} 
                    time={feed.time} 
                    toggleTipModal={toggleTipModal}
                    likeContent={likeContent}>
                </FeedOptions>
            </div>
        </div>
    );
}

export const FeedsList: React.FunctionComponent<IFeedsList.IProps> = ({ feeds, user }) => {
    const modal = useRef<HTMLDivElement>(null);    
    const [ clickedTipFeed, setClickedTipFeed ] = useState({});
    const {isShowing, toggle} = useModal(modal);
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const toggleTipModal = (index: number) => {
        setClickedTipFeed(feeds[index]);
        toggle();
    }

    const tipSumit = async (feed: FEED, amount: string, message: string) => {
        const param: IFeed.Actions.ITipFeedPayload = { 
            contentId: feed.id, 
            userId: user.id, 
            message: message, 
            amount: parseInt(amount) 
        };
        toggle();
        FeedsActions.TipFeed(param)().then((resp) => {
            if (resp.status) addToast("Tipped Successfuly !", { appearance: 'success' });
            else addToast("Tip Error !", { appearance: 'error' });
        });
    }

    const likeContent = (index: number) => {
        const param: IFeed.Actions.ILikeFeedPayload = { 
            contentId: feeds[index].id, 
            userId: user.id
        }
        dispatch(FeedsActions.LikeFeed(param));
    }

    return (<div className="d-flex flex-column w-100 px-4">
        <TipSubmitModal 
            isShowing={isShowing} 
            clickedFeed={clickedTipFeed} 
            ref={modal} 
            onSubmit={tipSumit} />
            
        {feeds.map((feed, i) => {
            return (<Feed feed={feed} index={i} key={i} 
                toggleTipModal={toggleTipModal} 
                likeContent={likeContent} />);
        })}
    </div>);
}

export const FeedsLoaderDiv: React.FunctionComponent<{}> = () => {
    return (<div>Loading...</div>);
}