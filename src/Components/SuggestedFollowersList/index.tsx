import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FeedsActions } from "@Actions";
import { IStore } from "@Redux/IStore";
import { ISuggestedFollowersList } from "./SuggestedFollowersList";
import { ProfileSuggestion } from "@Components";

export const SuggestedFollowersList: React.FunctionComponent<ISuggestedFollowersList.IProps> = (props) => {
  const [filter, setFilter] = useState(0);
  const { profilesSuggestion } = props;

  return (<div className="p-4">
    <div className="d-flex justify-content-between align-items-center">
      <div className="lato-regular font-13px text-primary">Suggested Followers</div>
      {/* <div className="d-flex cursor-pointer">
        {filter === 0 && <img onClick={() => { setFilter(1); onFilterClick(1) }} src="/images/price_tag@2x.png" height="22px" width="18px" />}
        {filter === 1 && <img onClick={() => { setFilter(0); onFilterClick(0) }} src="/images/price_tag_cross@2x.png" height="22px" width="18px" />}
      </div> */}
    </div>
    {profilesSuggestion.map((profile, i) => {
      return <ProfileSuggestion creatorProfile={profile} key={i} />
    })}
  </div>);
}