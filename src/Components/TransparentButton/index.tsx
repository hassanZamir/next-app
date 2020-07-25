import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ITransparentButton } from "./TransparentButton";

import { Button } from "../Basic";

const Container = styled(Button)<ITransparentButton.IProps>`
    background: transparent;
    padding: ${({ padding }) => {return (padding ? padding : "7px 32px")}};
    border-radius: ${({ borderRadius }) => {return (borderRadius ? borderRadius : "22px")}};
    color: ${({ theme }) => theme.colors.primary};
    border: ${({ border }) => {return (border ? border : "1px solid #A0A0A0")}};
`;

export const TransparentButton: React.FunctionComponent<ITransparentButton.IProps> = ({
    children,
    isActive,
    onClick,
    className,
    type,
    borderRadius, 
    ...rest
}) => {
    return (
        <Container {...rest} isActive={isActive} onClick={onClick} className={className} type={type} borderRadius={borderRadius}>
            {children}
        </Container>
    );
};
