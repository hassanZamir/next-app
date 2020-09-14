// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IRadioInput } from "./RadioInput";
// #endregion Local Imports

import { RegInput } from "../Basic";

const Container = styled(RegInput)<{ inputMargin: string | undefined, inputHeight?: string, inputWidth?: string}>`
    margin: ${({ inputMargin }) => { return inputMargin ? inputMargin : "5px 10px 0px 0px"}};
    height: ${({ inputHeight }) => { return inputHeight ? inputHeight : "initial" }};
    width: ${({ inputWidth }) => { return inputWidth ? inputWidth : "initial" }};
`;

export const RadioInput: React.FunctionComponent<IRadioInput.IProps> 
    = ({ showLabel, labelTextElem, type, inputMargin, labelText, value, name, register, formErrors, ...props }) => {
    
    if (showLabel) {
        return (
            <div className={"d-flex align-items-start w-100 " + (props.wrapperClass ? props.wrapperClass : "")}>
                <Container inputMargin={inputMargin} name={name} ref={register} type={type} value={value} {...props} />
                {labelTextElem ? labelTextElem 
                    : <label className={props.labelTextClass ? props.labelTextClass : "text-primary font-13px"}>{labelText}</label>}
            </div>
        )
    } else {
        return <Container inputMargin={inputMargin} name={name} ref={register} type={type} value={value} {...props} />  
    }
    
};
