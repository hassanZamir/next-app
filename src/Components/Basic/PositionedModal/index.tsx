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
const PositionedModalWrapper = styled.div`
    display: flex;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
`
const TriangleDown = styled.div`
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid white;
    position: absolute;
    right: -12px;
    top: -30px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
`

export const PositionedModal: React.FunctionComponent<{ border?: string, borderRadius?: string }> = ({children, ...rest}) => {
    return <React.Fragment>
        <div className="modal-overlay"/>
        <PositionedModalWrapper>
            <PositionedModalContainer {...rest}>
                {children}
            </PositionedModalContainer>
            <TriangleDown />
        </PositionedModalWrapper>
    </React.Fragment>
}