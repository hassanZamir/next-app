import React from "react";
import styled from "styled-components";

import { IParagraphText } from "./ParagraphText";

import { p } from "../Basic";

const _ParagraphText = styled(p)<IParagraphText.IProps>`
    margin: 0.3rem 0;
`;

export const ParagraphText: React.FunctionComponent<IParagraphText.IProps> = ({
    text,
    children,
    className
}) => {
    return (
        <_ParagraphText className={className} text={text}>
            {children}
        </_ParagraphText>
    );
};
