import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "@Definitions/Styled";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const ModalContainer = styled.div<{ border?: string, borderRadius?: string, width?: string, background?: string, padding?: string }>`
    border: ${({ border }) => { return (border ? '2.5px solid ' + border : '0px') + ';' }};
    z-index: 100;
    background: ${({ background }) => { return (background ? background : 'white') }};
    position: relative;
    margin: auto;
    border-radius: ${({ borderRadius }) => { return (borderRadius ? borderRadius : '6px') + ';' }};
    padding: ${({ padding }) => { return (padding ? padding : '1rem 2rem') + ';' }};
    width: ${({ width }) => { return (width ? width : '300px') }};
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;

`;

export const Modal: React.FunctionComponent<{ border?: string, borderRadius?: string, width?: string, background?: string, padding?: string, style?: {} }> = ({ children, ...rest }) => {
    return <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper">
            <ModalContainer {...rest}>
                {children}
            </ModalContainer>
        </div>
    </React.Fragment>
}