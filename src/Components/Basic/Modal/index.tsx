import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const ModalContainer = styled.div`
    z-index: 100;
    background: white;
    position: relative;
    margin: auto;
    border-radius: 6px;
    padding: 2rem;
    width: 300px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;

`;

export const Modal: React.FunctionComponent = ({children}) => {
    return <ModalContainer >
        {children}
    </ModalContainer>
}