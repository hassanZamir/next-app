// #region Global Imports
import React, { useState, useEffect, useRef, RefObject, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { PositionedModal } from "@Components/Basic";
import { theme } from "@Definitions/Styled";
import { USER_SESSION, MESSAGE_LIST_ITEM, CONVERSATION_RESPONSE, CONVERSATION_MEDIA_MESSAGE, CONVERSATION_TIP_MESSAGE, CONVERSATION_THREAD, MESSAGE_RECIPIENT } from "@Interfaces";
import { ParagraphText, LoadingSpinner } from "@Components";
import { CreateBroadcastMessage } from "./CreateBroadcastMessage";
import { useModal } from '../Hooks';
// #endregion Local Imports

export const BroadcastComponent: React.FunctionComponent<{ user: USER_SESSION, recipients: MESSAGE_RECIPIENT[] }>
    = ({ user, recipients }) => {

        const modalRef = useRef<HTMLDivElement>(null);
        const { isShowing, toggle } = useModal(modalRef);

        return (<div className="d-flex flex-column h-100"
            style={{ flex: "1 1 auto" }}>

            <div className="pt-4 pb-3 d-flex justify-content-between align-items-center no-gutters mx-4">
                <FontAwesomeIcon
                    onClick={() => Router.back()}
                    className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
                <ParagraphText className="text-primary lato-bold">{"Broadcast Message"}</ParagraphText>
                <div className="d-flex align-items-center position-relative">

                    <FontAwesomeIcon className="cursor-pointer ml-2" icon={faEllipsisH}
                        onClick={() => { toggle(); }}
                        color={theme.colors.primary} size="lg" />

                    {isShowing && <PositionedModal
                        borderRadius="11px"
                        triangleProps={{ right: "-4px", top: "15px" }}
                        containerProps={{ right: "-4px", top: "20px" }}
                        triangleUp={true}>

                        <div className="modal-header align-self-right">
                            <span className="cursor-pointer" aria-hidden="true" onClick={toggle}>&times;</span>
                        </div>
                        <div className="d-flex flex-column h-60" style={{
                            width: "200px",
                            height: "400px",
                            overflow: "scroll"
                        }} ref={modalRef}>
                            <ParagraphText className="text-primary">{`Recipients List (${recipients.length.toString()})`}</ParagraphText>
                            {recipients.map((r) => {
                                return <ParagraphText className="">{"@" + r.userName}</ParagraphText>
                            })}
                        </div>
                    </PositionedModal>}
                </div>
            </div>

            <div className="d-flex flex-column w-100 h-100 full-flex-scroll">

            </div>

            <CreateBroadcastMessage
                recipients={recipients}
                user={user}
                onSuccess={() => { }} />
        </div>);
    }
