// #region Global Imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";
import { Footer } from '@Components';
import { CreatorProfileActions } from "@Actions";
import { useModal } from '../Hooks';
import { CreatorProfile, CreatorContent, PaymentSettings } from "@Components";
import { AnimatePopup } from "@Components/Basic";
import { PaymentConfirmationModal } from "@Components/Modals/PaymentConfirmationModal";
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{user: USER_SESSION, profileUserName: string }> 
    = ({ user, profileUserName }) => {

    const creatorProfileState = useSelector((state: IStore) => state.creatorProfile);
    const { creatorProfile, followers } = creatorProfileState;
    const { contentCount, imagesCount, videosCount, name } = creatorProfile;
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);
    const [showPaymentSettings, setShowPaymentSettings] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { username: profileUserName };
        dispatch(CreatorProfileActions.GetCreatorProfile(params));

        if (user && user.id) {
            const followersParams = { userId: user.id, username: profileUserName }
            dispatch(CreatorProfileActions.GetProfileFollowers(followersParams));
        }
    }, []);

    const sendFollowRequest = (followOrUnFollow: boolean) => {
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
    }

    const onFollow = (followOrUnFollow: boolean) => {
        if (user && user.id) {
            if (user.paymentMode) toggle();
            else setShowPaymentSettings(true);
        } else {
            Router.push({
                pathname: "/login",
                query: { profile: profileUserName }
            });
        }
    }
    
    return (<div className="w-100 row flex-column justify-content-between flex-nowrap">
        <PaymentConfirmationModal 
            toggle={toggle}
            isShowing={isShowing}  
            modalRef={modalRef} 
            profileUserName={creatorProfile.name} 
            onFollowConfirm={sendFollowRequest} 
            paymentMode={user.paymentMode} 
            creatorProfile={creatorProfile} />
        
        {showPaymentSettings && <AnimatePopup>
            <PaymentSettings user={user} />
        </AnimatePopup>}

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
        {/* <Footer selected="Profile" user={user} /> */}
    </div>);
}
