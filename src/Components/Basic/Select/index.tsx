// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ISelect } from "./Select";
// #endregion Local Imports

const _Select = styled.select`
    background-color: #FFFFFF;
    padding: 0px 5px;
    color: black;
    outline-width: 0;
`;

export const Select: React.FunctionComponent<ISelect.IProps> = React.forwardRef((props, ref) => {
    return <_Select ref={ref} name={props.name} {...props}>
        {props.options.map((value: string, index: number) => (
            <option value={value} key={index}>{value}</option>
        ))}
    </_Select>;
});
