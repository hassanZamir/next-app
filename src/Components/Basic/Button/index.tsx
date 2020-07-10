// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IButton } from "./Button";
// #endregion Local Imports

const Container = styled.button<IButton.IProps>`
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border: 0px solid transparent;
    &:focus { outline: none; }
    margin: 0;
`;

export const Button: React.FunctionComponent<IButton.IProps> = props => {
    return <Container {...props} />;
};
