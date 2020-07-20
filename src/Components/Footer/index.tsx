// #region Global Imports
import * as React from "react";
import { useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { IFooter } from "./Footer";
import { StaticImage } from "@Components";
import Router from "next/router";
import { LoginActions } from "@Actions";
// #endregion Local Imports

const Footer: React.FunctionComponent<IFooter.IProps> = ({ selected }): JSX.Element => {
    const dispatch = useDispatch();

    return <div style={{ height: "40px" }} 
        className={"footer-navigation  d-flex align-items-center justify-content-between text-white " + (selected === "Profile" ? "bg-white" : "bg-fotter-grey")}>
        {FooterConfig.map((config, index) => {
            return <div key={index} 
                onClick={() => { 
                    config.name === 'Account' ? dispatch(LoginActions.UserLogout()) : null 
                }}
                className={"cursor-pointer d-flex align-items-center justify-content-center h-100 " + (selected === config.name ? "highlight-footer-option" : "")} 
                style={{ width: "20%" }}>
                
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
