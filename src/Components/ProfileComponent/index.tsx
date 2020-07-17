// #region Global Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION, CREATOR_PROFILE } from "@Interfaces";

import { CreatorProfileActions } from "@Actions";
import { CreatorProfile, CreatorContent } from "@Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{user: USER_SESSION, profileUserName: string }> = ({ user, profileUserName }) => {
    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorProfile } = creatorProfileState;
    const { contentCount, imagesCount, videosCount, name } = creatorProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { username: profileUserName };
        dispatch(CreatorProfileActions.GetCreatorProfile(params));
    }, []);

    const onFollow = (followOrUnFollow: boolean) => {
        // const followParams = { profileId: profileId, userId: user.id, shouldFollow: followOrUnFollow};
        // if (followOrUnFollow) {
        //     dispatch(CreatorProfileActions.FollowProfile(followParams));
        // } else {
        //     dispatch(CreatorProfileActions.FollowProfile(followParams));
        // }
    }

    return (<div className="bg-gradient d-flex flex-column h-100">
        <div className="back-icon cursor-pointer" onClick={() => Router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} color="white" size="lg" />
        </div>
        <CreatorProfile creatorProfile={creatorProfile} onFollow={onFollow} />
        <CreatorContent 
            contentCount={contentCount}
            imagesCount={imagesCount}
            videosCount={videosCount} 
            user={user}
            profileUserName={profileUserName}
            name={name} 
            isFollower={true} />
    </div>);
}
