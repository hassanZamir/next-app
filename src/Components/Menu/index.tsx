import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCog,
    faListUl,
    faPowerOff,
    faQuestionCircle,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { USER_SESSION } from "@Interfaces";
import Link from "next/link";
import { useModal } from "@Components/Hooks";
import { AddCardModal } from "@Components/Modals/AddCardModal";

const mediaBaseUrl = process.env.MEDIA_BASE_URL; // TODO: convert to env

export const Menu: React.FunctionComponent<{
    isShowing: boolean;
    toggle: () => void;
    session: USER_SESSION;
    onLogout: () => void;
}> = ({ isShowing, toggle, session, onLogout }) => {

    const addCardModalRef = useModal(useRef<HTMLDivElement>(null));

    return (
        <React.Fragment>
            <div
                id="mySidenav"
                className="sidenav"
                style={{
                    width: isShowing ? "80%" : "0px",
                    maxWidth: "300px",
                }}
            >
                <div className="closebtn link-anchor" onClick={() => toggle()}>
                    &times;
                </div>
                <Link href={"/profile/" + session.username}>
                    <div className="d-flex flex-row bd-highlight mb-3 link-anchor">
                        <div className="p-2 bd-highlight">
                            <img
                                className="menu-profile-picture"
                                src={
                                    session.profileImageUrl
                                        ? mediaBaseUrl +
                                        "/" +
                                        session.profileImageUrl
                                        : "/images/profile_image_placeholder.jpg"
                                }
                                alt="Avatar"
                            />
                            {/* <span className="menu-profile-badge">
                                <img
                                    src={
                                        session.isCreator
                                            ? "images/baseline-check_circle-24px@2x.png"
                                            : "images/baseline-check_circle_outline-24px@2x.png"
                                    }
                                ></img>
                            </span> */}
                        </div>
                        <div className="p-2 bd-highlight align-self-center">
                            <span className="ml-2 menu-profile-picture-details">
                                {session.name} <br />
                                <span className="tag-profile-name">
                                    @{session.username}
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
                <Link href={`/profile/${session.username}`}>
                    <div className="link-anchor">
                        <img src="/images/profile.svg" alt="Profile Icon"></img>
                        <span className="ml-2">Profile</span>
                    </div>
                </Link>
                {session.isCreator && (
                    <Link href="/followersinfo">
                        <div className="link-anchor">
                            <img src="/images/followers.svg" alt="Followers Icon"></img>
                            <span className="ml-2">Followers</span>
                            {session.followersCount > 0 && <span className="badge badge--line badge--smaller mr-1">
                                {session.followersCount}
                            </span>}
                        </div>
                    </Link>
                )}
                <Link href="/followinginfo">
                    <div className="link-anchor">
                        <img src="/images/followings.svg" alt="Following Icon"></img>
                        <span className="ml-2">Following</span>
                        {/* {session.followingCount > 0 && <span className="badge badge--line badge--smaller mr-1">
                            {session.followingCount}
                        </span>} */}
                    </div>
                </Link>
                <hr />
                <Link href="/settings">
                    <div className="link-anchor">
                        <img src="/images/settings.svg" alt="Settings Icon"></img>
                        <span className="ml-2">Settings</span>
                    </div>
                </Link>
                <Link href="#">
                    <div className="link-anchor">
                        <img src="/images/statements.svg" alt="Statements Icon"></img>
                        <span className="ml-2">Statements</span>
                    </div>
                </Link>
                <hr />
                <Link href="/payments">
                    <div className="link-anchor">
                        <img src="/images/cards.svg" alt="Card Icon"></img>
                        <span className="ml-2">
                            {session.cardNumber ? `Payments` : `Add Card`}
                            {!session.cardNumber && (
                                <span className="menu-icon-color">
                                    {" "}
                                    ( To Follow )
                                </span>
                            )}
                        </span>
                    </div>
                </Link>

                <Link href="/account-upgrade">
                    <div className="link-anchor">
                        <img src="/images/bank.svg" alt="Bank Icon"></img>
                        <span className="ml-2">
                            {session.isCreator
                                ? `Bank Account Info`
                                : `Upgrade Account`}
                            {!session.isCreator && (
                                <span className="menu-icon-color">
                                    {" "}
                                    ( To Earn )
                                </span>
                            )}
                        </span>
                    </div>
                </Link>
                <hr />
                <Link href="/support">
                    <div className="link-anchor">
                        <img src="/images/help.svg" alt="Help Icon"></img>
                        <span className="ml-2">Help & Support</span>
                    </div>
                </Link>
                <Link href="/login">
                    <div className="link-anchor" onClick={() => onLogout()}>
                        <img src="/images/logout.svg" alt="Logout Icon"></img>
                        <span className="ml-2">Logout </span>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
};
