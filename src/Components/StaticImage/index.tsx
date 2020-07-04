import React from "react";
import styled from "styled-components";

import { IStaticImg } from "./StaticImage";

import { Img } from "../Basic";

const Container = styled(Img)<IStaticImg.IProps>``;

export const StaticImage: React.FunctionComponent<IStaticImg.IProps> = (props) => {
    return (
        <Container {...props} />
    );
};
