import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { LoginActions } from "@Actions";
import { ILoginPage, USER_SESSION } from "@Interfaces";
import { Footer } from "@Components";
import { PaymentSettingsContainer } from "@Components";
import { Menu } from "@Components/Menu";
import { useModal } from "@Components/Hooks";

const DynamicLogin: any = dynamic(
    () =>
        import("@Components/LoginComponent").then(
            mod => mod.LoginComponent
        ) as Promise<React.FunctionComponent<ILoginPage.IProps>>,
    { ssr: false }
);

export const Authenticated: React.FunctionComponent<{
    session: USER_SESSION;
    name: string;
    onScroll?: (a: boolean) => void;
}> = ({ session, children, name, onScroll }) => {
    const menuModalRef = useModal(useRef<HTMLDivElement>(null));
    const [showPaymentSettings, setShowPaymentSettings] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!session || !("id" in session))
            Router.push("/login", "/login", { shallow: true });
    }, [session]);

    const onPaymentSettingsClick = () => {
        setShowPaymentSettings(true);
    };

    const onLogout = () => {
        dispatch(LoginActions.UserLogout());
    };

    if (!session || !("id" in session)) {
        return <DynamicLogin />;
    } else {
        return <>
            <div className="w-100 h-100 row flex-column justify-content-between flex-nowrap">
                <div
                    className="custom-scroller d-flex flex-column"
                    onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        onScroll && onScroll(bottom);
                    }}
                >
                    {children}
                </div>
                {session && <Menu
                    isShowing={menuModalRef.isShowing}
                    toggle={menuModalRef.toggle}
                    session={session}
                    onLogout={onLogout}
                />}
                <Footer
                    selected={name}
                    session={session}
                    onMenuClick={menuModalRef.toggle}
                />

                <PaymentSettingsContainer
                    session={session}
                    showPaymentSettings={showPaymentSettings}
                    onModalClose={() => {
                        setShowPaymentSettings(false);
                    }}
                />
            </div>
        </>;
    }
};
