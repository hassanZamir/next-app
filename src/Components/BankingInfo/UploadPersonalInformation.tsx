import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";

import {
    PrimaryButton,
    LabelInput,
    FormComponent,
    SelectInput,
    RadioInput,
} from "@Components";
import { BankingInfoActions } from "@Actions";
import DobConst from "../../../pages/signup/dob-constants.json";
import LocationsList from "../../../pages/signup/locations-list.json";
import { USER_SESSION } from "@Interfaces/index.js";

export const UploadPersonalInformation: React.FunctionComponent<{
    user: USER_SESSION;
    defaultPersonalInformation: any;
}> = ({ user, defaultPersonalInformation }) => {
    const [enableSumit, setEnableSumit] = useState(true);
    const [checkedConsent, setCheckedConsent] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            "id" in defaultPersonalInformation &&
            defaultPersonalInformation.explicitContent
        )
            setCheckedConsent(true);
    }, [defaultPersonalInformation]);

    async function handleSubmit(data: any) {
        console.info("Bankinfo-postData", data);
        if (enableSumit) {
            const params = {
                firstName: data.firstName,
                lastName: data.lastName,
                street: data.street,
                city: data.city,
                state: data.state,
                postCode: data.postCode,
                country: data.country,
                dob:
                    data.dob.year +
                    "-" +
                    DobConst.months.indexOf(data.dob.month) +
                    "-" +
                    data.dob.date,
                explicitContent: checkedConsent,
                userId: user.id,
                authtoken: user.token,
            };
            setEnableSumit(false);
            await dispatch(BankingInfoActions.PostPersonalInformation(params));
            setEnableSumit(true);
        }
    }

    // const handleImageChange = (e: any, key: string) => {
    //     if (e.target.files.length) {
    //         const uploadedFiles = [];

    //         for (let i = 0; i < e.target.files.length; i++) {
    //             uploadedFiles.push({
    //                 key: key,
    //                 preview: URL.createObjectURL(e.target.files[i]),
    //                 raw: e.target.files[i],
    //             } as IUploadImage);
    //         }
    //         const filteredFiles = files.filter(f => {
    //             return f.key !== key;
    //         });
    //         setFiles([...filteredFiles, ...uploadedFiles]);
    //     }
    // };

    // const getFilePreview = (_files: IUploadImage[], key: string): string => {
    //     const filtered = _files.filter(file => {
    //         return file.key === key;
    //     });
    //     return filtered && filtered[0] ? filtered[0].preview : "";
    // };

    const mapDefaultValues = (defaultPersonalInfo: any) => {
        try {
            if (!("id" in defaultPersonalInfo)) return {};

            const {
                dob,
                explicitContent,
                ...rest
            } = defaultPersonalInfo;
            const dateOfBirth = dob.split("T")[0].split("-");

            return {
                ...rest,
                explicitContent: explicitContent,
                dob: {
                    date: dateOfBirth[2],
                    month: DobConst.months[parseInt(dateOfBirth[1])],
                    year: dateOfBirth[0],
                },
            };
        } catch (e) {
            console.log("Exception mapping default personal info");
        }
    };

    const mappedDefaultPermissions =
        "id" in defaultPersonalInformation
            ? mapDefaultValues(defaultPersonalInformation)
            : {};
    return (
        <div className="d-flex flex-column w-100 px-4">
            <div className="py-2 text-primary font-12px border-top border-bottom d-flex align-items-center justify-content-start">
                Personal Information
            </div>
            <div className="d-flex justify-content-center ">
                <div className="py-2" style={{ width: "300px" }}>
                    <FormComponent
                        onSubmit={handleSubmit}
                        defaultValues={mappedDefaultPermissions}
                        submitActive={
                            "id" in defaultPersonalInformation ||
                            enableSumit
                        }
                        submitSuccess={false}
                    >
                        <LabelInput
                            type="text"
                            labelText="First Name"
                            name="firstName"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "First Name is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Last Name"
                            name="lastName"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Last Name is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Street"
                            name="street"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Street is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="City"
                            name="city"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "City is required",
                                validate: (value: string) => {
                                    var regex = /^[a-zA-Z ]+$/;
                                    if (!regex.test(value))
                                        return "City must be a string";
                                },
                            }}
                        />

                        <div className="d-flex justify-content-between mt-3">
                            <LabelInput
                                type="text"
                                labelText="State"
                                name="state"
                                wrapperClass="mr-2"
                                validationRules={{
                                    required: "State is required",
                                    validate: (value: string) => {
                                        var regex = /^[a-zA-Z ]+$/;
                                        if (!regex.test(value))
                                            return "State must be a string";
                                    },
                                }}
                            />

                            <LabelInput
                                type="number"
                                labelText="Post Code"
                                name="postCode"
                                wrapperClass="ml-2"
                                validationRules={{
                                    required: "Post Code is required",
                                    validate: (value: string) => {
                                        var regex = /^[0-9]+$/;
                                        if (!regex.test(value))
                                            return "Post Code must be a number";
                                    },
                                }}
                            />
                        </div>

                        <SelectInput
                            type={["text"]}
                            labelText="Country"
                            name={["country"]}
                            options={[LocationsList.countries]}
                            wrapperClass="mt-3"
                            validationRules={[
                                { required: "Country selection is required." },
                            ]}
                        />

                        <SelectInput
                            type={["number", "number", "number"]}
                            labelText="Date of Birth"
                            name={["dob.date", "dob.month", "dob.year"]}
                            options={[
                                DobConst.date,
                                DobConst.months,
                                DobConst.year,
                            ]}
                            wrapperClass="mt-3"
                            validationRules={[
                                {
                                    required: "Date is required",
                                    validate: (value: string) => {
                                        return value !== "DD"
                                            ? true
                                            : "Please select Date of Birth";
                                    },
                                },
                                {
                                    required: "Month is required",
                                    validate: (value: string) => {
                                        return value !== "MM"
                                            ? true
                                            : "Please select Month of Birth";
                                    },
                                },
                                {
                                    required: "Year is required",
                                    validate: (value: string) => {
                                        return value !== "YYYY"
                                            ? true
                                            : "Please select Year of Birth";
                                    },
                                },
                            ]}
                        />



                        <div className="w-100 mt-3 d-flex align-items-start text-darkGrey font-10px lato-semibold">
                            Explicit Content{" "}
                            <span className="lato-regular ml-1">
                                (Tick if yes)
                            </span>
                        </div>

                        <RadioInput
                            onClick={() => {
                                setCheckedConsent(!checkedConsent);
                            }}
                            type="radio"
                            labelTextElem={
                                <div className="text-darkGrey lato-regular font-11px">
                                    <span>
                                        Will you be posting explicit content?
                                    </span>
                                </div>
                            }
                            value={checkedConsent ? "1" : "0"}
                            checked={checkedConsent}
                            onChange={() => { }}
                            // labelText="Will you be posting explicit content?"
                            name="explicitContentRadio"
                            wrapperClass="mt-3"
                            inputMargin="0px 5px 0px 0px"
                            labelTextClass="text-darkGrey font-10px"
                        />

                        <PrimaryButton
                            type="submit"
                            className="my-3"
                            name="signUp"
                            borderRadius="4px"
                            padding="5px 15px"
                            showLoader={!enableSumit}
                        >
                            Save Changes
                        </PrimaryButton>
                    </FormComponent>
                </div>
            </div>
        </div>
    );
};
