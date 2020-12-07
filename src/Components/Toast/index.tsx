import React from "react";
import styled, { keyframes } from "styled-components";
import { ToastProps } from 'react-toast-notifications';

const slideIn = keyframes`
    0% { transform: translate3d(-200px, 0px, 0px) }
    100% { transform: translate3d(0, 0, 0) }
`

const Container = styled.div`
    background: transparent linear-gradient(260deg, #F57B52 0%, #EE5D5D 45%, #D96841 95%, #C45934 100%) 0% 0% no-repeat padding-box;
    padding: 10px;
    border-radius: 15px;
    animation-name: ${slideIn};
    transform: translate3d(0, 0, 0);
    animation-duration: .5s;
    color: white;
    left: auto !important;
    right: auto !important;
    width: 80vw !important;
    position: relative !important;
    text-align: center !important;

`;

export const Toast: React.FunctionComponent<ToastProps> = ({ children, ...props }) => {
    return <Container {...props}>
        {children}
    </Container>
};