import React from "react";
import { IFeedsList, IFeed, IFeedOptions } from "@Interfaces";
import { BackgroundImage  } from "@Components/Basic";
import { ParagraphText, StaticImage } from "@Components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments, faDollarSign, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const FeedOptions: React.FunctionComponent<IFeedOptions.IProps> = ({ likes, comments, time }) => {
    return (<div className="d-flex justify-content-between my-2 pl-2">
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faHeart} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ likes }</div>
        </div>
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faComments} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ comments || 0 }</div>
        </div>
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faDollarSign} color="#707070" size="lg" />
            <div className="text-darkGrey font-10px ml-1">Tip</div>
        </div>
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faClock} color="#F57B52" size="lg" />
            <div className="text-darkGrey font-10px ml-1">{ time }</div>
        </div>
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEllipsisV} color="#F57B52" />
        </div>
    </div>);
};

const Feed: React.FunctionComponent<IFeed.IProps> = ({ feed }) => {
    return (
        <div className="w-100 h-100 my-2" style={{ boxShadow: "0 -1px 6px rgba(0,0,0,.1)" }}>
            <BackgroundImage src={feed.imageUrl} />
            <div className="d-flex flex-column w-100 px-2">
                <ParagraphText className="text-primary lato-semibold font-12px">
                    {feed.title}
                </ParagraphText>
                <ParagraphText className="text-lightGrey lato-semibold font-10px my-0">
                    {feed.username}
                </ParagraphText>
                <FeedOptions likes={feed.likes} comments={feed.comments} time={feed.time}></FeedOptions>
            </div>
        </div>
    );
}

export const FeedsList: React.FunctionComponent<IFeedsList.IProps> = ({ feeds }) => {
    return (<div className="d-flex flex-column w-100 px-4" style={{ marginBottom: "40px" }}>
        {feeds.map((feed, i) => {
            return (<Feed feed={feed} key={i} />);
        })}
    </div>);
}

export const FeedsLoaderDiv: React.FunctionComponent<{}> = () => {
    return (<div>Loading...</div>);
}