import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IBackgroundImageSmart } from "./BackgroundImageSmart";

import { getBgImageUrl } from "@Services/UI";
import { LoadingSpinner } from "@Components";

const Container = styled.div<IBackgroundImageSmart.IProps>`
    background-image: ${({ src, placeholder }) => { return src ? getBgImageUrl([src, placeholder ?? ""]) : 'url(unknown)' }};
    background-size: cover;
    background-position: ${({ backgroundPosition }) => { return backgroundPosition ? backgroundPosition : "center center" }};
    background-repeat: no-repeat;
    width: 100%;
    padding-bottom: ${({ paddingBottom }) => { return paddingBottom ? paddingBottom : "35.25%" }};
    border-radius: ${({ borderRadius }) => { return borderRadius ? borderRadius : "2px" }};
`;

export const BackgroundImageSmart: React.FunctionComponent<IBackgroundImageSmart.IProps> = (props) => {
    const [currentUrlWithoutToken, setCurrentUrlWithoutToken] = useState<string>();
    const [currentUrlToken, setCurrentUrlToken] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUrlWithoutToken == undefined) {
            setCurrentUrlWithoutToken(props.src ?? undefined);
            setCurrentUrlToken(props.token ?? undefined);
        }
        else if (currentUrlWithoutToken != props.src) {
            setCurrentUrlWithoutToken(props.src);
            setCurrentUrlToken(props.token ?? undefined);
        }
        setLoading(false);
        // return () => {
        //     setCurrentUrlWithoutToken("");
        //     setCurrentUrlToken("");
        //     setLoading(true);
        // }
    }, [])

    // console.log("BackgroundImageSmart-src: ", `${currentUrlWithoutToken}${currentUrlToken}`);
    return <React.Fragment>
        {!loading && <Container
            src={`${currentUrlWithoutToken}${currentUrlToken}`}
            paddingBottom={props.paddingBottom ?? undefined}
            borderRadius={props.borderRadius ?? undefined}
            backgroundPosition={props.backgroundPosition ?? undefined}
            onClick={props.onClick ?? undefined}
            placeholder={props.placeholder ?? undefined}
        />}
        {loading && <div
            style={{ flex: 1 }}
        >
            <LoadingSpinner size="3x" />
        </div>}
    </React.Fragment>;
};
