import React, { RefObject, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { MessagesActions } from "@Actions";


import { PositionedModal } from "@Components/Basic";
import { USER_SESSION, CONVERSATION_THREAD } from '@Interfaces';

declare namespace IMessageSettingsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        user: USER_SESSION;
        conversationThread: CONVERSATION_THREAD;
    }
}

export const MessageSettingsModal: React.ForwardRefRenderFunction<HTMLDivElement, IMessageSettingsModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user, conversationThread } = props;

    const { userConversationSettings, creatorConversationSettings } = conversationThread;
    const dispatch = useDispatch();

    const getApiRouteKey = (index: number) => {
        switch (index) {
            case 0: return ""
            case 1: return ""
            case 2: return ""
            case 3: return userConversationSettings.isRestricted ? "unrestrict" : "restrict"
            case 4: return userConversationSettings.isBlocked ? "unblock" : "block"
            case 5: return ""
            default: return ""
        }
    }

    const onSettingClick = (index: number) => {
        const apiRouteKey = getApiRouteKey(index);
        if (apiRouteKey) {
            dispatch(MessagesActions.UpdateMessageSettings({
                userName: user.username,
                recipientUsername: conversationThread.userName,
                apiRouteKey: getApiRouteKey(index),
                apiReducerKey: index === 3 ? 'isRestricted' : 'isBlocked',
                authtoken: user.token,
            }));
        }
    }

    return isShowing ? <PositionedModal
        borderRadius="11px"
        triangleProps={{ right: "-4px", top: "15px" }}
        containerProps={{ right: "-4px", top: "20px" }}
        triangleUp={true}>

        <div className="modal-header">
            <span className="cursor-pointer" aria-hidden="true" onClick={toggle}>&times;</span>
        </div>
        <div className="d-flex flex-column" style={{ width: "200px" }} ref={modalRef}>
            {/* <div onClick={()=>{ onSettingClick(0) }} className="text-grey100 cursor-pointer">Copy Profile Link</div>
            <div onClick={()=>{ onSettingClick(1) }} className="text-grey100 cursor-pointer">Hide Chat</div>
            <div onClick={()=>{ onSettingClick(2) }} className="text-grey100 cursor-pointer">Turn Off Notifications</div> */}
            {user.isCreator && <div onClick={() => { onSettingClick(3) }} className="text-primary cursor-pointer">
                {userConversationSettings.isRestricted ? "Unrestrict User" : "Restrict User"}
            </div>}
            {user.isCreator && <div onClick={() => { onSettingClick(4) }} className="text-primary cursor-pointer">
                {userConversationSettings.isBlocked ? "Unblock User" : "Block User"}
            </div>}
            {!user.isCreator && <div onClick={() => { onSettingClick(5) }} className="text-primary cursor-pointer">Report</div>}
        </div>
    </PositionedModal> : null
});
