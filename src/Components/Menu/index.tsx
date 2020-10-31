import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { USER_SESSION } from "@Interfaces";
import Link from "next/link";
import { CircularImage } from "@Components"

const mediaBaseUrl = "https://venodev.blob.core.windows.net/veno-media";

export const Menu: React.FunctionComponent<{
    isShowing: boolean;
    toggle: () => void;
    session: USER_SESSION;
    onLogout: () => void;
}> = ({ isShowing, toggle, session, onLogout }) => {
    return (
        <React.Fragment>
            <div
                id="mySidenav"
                className={"sidenav"}
                style={{ width: isShowing ? "250px" : "0px" }}
            >
                <div className="closebtn link-anchor" onClick={() => toggle()}>
                    &times;
                </div>
                <Link href={"/profile/" + session.username}>
                    <div className="d-flex flex-row bd-highlight mb-3 link-anchor">
                        <div className="p-2 bd-highlight">
                            {/* <img
                                className="menu-profile-picture"
                                src={
                                    session.profileImageUrl
                                        ? mediaBaseUrl + "/" + session.profileImageUrl
                                        : "/images/profile_image_placeholder.jpg"
                                }
                                alt="Avatar"
                            /> */}

                            <CircularImage
                                src={[
                                    mediaBaseUrl + "/" + session.profileImageUrl,
                                    "/images/profile_image_placeholder.jpg",
                                ]}
                                height="52px"
                                width="52px"
                            />
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
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faUserCircle}
                        />
                        <span className="ml-2">Profile</span>
                    </div>
                </Link>
                <Link href="/followersinfo">
                    <div className="link-anchor">
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faUserPlus}
                        />
                        <span className="ml-2">Followers</span>
                        <span className="badge badge--line badge--smaller">
                            {session.followersCount}
                        </span>
                    </div>
                </Link>
                <Link href="/followinginfo">
                    <div className="link-anchor">
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faUserCheck}
                        />
                        <span className="ml-2">Following</span>
                    </div>
                </Link>
                {/* <a href="#">
                    {" "}
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faHandshake}
                    />
                    <span className="ml-2">Referrals</span>
                </a> */}
                {/* <a href="#">
                    {" "}
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faListUl}
                    />
                    <span className="ml-2">Lists</span>
                </a> */}
                {/* <Link href="#">
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faCog}
                    />
                    <span className="ml-2">Settings</span>
                </Link> */}
                {/* <Link href="#">
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faListUl}
                    />
                    <span className="ml-2">Statements</span>
                </Link> */}
                {/* <a href="#">
                    {" "}
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faBullhorn}
                    />
                    <span className="ml-2">Campaigns</span>
                </a> */}
                <hr />
                <Link href="#">
                    <div className="link-anchor">
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faCreditCard}
                        />
                        <span className="ml-2">
                            Your Cards{" "}
                            <span className="menu-icon-color">
                                ( Become a subscriber )
                            </span>
                        </span>
                    </div>
                </Link>
                <Link href="#">
                    <div className="link-anchor">
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faUniversity}
                        />
                        <span className="ml-2">
                            Add Bank{" "}
                            <span className="menu-icon-color">
                                ( Become a creator )
                            </span>
                        </span>
                    </div>
                </Link>
                <hr />
                {/* <Link href="#">
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faQuestionCircle}
                    />
                    <span className="ml-2">Help and Support </span>
                </Link>
                <Link href="#">
                    <FontAwesomeIcon
                        className={"menu-icon-color"}
                        icon={faGlobeAmericas}
                    />
                    <span className="ml-2">Language </span>
                </Link> */}
                <Link href="/login">
                    <div className="link-anchor" onClick={() => onLogout()}>
                        {" "}
                        <FontAwesomeIcon
                            className="menu-icon-color"
                            icon={faPowerOff}
                        />
                        <span className="ml-2">Logout </span>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
};
