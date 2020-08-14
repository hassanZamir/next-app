// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { IRadioInput } from "./RadioInput";
// #endregion Local Imports

import { RegInput } from "../Basic";

const Container = styled(RegInput)<{ inputMargin: string | undefined}>`
    margin: ${({ inputMargin }) => { return inputMargin ? inputMargin : "5px 10px 0px 0px"}};
`;

export const RadioInput: React.FunctionComponent<IRadioInput.IProps> = ({ type, inputMargin, labelText, value, name, register, formErrors, ...props }) => {
    return (
        <div className={"d-flex align-items-start w-100 " + (props.wrapperClass ? props.wrapperClass : "")}>
            <Container inputMargin={inputMargin} name={name} ref={register} type={type} value={value} {...props} />
            <label className={props.labelTextClass ? props.labelTextClass : "text-primary font-13px"}>{labelText}</label>
            {/* <div className="text-danger font-10px">{ formErrors ? formErrors[name] ? formErrors[name].message : '' : ''}</div> */}
        </div>
    )
};
