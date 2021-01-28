import React from "react";
import styled from "styled-components";

import { ILabelInput, ISelectInput, IMultiLabelInput } from "./LabelInput";
import { RegInput, Select } from "../Basic";

const Container = styled(RegInput)`
    height: 29px;
    width: 100%;
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    color: ${({ theme }) => theme.colors.inputTextClor};
    border-radius: 6px;
    padding-left: 5px;
    outline: none;
    font-size: 16px;
`;

const SelectContainer = styled(Select)`
    height: 32px;
    width: 100%;
    border: none;
    color: ${({ theme }) => theme.colors.inputTextClor};
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 6px;
`;

export const SelectInput: React.FunctionComponent<ISelectInput.IProps> = ({
    options,
    labelText,
    name,
    register,
    formErrors,
    validationRules,
    ...props
}) => {
    return (
        <div
            className={
                "d-flex flex-column align-items-start w-100 " +
                (props.wrapperClass ? props.wrapperClass : "")
            }
        >
            <label className="text-primary font-13px">{labelText}</label>
            <div className="d-flex justify-content-between w-100">
                {name.map((inputName, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                width:
                                    name.length <= 1
                                        ? "100%"
                                        : 100 / name.length - 2 + "%",
                            }}
                        >
                            <SelectContainer
                                options={options[index]}
                                name={inputName}
                                selectRef={
                                    register
                                        ? register(validationRules[index])
                                        : null
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <div className="text-danger font-10px">
                {formErrors
                    ? formErrors[name[0]]
                        ? formErrors[name[0]].message
                        : ""
                    : ""}
            </div>
        </div>
    );
};

export const LabelInput: React.FunctionComponent<ILabelInput.IProps> = ({
    type,
    labelText,
    name,
    register,
    formErrors,
    ...props
}) => {
    return (
        <div
            className={
                "d-flex  flex-column align-items-start w-100 " +
                (props.wrapperClass ? props.wrapperClass : "")
            }
        >
            <label className="text-primary font-13px lato-regular">
                {labelText}
            </label>
            <Container name={name} ref={register} type={type} {...props} />
            <div className="text-danger font-10px">
                {formErrors
                    ? formErrors[name]
                        ? formErrors[name].message
                        : ""
                    : ""}
            </div>
        </div>
    );
};

export const MultiLabelInput: React.FunctionComponent<IMultiLabelInput.IProps> = ({
    placeholder,
    type,
    labelText,
    name,
    register,
    formErrors,
    validationRules,
    ...props
}) => {
    const errorFields = name.map((field, i) => {
        return {
            label: field.split(".")[0],
            labelInput: field.split(".")[1],
        };
    });
    return (
        <div
            className={
                "d-flex flex-column align-items-start w-100 " +
                (props.wrapperClass ? props.wrapperClass : "")
            }
        >
            <label className="text-primary font-13px">{labelText}</label>
            <div className="d-flex justify-content-between w-100">
                {name.map((inputName, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "mr-2 " + (name.length <= 1 ? "w-100" : "")
                            }
                        >
                            <Container
                                placeholder={placeholder![index]}
                                name={inputName}
                                ref={
                                    register
                                        ? register(validationRules[index])
                                        : null
                                }
                                type={type[index]}
                                {...props}
                            />
                        </div>
                    );
                })}
            </div>
            {errorFields.map(field => {
                return (
                    <div className="text-danger font-10px">
                        {formErrors[field.label] &&
                            formErrors[field.label][field.labelInput]
                            ? formErrors[field.label][field.labelInput].message
                            : ""}
                    </div>
                );
            })}
        </div>
    );
};
