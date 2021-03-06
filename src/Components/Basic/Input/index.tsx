// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IInput } from "./Input";
// #endregion Local Imports

const _Input = styled.input<IInput.IProps>`
    background-color: transparent;
    padding: 5px;
    color: inherit;
    outline-width: 0;
`;

export const Input: React.FunctionComponent<IInput.IProps> = props => {
    return <_Input {...props} />;
};
