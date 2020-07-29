import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import dynamic from 'next/dynamic';

import { useModal } from '../Hooks';
import { AddCardModal } from "../Modals/AddCardModal";
import { ILoginPage, USER_SESSION } from '@Interfaces';
import { Footer, Toast } from '@Components';

const DynamicLogin: any = dynamic(
    () => import('@Components/LoginComponent').then((mod) => mod.LoginComponent) as Promise<React.FunctionComponent<ILoginPage.IProps>>,
    { ssr: false }
);

const DynamicPaymentsModal: any = dynamic(
    () => import('../Modals/PaymentSettingsModal').then((mod) => mod.PaymentSettingsModal) as Promise<React.FunctionComponent<{ user: USER_SESSION }>>,
    { ssr: false }
);

export const Authenticated: React.FunctionComponent<{session: USER_SESSION, name: string}> = ({ session, children, name }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);
    const [ showAddCard, setShowAddCard ] = useState(false);

    useEffect(() => {
        if (!session || !('id' in session))
            Router.push("/login", "/login", { shallow: true });
    }, [session]);
    
    const onPaymentSettingsClick = () => {
        toggle();
    }

    if (!session || !('id' in session)) {
        return <DynamicLogin />
    } else {
        return <div className="w-100 row flex-column justify-content-between flex-nowrap">
            <div style={{ flexGrow: 1 }}>{ children }</div>
            
            <Footer selected={name} user={session} onPaymentSettingsClick={onPaymentSettingsClick} />
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
        </div>
    }
}