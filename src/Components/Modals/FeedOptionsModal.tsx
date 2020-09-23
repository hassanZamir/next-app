import React, { RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { PositionedModal } from "@Components/Basic";
import { ParagraphText } from "@Components";
import { FEED } from "@Interfaces";

declare namespace IFeedOptionsModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        onReportClick: (a: FEED)=>void;
        onCopyClick: (a: FEED)=>void;
        feed: FEED;
    }
}

export const FeedOptionsModal: React.RefForwardingComponent<HTMLDivElement, IFeedOptionsModal.IProps> = ((props) => {
    const { isShowing, modalRef, onReportClick, onCopyClick, feed } = props;

    // return isShowing ? ReactDOM.createPortal(<PositionedModal borderRadius="11px">
        return isShowing ? <PositionedModal 
            borderRadius="11px" 
            triangleProps={{ right: "-8px", top: "-30px" }}> 
            
            <div className="w-100 h-100" ref={modalRef}>
                <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                    <div onClick={(e) => { e.preventDefault(); onCopyClick(feed) }}>
                        <ParagraphText className="text-grey100 font-12px text-center">
                            Copy Link
                        </ParagraphText>
                    </div>
                    <div onClick={(e) => { e.preventDefault(); onReportClick(feed) }}>
                        <ParagraphText className="text-primary font-12px text-center">
                            Report
                        </ParagraphText>
                    </div>
                </div>
        </div> </PositionedModal>: null
    // </PositionedModal>, target) : null
});
