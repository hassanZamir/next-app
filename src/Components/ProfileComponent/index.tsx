/* eslint-disable prettier/prettier */
// #region Global Imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { USER_SESSION } from "@Interfaces";
import { Footer, CreatorProfile, CreatorContent, PaymentSettings } from '@Components';
import { CreatorProfileActions, LoginActions } from "@Actions";
import { AnimatePopup } from "@Components/Basic";
import { PaymentConfirmationModal, UnFollowConfirmationModal, ReturnPolicyModal } from "@Components/Modals";
import { useModal } from "@Components/Hooks";
import Suggestions from "@Pages/suggestions";
import { theme } from "@Definitions/Styled";
import { CCBillAddCardModal } from "@Components/Modals/CCBillAddCardModal";
import { Menu } from "@Components/Menu";
// #endregion Local Imports

export const ProfileComponent: React.FunctionComponent<{
    user: USER_SESSION;
    profileUserName: string;
}> = ({ user, profileUserName }) => {
    const creatorProfileState = useSelector(
        (state: IStore) => state.creatorProfile
    );
    const menuModalRef = useModal(useRef<HTMLDivElement>(null));
    const { creatorProfile, followers, isUserFollowingStatus, isUserFollowing, isProfileFetching } = creatorProfileState;
    const { contentCount, imagesCount, videosCount, name } = creatorProfile;
    // const userFollowings = useSelector(
    //     (state: IStore) => state.followingInfo.defaultFollowingInformation
    // );
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [showPaymentSettingsPopup, setShowPaymentSettingsPopup] = useState(
        false
    );
    const [showRedirectionModal, setShowRedirectionModal] = useState(
        false
    );
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    // Modals Setup
    const followConfirmationModalRef = useModal(useRef<HTMLDivElement>(null));
    const unFollowConfirmationModalRef = useModal(useRef<HTMLDivElement>(null));
    const cancellationPolicyModalRef = useModal(useRef<HTMLDivElement>(null));
    const ccbillAddCardModalRef = useModal(useRef<HTMLDivElement>(null));

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // check if profile exists already in user folllowing
        if (isUserFollowingStatus == "success")
            setIsAlreadyFollowing(isUserFollowing);

    }, [isUserFollowing]);

    useEffect(() => {
        if (user && user.username == profileUserName) {
            dispatch(CreatorProfileActions.GetUserCreatorProfile({
                authtoken: user.token,
                userid: user.id
            }));
        }
        else {
            // TODO: combine the creator profile and follow check
            const params = { username: profileUserName };
            dispatch(CreatorProfileActions.GetActiveCreatorProfile(params));
        }
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

            // if user payment mode is set then use the confirmation dailog
            //          and use the charge by previous id method
            // otherwise initiate the add card modal which will take user to 
            //          external payment processor page and take user payment info

            if (user.paymentMode) {
                followConfirmationModalRef.toggle();
            } else {
                setShowPaymentSettingsPopup(true);
                // here user needs to be redirected to cc bill
                // as falsy paymentmode means user has no active payment mode available
                //    redirectToExternalPaymentGateway()
            }
        } else {
            Router.push({
                pathname: "/login",
                query: { profile: profileUserName },
            });
        }
    };

    const redirectToExternalPaymentGateway = () => {
        setShowRedirectionModal(true);
        ccbillAddCardModalRef.toggle();
    };

    const onLogout = () => {
        dispatch(LoginActions.UserLogout());
    };

    return (
        <div className="w-100 h-100 row flex-column justify-content-between flex-nowrap">
            {user && <div>
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
            </div>}


            {showRedirectionModal && (
                <AnimatePopup animateIn={showRedirectionModal}>
                    {/* <PaymentSettings user={user} /> */}
                    {/* <CCBillAddCardModal
                        user={user}
                        isShowing={ccbillAddCardModalRef.isShowing}
                        toggle={ccbillAddCardModalRef.toggle}
                        creatorProfile={creatorProfile}
                    /> */}
                </AnimatePopup>
            )}
            {
                showPaymentSettingsPopup && (
                    <AnimatePopup animateIn={showPaymentSettingsPopup}>
                        <PaymentSettings user={user} creatorProfile={creatorProfile} />
                    </AnimatePopup>
                )
            }

            <div
                className="custom-scroller"
                style={{ overflowY: "scroll", marginBottom: "40px", flex: 1 }}
                onScroll={(e: any) => {
                    const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 100.0;
                    setScrolledToBottom(bottom);
                    setShowPaymentSettingsPopup(false);
                }}
            >
                <div className="d-flex flex-column">
                    <div
                        className="back-icon cursor-pointer"
                        onClick={() => {
                            const options = { shallow: true };
                            return router.push("/", "/", options);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color={theme.colors.primary}
                            size="lg"
                        />
                    </div>
                    {/* {!creatorProfile.name && <>Loading...</>} */}
                    {creatorProfile && creatorProfile.userName == profileUserName && <>
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
                    </>}

                    {isProfileFetching == false && name === undefined && <>
                        <div style={{ minHeight: "400px" }} className="px-5 w-100 d-flex flex-column align-items-center justify-content-center">
                            <div className="text-primary text-center mt-3 gibson-semibold font-20px">404</div>
                            <div className="text-primary text-center mt-3 gibson-semibold font-20px">No Profile Found!</div>
                        </div>
                        <Suggestions />
                    </>}

                </div>
            </div>
            <Footer
                selected="None"
                session={user}
                onMenuClick={menuModalRef.toggle}
            />
            {user && <Menu
                isShowing={menuModalRef.isShowing}
                toggle={menuModalRef.toggle}
                session={user}
                onLogout={onLogout}
            />}
        </div >
    );
};
