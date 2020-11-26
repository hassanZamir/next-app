/* eslint-disable prettier/prettier */
// #region Global Imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";
import { Footer, CreatorProfile, CreatorContent, PaymentSettings, PaymentSettingsContainer } from '@Components';
import { CreatorProfileActions, FollowingInfoAction, LoginActions } from "@Actions";
import { AnimatePopup } from "@Components/Basic";
import { PaymentConfirmationModal, UnFollowConfirmationModal, ReturnPolicyModal } from "@Components/Modals";
import { useModal } from "@Components/Hooks";
import { TYPE_ALL_FOLLOWING } from "config/FollowingConfigrator";
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{
    user: USER_SESSION;
    profileUserName: string;
}> = ({ user, profileUserName }) => {
    const creatorProfileState = useSelector(
        (state: IStore) => state.creatorProfile
    );
    const { creatorProfile, followers, isUserFollowingStatus, isUserFollowing } = creatorProfileState;
    const { contentCount, imagesCount, videosCount, name } = creatorProfile;
    // const userFollowings = useSelector(
    //     (state: IStore) => state.followingInfo.defaultFollowingInformation
    // );
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [showPaymentSettingsPopup, setShowPaymentSettingsPopup] = useState(
        false
    );
    const [showPaymentSettingsModal, setShowPaymentSettingsModal] = useState(
        false
    );
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    // Modals Setup
    const followConfirmationModalRef = useModal(useRef<HTMLDivElement>(null));
    const unFollowConfirmationModalRef = useModal(useRef<HTMLDivElement>(null));
    const cancellationPolicyModalRef = useModal(useRef<HTMLDivElement>(null));

    const dispatch = useDispatch();

    useEffect(() => {
        // check if profile exists already in user folllowing
        if (isUserFollowingStatus == "success")
            setIsAlreadyFollowing(isUserFollowing);

    }, [isUserFollowing]);

    useEffect(() => {
        // TODO: combine the creator profile and follow check
        const params = { username: profileUserName };
        dispatch(CreatorProfileActions.GetActiveCreatorProfile(params));

        // if its not user's own profile then check profile following status
        if (user && user.username && user.username != profileUserName) {
            dispatch(CreatorProfileActions.CheckUserProfileFollowing({
                authtoken: user.token,
                userId: user.id,
                creatorUsername: profileUserName,
            }))
        }
    }, [followers, isAlreadyFollowing]);

    const sendFollowRequest = () => {
        const followParams = {
            authtoken: user.token,
            username: profileUserName,
            userId: user.id,
            shouldFollow: true,
        };
        dispatch(CreatorProfileActions.FollowProfile(followParams));
    };
    const sendUnFollowRequest = () => {
        const unFollowParams = {
            authtoken: user.token,
            username: profileUserName,
            userId: user.id,
            shouldFollow: false,
        };
        dispatch(CreatorProfileActions.UnFollowProfile(unFollowParams));
    };

    const onFollow = (wantToFollow: boolean) => {
        if (!wantToFollow) {
            unFollowConfirmationModalRef.toggle();
        } else if (user && user.id) {
            if (user.paymentMode) {
                followConfirmationModalRef.toggle();
            } else setShowPaymentSettingsPopup(true);
        } else {
            Router.push({
                pathname: "/login",
                query: { profile: profileUserName },
            });
        }
    };

    const onPaymentSettingsClick = () => {
        setShowPaymentSettingsModal(true);
        setShowPaymentSettingsPopup(false);
    };

    return (
        <div className="w-100 h-100 row flex-column justify-content-between flex-nowrap">
            <PaymentConfirmationModal
                toggle={followConfirmationModalRef.toggle}
                isShowing={followConfirmationModalRef.isShowing}
                profileUserName={creatorProfile.name}
                onConfirm={sendFollowRequest}
                paymentMode={user.paymentMode}
                creatorProfile={creatorProfile}
            />

            <UnFollowConfirmationModal
                isShowing={unFollowConfirmationModalRef.isShowing}
                toggle={unFollowConfirmationModalRef.toggle}
                onConfirm={sendUnFollowRequest}
                returnPolicyModalToggle={cancellationPolicyModalRef.toggle}
            />

            <ReturnPolicyModal
                isShowing={cancellationPolicyModalRef.isShowing}
                toggle={cancellationPolicyModalRef.toggle}
            />

            {showPaymentSettingsPopup && (
                <AnimatePopup animateIn={showPaymentSettingsPopup}>
                    <PaymentSettings user={user} />
                </AnimatePopup>
            )}

            <div
                className="custom-scroller"
                style={{ overflowY: "scroll", marginBottom: "40px", flex: 1 }}
                onScroll={(e: any) => {
                    const bottom =
                        e.target.scrollHeight - e.target.scrollTop ===
                        e.target.clientHeight;
                    setScrolledToBottom(bottom);
                    setShowPaymentSettingsPopup(false);
                }}
            >
                <div className="bg-gradient d-flex flex-column">
                    <div
                        className="back-icon cursor-pointer"
                        onClick={() => {
                            return Router.back();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color="white"
                            size="lg"
                        />
                    </div>
                    <CreatorProfile
                        creatorProfile={creatorProfile}
                        onFollow={onFollow}
                        isFollower={isAlreadyFollowing}
                        user={user}
                    />

                    <CreatorContent
                        scrolledToBottom={scrolledToBottom}
                        followingFee={creatorProfile.followingFee}
                        contentCount={contentCount}
                        imagesCount={imagesCount}
                        videosCount={videosCount}
                        user={user}
                        profileUserName={profileUserName}
                        name={name}
                        onFollow={onFollow}
                        isFollower={isAlreadyFollowing}
                    />
                </div>
            </div>
            <Footer
                selected="None"
                session={user}
                onMenuClick={() => { }} // TODO: Fix this
            />

            <PaymentSettingsContainer
                session={user}
                showPaymentSettings={showPaymentSettingsModal}
                onModalClose={() => {
                    setShowPaymentSettingsModal(false);
                }}
            />
        </div>
    );
};
