import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`

const PositionedModalContainer = styled.div<{ border?: string, borderRadius?: string }>`
    border: ${({ border }) => { return (border ? '2.5px solid ' + border : '0px') + ';'}}
    z-index: 100;
    background: white;
    position: absolute;
    right: -15px;
    top: -90px;
    margin: auto;
    border-radius: ${({ borderRadius }) => { return (borderRadius ? borderRadius: '6px') + ';'}}
    padding: 10px;
    min-width: 115px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
    z-index: 1050;
`;

const TriangleDown = styled.div<{ triangleProps?: {right?: string}}>`
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid white;
    position: absolute;
    right: ${({ triangleProps }) => { return (triangleProps && triangleProps.right ? triangleProps.right : '-12px') }};
    top: -30px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
    z-index: 1050;
`

export const PositionedModal: React.FunctionComponent<{ border?: string, borderRadius?: string, triangleProps?: {right?: string} }> 
    = ({children, triangleProps, ...rest}) => {
    return <React.Fragment>
        <div className="modal-overlay"/>
            <PositionedModalContainer {...rest}>
                {children}
            </PositionedModalContainer>
            <TriangleDown triangleProps={triangleProps} />
    </React.Fragment>
}