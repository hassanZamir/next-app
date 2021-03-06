import React from "react";
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% { transform: translate3d(0, -600px, 0) }
    100% { transform: translate3d(0, 0, 0) }
`;

const PositionedModalContainer = styled.div<{
    border?: string;
    borderRadius?: string;
    containerProps?: { right?: string; top?: string };
}>`
    border: ${({ border }) => {
        return (border ? "2.5px solid " + border : "0px") + ";";
    }}
    z-index: 100;
    background: white;
    position: absolute;
    right: ${({ containerProps }) => {
        return containerProps && containerProps.right
            ? containerProps.right
            : "-15px";
    }};
    top: ${({ containerProps }) => {
        return containerProps && containerProps.top
            ? containerProps.top
            : "-90px";
    }};
    margin: auto;
    border-radius: ${({ borderRadius }) => {
        return borderRadius ? borderRadius : "6px";
    }};
    padding: 10px;
    min-width: 115px;
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: .3s;
    z-index: 1050;
`;

export const TriangleDown = styled.div<{
    triangleProps?: { right?: string; top?: string };
}>`
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid white;
    position: absolute;
    right: ${({ triangleProps }) => {
        return triangleProps && triangleProps.right
            ? triangleProps.right
            : "-12px";
    }};
    top: ${({ triangleProps }) => {
        return triangleProps && triangleProps.top ? triangleProps.top : "-90px";
    }};
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: 0.3s;
    z-index: 1050;
`;

export const TriangleUp = styled.div<{
    triangleProps?: { right?: string; top?: string };
}>`
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid white;
    position: absolute;
    right: ${({ triangleProps }) => {
        return triangleProps && triangleProps.right
            ? triangleProps.right
            : "-12px";
    }};
    top: ${({ triangleProps }) => {
        return triangleProps && triangleProps.top ? triangleProps.top : "-90px";
    }};
    animation-name: ${slideInFromTop};
    transform: translate3d(0, 0, 0);
    animation-duration: 0.3s;
    z-index: 1050;
`;

export const PositionedModal: React.FunctionComponent<{
    triangleUp?: boolean;
    border?: string;
    borderRadius?: string;
    triangleProps?: { right?: string; top?: string };
    containerProps?: { right?: string; top?: string };
}> = ({ children, triangleProps, triangleUp, ...rest }) => {
    return (
        <React.Fragment>
            <div className="modal-overlay" />
            <PositionedModalContainer {...rest}>
                {children}
            </PositionedModalContainer>
            {triangleUp ? (
                <TriangleUp triangleProps={triangleProps} />
            ) : (
                <TriangleDown triangleProps={triangleProps} />
            )}
        </React.Fragment>
    );
};
