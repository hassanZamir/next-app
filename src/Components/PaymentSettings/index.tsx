// #region Global Imports
import React, { useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { useModal } from '../Hooks';
import { CardStatus } from "@Components";
import { AddCardModal } from "../Modals/AddCardModal";
import { CREATOR_PROFILE, USER_SESSION } from "@Interfaces";
import { CCBillAddCardModal } from "@Components/Modals/CCBillAddCardModal";
// import { IStore } from "@Redux/IStore";
// import { FeedsActions } from "@Actions";
// #endregion Local Imports

const DynamicPaymentsModal: any = dynamic(
    () => import('../Modals/PaymentSettingsModal').then((mod) => mod.PaymentSettingsModal) as Promise<React.FunctionComponent<{ user: USER_SESSION }>>,
    { ssr: false }
);

export const PaymentSettings: React.FunctionComponent<{ user: USER_SESSION, creatorProfile?: CREATOR_PROFILE }>
    = ({ user, creatorProfile }) => {
        // const onCloseModal = () => { setClickedPaymentSettings && setClickedPaymentSettings(false); }
        const modalRef = useRef<HTMLDivElement>(null);
        const { isShowing, toggle } = useModal(modalRef);
        const [showAddCard, setShowAddCard] = React.useState(false);

        return (<React.Fragment>
            <CardStatus user={user} onClick={() => {
                setShowAddCard(false);
                toggle();
            }} />
            {!showAddCard && <DynamicPaymentsModal
                toggle={toggle}
                isShowing={isShowing}
                modalRef={modalRef}
                user={user}
                onAddCard={setShowAddCard} />}
            {showAddCard && <AddCardModal
            toggle={toggle}
            isShowing={isShowing}  
            modalRef={modalRef} 
            user={user} />}
            {/* {showAddCard && creatorProfile && <CCBillAddCardModal
                user={user}
                isShowing={isShowing}
                toggle={toggle}
                creatorProfile={creatorProfile}
            />} */}
        </React.Fragment>);
    }
