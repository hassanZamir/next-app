import React from "react";
import styled from "styled-components";

import { ICircularImage } from "./CircularImage";

import { Img } from "../Basic";

const Container = styled(Img)<ICircularImage.IProps>`
    border-radius: 50%;
`;

export const CircularImage: React.FunctionComponent<ICircularImage.IProps> = (props) => {
    return (
        <Container {...props} />
    );
};
