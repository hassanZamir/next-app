import React from "react";
import styled from "styled-components";

import { ILabelInput, ISelectInput } from "./LabelInput";

import { RegInput, Select } from "../Basic";

const Container = styled(RegInput)`
    height: 26px;
    width: 100%;
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 6px;
`;

const SelectContainer = styled(Select)`
    height: 26px;
    width: 100%;
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 6px;
`;

export const DobInput: React.FunctionComponent<ISelectInput.IProps> = ({ options, labelText, name, register, formErrors, validationRules, ...props }) => {
    return (
        <div className={"d-flex flex-column align-items-start w-100 " + (props.wrapperClass ? props.wrapperClass : "")}>
            <label className="text-primary font-13px">{labelText}</label>
            <div className="d-flex justify-content-between w-100">
                {name.map((inputName, index) => {
                    return <div key={index} className="">
                        <SelectContainer options={options[index]} name={inputName} ref={register ? register(validationRules[index]): null} />
                    </div>
                })}
            </div>
            <div className="text-danger font-10px">{ formErrors ? formErrors[name[0]] ? formErrors[name[0]].message : '' : ''}</div>
        </div>
    )
};

export const LabelInput: React.FunctionComponent<ILabelInput.IProps> = ({ type, labelText, name, register, formErrors, ...props }) => {
    return (
        <div className={"d-flex flex-column align-items-start w-100 " + (props.wrapperClass ? props.wrapperClass : "")}>
            <label className="text-primary font-13px">{labelText}</label>
            <Container name={name} ref={register} type={type} {...props} />
            <div className="text-danger font-10px">{ formErrors ? formErrors[name] ? formErrors[name].message : '' : ''}</div>
        </div>
    )
};
