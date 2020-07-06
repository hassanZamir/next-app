// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IRegInput } from "./RegInput";
// #endregion Local Imports

const Input = styled.input<IRegInput.IProps>``;

export const RegInput: React.FunctionComponent<IRegInput.IProps> = React.forwardRef((props, ref) => {
    return <Input ref={ref} {...props} />;
});
