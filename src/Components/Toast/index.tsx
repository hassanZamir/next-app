import React from "react";
import styled, { keyframes } from "styled-components";
import { DefaultToast, ToastProps } from 'react-toast-notifications';
import { IToast } from "./Toast";

const slideIn = keyframes`
    0% { transform: translate3d(-200px, 0px, 0px) }
    100% { transform: translate3d(0, 0, 0) }
`

const Container = styled.div`
    background: transparent linear-gradient(260deg, #F57B52 0%, #EE5D5D 45%, #D96841 95%, #C45934 100%) 0% 0% no-repeat padding-box;
    padding: 15px;
    border-radius: 15px;
    animation-name: ${slideIn};
    transform: translate3d(0, 0, 0);
    animation-duration: .5s;
    color: white;
`;

export const Toast: React.FunctionComponent<ToastProps> = ({ children, ...props }) => {
    return <Container {...props}>
        {children}
    </Container>
};