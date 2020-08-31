import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import dynamic from 'next/dynamic';

import { useModal } from '../Hooks';
import { AddCardModal } from "../Modals/AddCardModal";
import { ILoginPage, USER_SESSION } from "@Interfaces";
import { Footer, Toast } from "@Components";
import { PaymentSettingsContainer } from "@Components";

const DynamicLogin: any = dynamic(
    () => import('@Components/LoginComponent').then((mod) => mod.LoginComponent) as Promise<React.FunctionComponent<ILoginPage.IProps>>,
    { ssr: false }
);

export const Authenticated: React.FunctionComponent<{session: USER_SESSION, name: string, onScroll?: (a: boolean)=>void}> 
    = ({ session, children, name, onScroll }) => {
        const [showPaymentSettings, setShowPaymentSettings] = useState(false);
        
        useEffect(() => {
            if (!session || !('id' in session))
                Router.push("/login", "/login", { shallow: true });
        }, [session]);
        
        const onPaymentSettingsClick = () => {
            setShowPaymentSettings(true)
        }


        if (!session || !('id' in session)) {
            return <DynamicLogin />
        } else {
            return <div 
                className="w-100 h-100 row flex-column justify-content-between flex-nowrap">

                <div className="custom-scroller d-flex flex-column" 
                    onScroll={(e: any) => { 
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        onScroll && onScroll(bottom);
                    }}>
                    { children }
                </div>
                
                <Footer selected={name} user={session} 
                    onPaymentSettingsClick={onPaymentSettingsClick} />

                <PaymentSettingsContainer 
                    session={session} 
                    showPaymentSettings={showPaymentSettings} 
                    onModalClose={()=> { setShowPaymentSettings(false) }} />
            </div>
        }
}