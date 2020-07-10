import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import { FEED } from "@Interfaces";
import { CreatorProfileActions } from "@Actions";

import { Tabs, Tab } from "@Components/Basic";
import { FeedsList, ParagraphText, StaticImage } from "@Components";
import { ICreatorContent } from "./CreatorContent";
import { CONTENT_TYPE } from "src/Constants";

export const CreatorContent: React.FunctionComponent<ICreatorContent.IProps> = ({ user, totalContent, totalImage, totalVideos, params, name, isFollower }) => {
    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorFeeds } = creatorProfileState;
    const dispatch = useDispatch();
    const [selectedTab, setSetectedTab] = useState(0);

    useEffect(() => {
        dispatch(CreatorProfileActions.GetCreatorFeeds(params));
    }, []);

    const changeTab = (param: CONTENT_TYPE) => { setSetectedTab(param) }

    const filterFeeds = (feeds: FEED[]): FEED[] => {
        if (!selectedTab) return feeds;

        return feeds.filter((feed, i) => {
            return feed.type === selectedTab;
        });
    }

    return <div className="h-100">
        <Tabs>
            <Tab active={selectedTab === 0} onClick={() => changeTab(0)} border={true}>{ (totalContent ? totalContent : "") + ' Posts' }</Tab>
            <Tab active={selectedTab === 1} onClick={() => changeTab(CONTENT_TYPE.IMAGE)} border={true}>{ (totalImage ? totalImage : "") + ' Images'}</Tab>
            <Tab active={selectedTab === 2} onClick={() => changeTab(CONTENT_TYPE.VIDEO)} border={false}>{ (totalVideos ? totalVideos : "") + ' Videos'}</Tab>
        </Tabs>
        {isFollower === false ? <CreatorContentPrivacy name={name}/> : <React.Fragment>
            <ParagraphText className="gibson-semibold font-16px text-headingBlue px-4 mt-2">Posts</ParagraphText>
            <FeedsList user={user} feeds={filterFeeds(creatorFeeds)} />
        </React.Fragment>}
    </div>
}

const CreatorContentPrivacy: React.FunctionComponent<{ name: string }> = ({ name }) => {
    return <div style={{ minHeight: "400px" }} className="px-5 h-100 w-100 d-flex flex-column align-items-center justify-content-center">
        <StaticImage src="/images/lock@2x.png" height="50px" width="50px" />
        <h4 className="text-primary text-center mt-3 gibson-semibold">Follow { name } to unlock content</h4>
    </div>
}