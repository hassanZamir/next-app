import React from "react";
import styled from "styled-components";

import { IThemeInput } from "./ThemedInput";

import { Input } from "../Basic";

const Container = styled(Input)`
    width: 271px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 0px;
`;

export const ThemedInput: React.FunctionComponent<IThemeInput.IProps> = (props) => {
    return (
        <Container name='' {...props} />
    );
};
