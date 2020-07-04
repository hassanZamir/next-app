import React from "react";
import styled from "styled-components";

import { ILabelInput } from "./LabelInput";

import { RegInput } from "../Basic";

const Container = styled(RegInput)`
    width: 271px;
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 6px;
`;

export const LabelInput: React.FunctionComponent<ILabelInput.IProps> = ({ type, labelText, name, register, formErrors, ...props }) => {

    return (
        <div className={"d-flex flex-column align-items-start " + (props.wrapperClass ? props.wrapperClass : "")}>
            <label className="text-primary font-13px">{labelText}</label>
            <Container name={name} ref={register} type={type} {...props} />
            <span className="text-danger font-10px">{ formErrors ? formErrors[name] ? formErrors[name].message : '' : ''}</span>
        </div>
    )
};
