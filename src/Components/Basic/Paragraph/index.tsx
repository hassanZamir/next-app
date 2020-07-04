// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IParagraph } from "./Paragraph";
// #endregion Local Imports

const _Paragraph = styled.p<IParagraph.IProps>``;

export const p: React.FunctionComponent<IParagraph.IProps> = props => {
    return <_Paragraph {...props} />;
};
