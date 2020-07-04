// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ILinkText } from "./LinkText";
// #endregion Local Imports

const _aTag = styled.a<ILinkText.IProps>``;

export const LinkText: React.FunctionComponent<ILinkText.IProps> = React.forwardRef((props, ref) => {
    return <_aTag {...props} />;
});
