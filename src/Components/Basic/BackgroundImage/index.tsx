import React from "react";
import styled from "styled-components";

import { IBackgroundImage } from "./BackgroundImage";

import { getBgImageUrl } from "@Services/UI";

const Container = styled.div<IBackgroundImage.IProps>`
    background-image: ${({ src }) => { return src ? getBgImageUrl(src) : 'url(unknown)' }};
    background-size: cover;
    background-position: ${({ backgroundPosition }) => { return backgroundPosition ? backgroundPosition : "center center" }};
    background-repeat: no-repeat;
    width: 100%;
    padding-bottom: ${({ paddingBottom }) => { return paddingBottom ? paddingBottom : "35.25%" }};
    border-radius: ${({ borderRadius }) => { return borderRadius ? borderRadius : "2px" }};
`;

export const BackgroundImage: React.FunctionComponent<IBackgroundImage.IProps> = (props) => {
    return (<Container {...props} />);
};
