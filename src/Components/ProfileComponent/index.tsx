// #region Global Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";

import { CreatorProfileActions } from "@Actions";
import { CreatorProfile, CreatorContent } from "@Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{user: USER_SESSION, profileId: string }> = ({ user, profileId }) => {
    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorProfile } = creatorProfileState;
    const { totalContent, totalImages, totalVideos, isFollower, name } = creatorProfile;
    const dispatch = useDispatch();

    const params = { profileId: profileId, userId: user.id };
    useEffect(() => {
        dispatch(CreatorProfileActions.GetCreatorProfile(params));
    }, []);

    return (<div className="bg-gradient d-flex flex-column h-100">
        <div className="back-icon cursor-pointer" onClick={() => Router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} color="white" size="lg" />
        </div>
        <CreatorProfile creatorProfile={creatorProfile} />
        <CreatorContent 
            totalContent={totalContent}
            totalImage={totalImages}
            totalVideos={totalVideos} 
            user={user}
            params={params} 
            isFollower={isFollower} 
            name={name} />
    </div>);
}
