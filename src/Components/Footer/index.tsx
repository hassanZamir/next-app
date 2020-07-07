// #region Global Imports
import * as React from "react";
// #endregion Global Imports

// #region Local Imports
import { IFooter } from "./Footer";
import { StaticImage } from "@Components";
// #endregion Local Imports

const Footer: React.FunctionComponent<IFooter.IProps> = ({ selected }): JSX.Element => {
    return <div style={{ height: "40px" }} 
        className="footer-navigation position-fixed bottom-0 bg-fotter-grey d-flex align-items-center justify-content-between text-white">
        {FooterConfig.map((config, index) => {
            return <div key={index} 
                className={"d-flex align-items-center justify-content-center h-100 " + (selected === config.name ? "highlight-footer-option" : "")} 
                style={{ width: "20%" }}>
                
                <StaticImage src={config.image.src} height={config.image.height} width={config.image.width} />
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
    }
}];

export { Footer };
