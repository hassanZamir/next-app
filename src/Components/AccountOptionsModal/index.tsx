import { IAccountOptionsModal } from "./AccountOptionsModal";
import React, { useEffect, useState } from "react";
export const AccountOptionsModal: React.FunctionComponent<IAccountOptionsModal.IProps> = ({
    isShowing,
    modalRef,
    onLogout,
    onPaymentSettings,
}) => {
    const [inComponentState, setInComponentState] = useState(false);

    const handleChange = (state: any) => {
        setInComponentState(state);
    };

    return (
        <div></div>
        // <Menu isShowing={isShowing} handleChange={handleChange}>
        /* <div className="w-100 h-100" ref={modalRef}>
                <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                    <Link href="/bankinginfo">
                        <div className="cursor-pointer">
                            <ParagraphText className="text-grey100 font-12px text-center">
                                Banking Info
                            </ParagraphText>
                        </div>
                    </Link>
                    <Link href="/followersinfo">
                        <div className="cursor-pointer">
                            <ParagraphText className="text-grey100 font-12px text-center">
                                Followers Info
                            </ParagraphText>
                        </div>
                    </Link>
                    <div
                        className="cursor-pointer"
                        onClick={e => {
                            e.preventDefault();
                            onPaymentSettings(true);
                        }}
                    >
                        <ParagraphText className="text-grey100 font-12px text-center">
                            Payment Settings
                        </ParagraphText>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={e => {
                            e.preventDefault();
                            onLogout();
                        }}
                    >
                        <ParagraphText className="text-grey100 font-12px text-center">
                            Logout
                        </ParagraphText>
                    </div>
                </div>
            </div>{" "} */
        // </Menu>
    );
};
