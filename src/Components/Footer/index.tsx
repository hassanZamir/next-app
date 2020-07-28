// #region Global Imports
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import dynamic from 'next/dynamic';
// #endregion Global Imports

// #region Local Imports
import { IFooter } from "./Footer";
import { StaticImage } from "@Components";
import Router from "next/router";
import { LoginActions } from "@Actions";
import { useModal } from '../Hooks';
import { AddCardModal } from "../Modals/AddCardModal";
import { USER_SESSION } from "@Interfaces";
// #endregion Local Imports

const DynamicPaymentsModal: any = dynamic(
    () => import('../Modals/PaymentSettingsModal').then((mod) => mod.PaymentSettingsModal) as Promise<React.FunctionComponent<{ user: USER_SESSION }>>,
    { ssr: false }
);

const Footer: React.FunctionComponent<IFooter.IProps> = ({ selected, user }): JSX.Element => {
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);
    const [ showAddCard, setShowAddCard ] = React.useState(false);

    return <div style={{ height: "40px" }} 
        className={"footer-navigation  d-flex align-items-center justify-content-between text-white " + (selected === "Profile" ? "bg-white" : "bg-fotter-grey")}>
        {FooterConfig.map((config, index) => {
            return <div key={index} 
                onClick={() => { 
                    if (config.name === 'Account') {
                        dispatch(LoginActions.UserLogout());
                        return;
                    } else if (config.name === 'Home') {
                        Router.push('/');
                        return;
                    } else if (config.name === 'Comments') {
                        // debugger;
                        // setShowAddCard(false); 
                        // toggle();
                        return;
                    } else {
                        return null
                    }
                }}
                className={"cursor-pointer d-flex align-items-center justify-content-center h-100 " + (selected === config.name ? "highlight-footer-option" : "")} 
                style={{ width: "20%" }}>

                {/* {!showAddCard && <DynamicPaymentsModal
                    toggle={toggle}
                    isShowing={isShowing}  
                    modalRef={modalRef} 
                    user={user} 
                    onAddCard={setShowAddCard} />}
                {showAddCard && <AddCardModal
                    toggle={toggle}
                    isShowing={isShowing}  
                    modalRef={modalRef} 
                    user={user} />} */}

                <StaticImage 
                    src={config.image.src} 
                    height={config.image.height} 
                    width={config.image.width} />
            </div>
        })}
    </div>;
};


const FooterConfig = [{
    name: 'Home',
    image: {
        src: '/images/home_filled@2x.png',
        height: '18px',
        width: '18px'
    }
}, {
    name: 'Bell',
    image: {
        src: '/images/bell@2x.png',
        height: '20px',
        width: '20px'
    }
}, {
    name: 'App Middle Icon',
    image: {
        src: '/images/app_middle_icon_navbar@2x.png',
        height: '24px',
        width: '24px'
    }
}, {
    name: 'Comments',
    image: {
        src: '/images/comment@2x.png',
        height: '20px',
        width: '20px'
    }
}, {
    name: 'Account',
    image: {
        src: '/images/account@2x.png',
        height: '20px',
        width: '20px'
    },
    // onClick: function(dispatch: any) {
    //     // window.localStorage.clear();
    //     dispatch(LoginActions.UserLogout());
    //     // Router.push("/login");
    // }
}];

export { Footer };
