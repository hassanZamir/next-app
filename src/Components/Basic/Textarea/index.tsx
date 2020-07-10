// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ITextarea } from "./Textarea";
// #endregion Local Imports

const _Textarea = styled.textarea`
    background-color: transparent;
    padding: 5px;
    color: inherit;
    outline-width: 0;
`;

export const Textarea: React.FunctionComponent<ITextarea.IProps> = ({ rows, columns, ...rest}) => {
    return <_Textarea rows={rows} cols={columns} {...rest} />;
};
