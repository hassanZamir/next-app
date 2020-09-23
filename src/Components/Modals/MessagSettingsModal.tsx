import React, { RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { PositionedModal } from "@Components/Basic";
import { USER_SESSION } from '@Interfaces';

declare namespace IMessageSettingsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: ()=>void;
        user: USER_SESSION;
    }
}

export const MessageSettingsModal: React.RefForwardingComponent<HTMLDivElement, IMessageSettingsModal.IProps> = ((props) => {
    const { isShowing, modalRef, toggle, user } = props;

    const onSettingClick = (index: number) => {}

    useEffect(() => {

    }, []);

    return isShowing ? <PositionedModal 
            borderRadius="11px" 
            triangleProps={{ right: "-4px", top: "15px" }} 
            containerProps={{ right: "-4px", top: "20px" }}
            triangleUp={true}>
            
            <div className="modal-header">
                {/* <button type="button" className="modal-close-button" 
                    data-dismiss="modal" aria-label="Close" > */}
                    <span className="cursor-pointer" aria-hidden="true" onClick={toggle}>&times;</span>
                {/* </button> */}
            </div>
            <div className="d-flex flex-column" style={{ width: "200px" }} ref={modalRef}>
                <div onClick={()=>{ onSettingClick(0) }} className="text-grey100 cursor-pointer">Copy Profile Link</div>
                <div onClick={()=>{ onSettingClick(1) }} className="text-grey100 cursor-pointer">Hide Chat</div>
                <div onClick={()=>{ onSettingClick(2) }} className="text-grey100 cursor-pointer">Turn Off Notifications</div>
                <div onClick={()=>{ onSettingClick(3) }} className="text-primary cursor-pointer">Restrict Messages</div>
                <div onClick={()=>{ onSettingClick(4) }} className="text-primary cursor-pointer">Block</div>
                <div onClick={()=>{ onSettingClick(5) }} className="text-primary cursor-pointer">Report</div>
            </div>
        </PositionedModal> : null
    // ) : null;
});
