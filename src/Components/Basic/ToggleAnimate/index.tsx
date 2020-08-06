import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromLeft = keyframes`
    0% { transform: translate3d(-15px, 0px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const Container = styled.div<{}>`
    animation-name: ${slideInFromLeft};
    transform: translate3d(0, 0, 0);
    animation-duration: 0.3s;
`;

export const ToggleAnimate: React.FunctionComponent<{ }> 
    = ({children}) => {
    return <React.Fragment>
        <Container>
                {children}
        </Container>
    </React.Fragment>
}