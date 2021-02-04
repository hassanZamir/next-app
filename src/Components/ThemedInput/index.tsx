import React from "react";
import styled from "styled-components";

import { IThemeInput, IThemeInputWithLabel } from "./ThemedInput";

import { Input } from "../Basic";

const Container = styled(Input) <{ border?: string, width?: string, fontFamily?: string }>`
    width: ${({ width }) => { return width ? width : '100%' }};
    border: none;
    border-bottom: 1px solid ${({ border }) => (border ? border : ({ theme }) => theme.colors.primary)};
    border-radius: 0px;
    outline: none;
    font-family: ${({ fontFamily }) => { return fontFamily ? fontFamily : 'inherit' }};
    font-size: 16px;
`;

export const ThemedInput: React.FunctionComponent<IThemeInput.IProps> = (props) => {
    return (
        <Container name='' {...props} />
    );
};

export const ThemedInputWithLabel: React.FunctionComponent<IThemeInputWithLabel.IProps> = (props) => {
    const { labelProps } = props;
    const { labelClass, labelText, ...labelPropsRest } = labelProps;
    return (
        <div className="position-relative">
            <label className={labelClass} {...labelPropsRest}>{labelText}</label>
            <Container {...props} />
        </div>
    );
};
