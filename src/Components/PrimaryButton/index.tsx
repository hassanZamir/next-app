import React from "react";
import styled from "styled-components";

import { IPrimaryButton } from "./PrimaryButton";

import { Button } from "../Basic";
import { theme } from "@Definitions/Styled";

const Container = styled(Button)<IPrimaryButton.IProps>`
    background: ${({ isActive }) => (isActive ? ({ theme }) => theme.colors.primaryBackground : theme.colors.borderGrey)};
    padding: 8px 32px;
    border-radius: 22px;
    color: white;
`;

export const PrimaryButton: React.FunctionComponent<IPrimaryButton.IProps> = ({
    children,
    isActive,
    onClick,
    className,
    type
}) => {
    console.log("isActive", isActive);
    return (
        <Container isActive={isActive} onClick={onClick} className={className} type={type}>
            {children}
        </Container>
    );
};
