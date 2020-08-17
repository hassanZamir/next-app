import React ,{ useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

import { useModal } from '../Hooks';
import { AddCardModal } from "../Modals/AddCardModal";
import { USER_SESSION } from "@Interfaces";

const DynamicPaymentsModal: any = dynamic(
    () => import('../Modals/PaymentSettingsModal').then((mod) => mod.PaymentSettingsModal) as Promise<React.FunctionComponent<{ user: USER_SESSION }>>,
    { ssr: false }
);

export const PaymentSettingsContainer: React.FunctionComponent<{ onModalClose: ()=>void, session: USER_SESSION, showPaymentSettings: boolean }> 
    = ({ session, showPaymentSettings, onModalClose }) => {

        const modalRef = useRef<HTMLDivElement>(null);
        const { isShowing, toggle } = useModal(modalRef, onModalClose);
        const [ showAddCard, setShowAddCard ] = useState(false);

        useEffect(() => {
            if (showPaymentSettings) {
                setShowAddCard(false);
                toggle();
            }
        }, [showPaymentSettings]);

        return <React.Fragment>
            {!showAddCard && <DynamicPaymentsModal
                toggle={toggle}
                isShowing={isShowing}  
                modalRef={modalRef} 
                user={session} 
                onAddCard={setShowAddCard} />}
            {showAddCard && <AddCardModal
                toggle={toggle}
                isShowing={isShowing}  
                modalRef={modalRef} 
                user={session} />}
        </React.Fragment>
}