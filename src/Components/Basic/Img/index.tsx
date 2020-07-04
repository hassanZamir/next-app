// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IImg } from "./Image";
// #endregion Local Imports

const Image = styled.img<IImg.IProps>``;

export const Img: React.FunctionComponent<IImg.IProps> = props => {
    return <Image {...props} />;
};
