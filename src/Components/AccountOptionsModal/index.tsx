import { IAccountOptionsModal } from "./AccountOptionsModal";
import { PositionedModal } from "@Components/Basic";
import { ParagraphText } from "@Components";

export const AccountOptionsModal: React.FunctionComponent<IAccountOptionsModal.IProps> 
    = ({ isShowing, modalRef, onLogout, onPaymentSettings }) => {
        return isShowing ? <PositionedModal borderRadius="11px" triangleProps={{ right: "40px" }}> 
        <div className="w-100 h-100" ref={modalRef}>
            <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                <div className="cursor-pointer" onClick={(e) => { e.preventDefault(); onPaymentSettings(true) }}>
                    <ParagraphText className="text-primary font-12px text-center">
                        Payment Settings
                    </ParagraphText>
                </div>
                <div className="cursor-pointer" onClick={(e) => { e.preventDefault(); onLogout() }}>
                    <ParagraphText className="text-grey100 font-12px text-center">
                        Logout
                    </ParagraphText>
                </div>
            </div>
    </div> </PositionedModal>: null
}