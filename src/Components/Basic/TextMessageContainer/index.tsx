import React from "react";
import styled from "styled-components";

import { ITextMessageContainer } from "./TextMessageContainer";

// import { TriangleDown } from "@Components/Basic/PositionedModal";
const TextContainer = styled.div<ITextMessageContainer.IProps>`
   padding: 24px 16px;
   color: white;
   border-radius: 20px;
   position: relative;
   background: ${({ isMessageRecieved, theme }) => (isMessageRecieved ? theme.colors.grey400 : theme.colors.primary)};

`;
const TriangleDown = styled.div<ITextMessageContainer.IProps>`
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: ${({ isMessageRecieved, theme }) => ("25px solid " + (isMessageRecieved ? theme.colors.grey400 : theme.colors.primary))};
        position: absolute;
        left: ${({ isMessageRecieved }) => (isMessageRecieved ? "-15px" : "initial")};
        right: ${({ isMessageRecieved }) => (isMessageRecieved ? "initial" : "-6px")};
        bottom: 0px;
        transform: rotate(65deg);
`;

export const TextMessageContainer: React.FunctionComponent<ITextMessageContainer.IProps> = ({children, ...props}) => {
    return (<TextContainer {...props}>
            { children }
            <TriangleDown {...props} />   
    </TextContainer>)
};
