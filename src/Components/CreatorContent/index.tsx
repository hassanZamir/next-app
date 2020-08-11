import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import { FEED } from "@Interfaces";
import { CreatorProfileActions } from "@Actions";

import { Tabs, Tab } from "@Components/Basic";
import { FeedsList, ParagraphText, StaticImage, PrimaryButton } from "@Components";
import { ICreatorContent } from "./CreatorContent";
import { CONTENT_TYPE } from "src/Constants";

export const CreatorContent: React.FunctionComponent<ICreatorContent.IProps> 
    = ({ user, scrolledToBottom, followingFee, contentCount, imagesCount, videosCount, name, profileUserName, isFollower, onFollow }) => {

    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorFeeds } = creatorProfileState;
    const dispatch = useDispatch();
    const [selectedTab, setSetectedTab] = useState(0);
    const [paginationPageNo, setPaginationPageNo] = useState(0);

    useEffect(() => {
        if (isFollower) {
            const params = {
                username: profileUserName,
                type: 0,
                page: paginationPageNo,
                offset: 5,
                viewer: user ? user.id : 0
            };
            dispatch(CreatorProfileActions.GetCreatorFeeds(params));
        }
    }, [isFollower]);

    useEffect(() => {
        if (creatorFeeds && creatorFeeds.length > 0 && scrolledToBottom) {
            const params = {
                username: profileUserName,
                type: 0,
                page: paginationPageNo + 1,
                offset: 5,
                viewer: user ? user.id : 0
            };
            dispatch(CreatorProfileActions.GetCreatorFeeds(params))
            setPaginationPageNo(paginationPageNo+1)
        }
    }, [scrolledToBottom]);
    
    const changeTab = (param: CONTENT_TYPE) => { setSetectedTab(param) }

    const filterFeeds = (feeds: FEED[]): FEED[] => {
        if (!selectedTab) return feeds;

        return feeds.filter((feed, i) => {
            return feed.media_url.find((media) => { 
                return media.type === selectedTab
            }) && feed;
        });
    }

    return <div className="h-100">
        <Tabs>
            <Tab active={selectedTab === 0} onClick={() => changeTab(0)} border={true}>{ (contentCount ? contentCount : "") + ' Posts' }</Tab>
            <Tab active={selectedTab === 1} onClick={() => changeTab(CONTENT_TYPE.IMAGE)} border={true}>{ (imagesCount ? imagesCount : "") + ' Images'}</Tab>
            <Tab active={selectedTab === 2} onClick={() => changeTab(CONTENT_TYPE.VIDEO)} border={false}>{ (videosCount ? videosCount : "") + ' Videos'}</Tab>
        </Tabs>
        {!isFollower ? <CreatorContentPrivacy name={name} onFollow={onFollow} followingFee={followingFee} /> : <React.Fragment>
            <ParagraphText className="gibson-semibold font-16px text-headingBlue px-4 mt-2">Posts</ParagraphText>
            {
                creatorFeeds && creatorFeeds.length > 0 ? <FeedsList
                    user={user} 
                    feeds={filterFeeds(creatorFeeds)} /> :
                <div style={{ minHeight: "400px" }} className="px-5 w-100 d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-primary text-center mt-3 gibson-semibold">No content to show</h4>
                </div>
            }
        </React.Fragment>}
    </div>
}

const CreatorContentPrivacy: React.FunctionComponent<{ followingFee: number, name: string, onFollow: (followOrUnfolow: boolean)=>void }> 
    = ({ name, onFollow, followingFee }) => {
    return <div style={{ minHeight: "400px" }} className="px-5 w-100 d-flex flex-column align-items-center justify-content-center">
        <StaticImage src="/images/lock@2x.png" height="50px" width="50px" />
        <h4 className="text-primary text-center mt-3 gibson-semibold">Follow { name } to unlock content</h4>
        <PrimaryButton onClick={() => onFollow(true)} isActive={true} className="gibson-semibold font-12px">Follow for ${ followingFee } a month</PrimaryButton>
    </div>
}