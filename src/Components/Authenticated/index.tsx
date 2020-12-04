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
    const onScrollDiv = useRef<HTMLDivElement>(null);
    const [showPaymentSettings, setShowPaymentSettings] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!session || !session.token || !session.id)
            Router.push("/login", "/login", { shallow: true });
        else if (session && session.token) {
            // call the token verify api to check validity
            dispatch(LoginActions.TokenVerify({
                session: session
            }));
        }
    }, []);

    const checkBottomScrollEvent = (e: any) => {
        if (e && e.target) {
            const element = e.target;
            const bottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 3.0
            onScroll && onScroll(bottom);
        }
    }

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
                <div ref={onScrollDiv}
                    className="custom-scroller d-flex flex-column"
                    onScroll={checkBottomScrollEvent}
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
