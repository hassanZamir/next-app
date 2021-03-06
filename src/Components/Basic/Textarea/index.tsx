// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ITextarea } from "./Textarea";
// #endregion Local Imports

const _Textarea = styled.textarea`
    resize: none;
    background-color: transparent;
    padding: 5px;
    color: inherit;
    outline-width: 0;
    background: white;
    min-height: 35px;
`;
export const Textarea: React.FunctionComponent<ITextarea.IProps> = ({
    ref,
    defaultValue,
    rows,
    columns,
    ...rest
}) => {
    return <_Textarea ref={ref} defaultValue={defaultValue} rows={rows} cols={columns} {...rest} />;
};
