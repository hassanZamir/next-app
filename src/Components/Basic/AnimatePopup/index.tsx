import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const slideInToTop = keyframes`
    0% { transform: translate3d(0, 0, 0) }
    10% { transform: translate3d(0, -20px, 0) }
    20% { transform: translate3d(0, -40px, 0) }
    100% { transform: translate3d(0, -200px, 0) }
`

const Container = styled.div<{ animateIn: boolean}>`
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    top: 35px;
    animation-name: ${({ animateIn }) => { return animateIn ? slideInFromTop : slideInToTop }};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
    z-index: 999;
`;

export const AnimatePopup: React.FunctionComponent<{ animateIn: boolean }> = ({children, animateIn}) => {
    return <React.Fragment>
        <Container animateIn={animateIn}>
            {children}
        </Container>
    </React.Fragment>
}