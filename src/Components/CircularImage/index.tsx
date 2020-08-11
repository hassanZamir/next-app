import React from "react";
import styled from "styled-components";

import { ICircularImage } from "./CircularImage";

import { getBgImageUrl } from "@Services/UI";

const Container = styled.div<ICircularImage.IProps>`
    border-radius: 50%;
    border: ${({ border }) => {return border ? border : "0px" }};
    height: ${({ height }) => height };
    width: ${({ width }) => width };
    background-image: ${({ src }) => { return src ? getBgImageUrl(src) : 'url(unknown)' }};
    background-size: cover;
    background-position: center;
`;

export const CircularImage: React.FunctionComponent<ICircularImage.IProps> = (props) => {
    return (
        <Container {...props} />
    );
};
