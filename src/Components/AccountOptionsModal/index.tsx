import { IAccountOptionsModal } from "./AccountOptionsModal";
import { PositionedModal } from "@Components/Basic";
import { ParagraphText } from "@Components";
import Link from "next/link";

export const AccountOptionsModal: React.FunctionComponent<IAccountOptionsModal.IProps> 
    = ({ isShowing, modalRef, onLogout, onPaymentSettings }) => {
        return isShowing ? <PositionedModal borderRadius="11px" triangleProps={{ right: "34%", top: "-16px" }} 
            containerProps={{ right: "15px", top: "-100px" }}> 

        <div className="w-100 h-100" ref={modalRef}>
            <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                <Link href="/bankinginfo">
                    <div className="cursor-pointer">
                        <ParagraphText className="text-grey100 font-12px text-center">
                            Banking Info
                        </ParagraphText>
                    </div>
                </Link>
                <div className="cursor-pointer" onClick={(e) => { e.preventDefault(); onPaymentSettings(true) }}>
                    <ParagraphText className="text-grey100 font-12px text-center">
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