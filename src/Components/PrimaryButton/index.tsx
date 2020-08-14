import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { IPrimaryButton } from "./PrimaryButton";

import { Button } from "../Basic";
import { theme } from "@Definitions/Styled";

const Container = styled(Button)<IPrimaryButton.IProps>`
    background: ${({ isActive }) => (isActive ? ({ theme }) => theme.colors.primaryBackground : theme.colors.borderGrey)};
    padding: ${({ padding }) => {return (padding ? padding : "8px 32px")}};
    border-radius: ${({ borderRadius }) => {return (borderRadius ? borderRadius : "22px")}};
    color: white;
`;

export const PrimaryButton: React.FunctionComponent<IPrimaryButton.IProps> = ({
    children,
    isActive,
    onClick,
    className,
    type,
    borderRadius,
    showLoader,
    padding
}) => {
    return (
        <Container padding={padding} isActive={isActive} onClick={onClick} className={className} type={type} borderRadius={borderRadius}>
            {children} <span>{showLoader && <FontAwesomeIcon icon={faSpinner} color="white" className="fa-spin"/>}</span>
        </Container>
    );
};
