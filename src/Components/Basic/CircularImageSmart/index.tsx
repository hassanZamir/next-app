import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ICircularImageSmart } from "./CircularImageSmart";

import { getBgImageUrl } from "@Services/UI";
import { LoadingSpinner } from "@Components";

const Container = styled.div<ICircularImageSmart.IProps>`
    border-radius: 50%;
    border: ${({ border }) => { return border ? border : "0px" }};
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    min-height: ${({ height }) => height};
    min-width: ${({ width }) => width};
    background-image: ${({ src, placeholder }) => { return src ? getBgImageUrl([src, placeholder ?? ""]) : 'url(unknown)' }};
    background-size: cover;
    background-position: center;
`;

export const CircularImageSmart: React.FunctionComponent<ICircularImageSmart.IProps> = (props) => {
    const [currentUrlWithoutToken, setCurrentUrlWithoutToken] = useState<string>();
    const [currentUrlToken, setCurrentUrlToken] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUrlWithoutToken == undefined) {
            setCurrentUrlWithoutToken(props.src ?? props.placeholder ?? undefined);
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

    // console.log("CircularImageSmart-src: ", `${currentUrlWithoutToken}${currentUrlToken}`);
    return <React.Fragment>
        {!loading && <Container
            src={`${currentUrlWithoutToken}${currentUrlToken}`}
            height={props.height}
            width={props.width}
            border={props.width ?? undefined}
            placeholder={props.placeholder ?? undefined}
        />}
        {loading && <div
            style={{ flex: 1 }}
            className="w-100 h-100 d-flex align-items-center justify-content-center"
        >
            <LoadingSpinner size="3x" />
        </div>}
    </React.Fragment>;
};
