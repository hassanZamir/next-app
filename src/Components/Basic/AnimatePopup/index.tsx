import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const Container = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    top: 35px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
`;

export const AnimatePopup: React.FunctionComponent<{ border?: string, borderRadius?: string, width?: string }> = ({children, ...rest}) => {
    return <React.Fragment>
        <Container {...rest}>
            {children}
        </Container>
    </React.Fragment>
}