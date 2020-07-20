// #region Global Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";

import { Footer } from '@Components';
import { CreatorProfileActions } from "@Actions";
import { CreatorProfile, CreatorContent } from "@Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{user: USER_SESSION, profileUserName: string }> = ({ user, profileUserName }) => {
    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorProfile, followers } = creatorProfileState;
    const { contentCount, imagesCount, videosCount, name } = creatorProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { username: profileUserName };
        dispatch(CreatorProfileActions.GetCreatorProfile(params));

        if (user && user.id) {
            const followersParams = { userId: user.id, username: profileUserName }
            dispatch(CreatorProfileActions.GetProfileFollowers(followersParams));
        }
    }, []);

    const onFollow = (followOrUnFollow: boolean) => {
        if (user && user.id) {
            const followParams = { 
                username: profileUserName, 
                userId: user.id, 
                shouldFollow: followOrUnFollow
            };
            if (followOrUnFollow) {
                dispatch(CreatorProfileActions.FollowProfile(followParams));
            } else {
                dispatch(CreatorProfileActions.UnFollowProfile(followParams));
            }
        } else {
            Router.push({
                pathname: "/login",
                query: { profile: profileUserName }
            });
        }
    }

    return (<div className="w-100 row flex-column justify-content-between flex-nowrap">
        <div style={{ marginBottom: "40px" }}>
            <div className="bg-gradient d-flex flex-column h-100">
                <div className="back-icon cursor-pointer" onClick={() => Router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" size="lg" />
                </div>
                <CreatorProfile 
                    creatorProfile={creatorProfile} 
                    onFollow={onFollow} 
                    isFollower={followers && followers[0] && followers[0].userId === user.id} />

                <CreatorContent 
                    contentCount={contentCount}
                    imagesCount={imagesCount}
                    videosCount={videosCount} 
                    user={user}
                    profileUserName={profileUserName}
                    name={name} 
                    onFollow={onFollow} 
                    isFollower={followers[0] && followers[0].userId === user.id} />
            </div>
        </div>
        <Footer selected="Profile" />
    </div>);
}
