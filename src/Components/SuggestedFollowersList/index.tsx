import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FeedsActions } from "@Actions";
import { IStore } from "@Redux/IStore";
import { ISuggestedFollowersList } from "./SuggestedFollowersList";
import { ProfileSuggestion } from "@Components";
import { IFeedsPage } from "@Interfaces";

export const SuggestedFollowersList: React.FunctionComponent<ISuggestedFollowersList.IProps> = (props) => {
  const feedsState = useSelector((state: IStore) => state.feeds);
  const dispatch = useDispatch();
  const [paginationPageNo, setPaginationPageNo] = useState(0);
  const [filter, setFilter] = useState(0);
  const { profilesSuggestion } = feedsState;
  useEffect(() => {
    // const params = {
    //   page: 0,
    //   offset: 7,
    //   filter: 0
    // }
    getProfilesFollowers({});
  }, []);

  const getProfilesFollowers = (params: IFeedsPage.Actions.IGetProfilesSuggestionPayload) => {
    dispatch(FeedsActions.GetProfileSuggestion(params));
  }

  const trackScrolling = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && profilesSuggestion) {
        const params = {
            page: paginationPageNo + 1, 
            offset: 7,
            fileter: filter
        };
        getProfilesFollowers(params);
        setPaginationPageNo(paginationPageNo + 1);
    }
  }

  return (<div className="p-4" onScroll={trackScrolling}>
    <div className="d-flex justify-content-between align-items-center">
      <div className="lato-regular font-13px text-primary">Suggested Followers</div>
      <div className="d-flex cursor-pointer">
        {filter === 0 && <img onClick={() => { setFilter(1); getProfilesFollowers({ filter: 1 }) }} src="/images/price_tag@2x.png" height="22px" width="18px" />}
        {filter === 1 && <img onClick={() => { setFilter(0); getProfilesFollowers({ filter: 0 }) }} src="/images/price_tag_cross@2x.png" height="22px" width="18px" />}
      </div>
    </div>
    {profilesSuggestion.map((profile, i) => {
      return <ProfileSuggestion creatorProfile={profile} key={i} />
    })}
  </div>);
}