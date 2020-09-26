import React from "react";
import styled from "styled-components";

import { ITextMessageContainer } from "./TextMessageContainer";

// import { TriangleDown } from "@Components/Basic/PositionedModal";
const TextContainer = styled.div<ITextMessageContainer.IProps>`
   padding: 8px 16px;
   color: white;
   border-radius: 20px;
   position: relative;
   background: ${({ isMessageRecieved, theme }) => (isMessageRecieved ? theme.colors.grey400 : theme.colors.primary)};

`;
const TriangleDown = styled.div<ITextMessageContainer.IProps>`
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: ${({ isMessageRecieved, theme }) => ((isMessageRecieved ? "14px solid " : "10px solid ") + (isMessageRecieved ? theme.colors.grey400 : theme.colors.primary))};
        position: absolute;
        left: ${({ isMessageRecieved }) => (isMessageRecieved ? "-6px" : "initial")};
        right: ${({ isMessageRecieved }) => (isMessageRecieved ? "initial" : "0px")};
        bottom: 0px;
        transform: rotate(65deg);
`;

export const TextMessageContainer: React.FunctionComponent<ITextMessageContainer.IProps> = ({children, ...props}) => {
    return (<TextContainer {...props}>
            { children }
            <TriangleDown {...props} />   
    </TextContainer>)
};
