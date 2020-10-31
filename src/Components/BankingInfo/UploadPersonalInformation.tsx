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
const mediaBaseUrl = "https://venodev.blob.core.windows.net/veno-media";

interface IUploadImage {
    key: string;
    preview: "";
    raw: {
        name: string;
        size: number;
        type: string;
        webkitRelativePath: "";
    };
}

const DOC_TYPES = ["Identity Card", "Passport", "Driving Licence"];
export const UploadPersonalInformation: React.FunctionComponent<{
    user: USER_SESSION;
    defaultPersonalInformation: any;
}> = ({ user, defaultPersonalInformation }) => {
    const [enableSumit, setEnableSumit] = useState(true);
    const [files, setFiles] = useState<IUploadImage[]>([]);
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
        if (
            "id" in defaultPersonalInformation ||
            (enableSumit && files.length >= 2)
        ) {
            const filesPayload: any = [];
            files.forEach(file => {
                const formData = new FormData();
                formData.append(
                    "mediaFiles",
                    new Blob([file.raw as any]),
                    file.raw.name
                );
                filesPayload.push({
                    key: file.key,
                    url: formData,
                });
            });

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
                docType: DOC_TYPES.indexOf(data.documentType) + 1,
                docPhoto: "",
                docUserPhoto: "",
                docNumber: "312341233214",//data.docNumber,
                docExpiry: "2022-03-04",//data.docExpiry.year + "-" + DobConst.months.indexOf(data.docExpiry.month)  + "-" + data.docExpiry.date,
                explicitContent: checkedConsent,
                media_url: filesPayload,
                userId: user.id,
            };
            setEnableSumit(false);
            await dispatch(BankingInfoActions.PostPersonalInformation(params));
            setEnableSumit(true);
        }
    }

    const handleImageChange = (e: any, key: string) => {
        if (e.target.files.length) {
            const uploadedFiles = [];

            for (let i = 0; i < e.target.files.length; i++) {
                uploadedFiles.push({
                    key: key,
                    preview: URL.createObjectURL(e.target.files[i]),
                    raw: e.target.files[i],
                } as IUploadImage);
            }
            const filteredFiles = files.filter(f => {
                return f.key !== key;
            });
            setFiles([...filteredFiles, ...uploadedFiles]);
        }
    };

    const getFilePreview = (_files: IUploadImage[], key: string): string => {
        const filtered = _files.filter(file => {
            return file.key === key;
        });
        return filtered && filtered[0] ? filtered[0].preview : "";
    };

    const mapDefaultValues = (defaultPersonalInfo: any) => {
        try {
            if (!("id" in defaultPersonalInfo)) return {};

            const {
                dob,
                docType,
                docExpiry,
                docPhoto,
                docUserPhoto,
                explicitContent,
                ...rest
            } = defaultPersonalInfo;
            const dateOfBirth = dob.split("T")[0].split("-");
            const documentExpiry = docExpiry.split("T")[0].split("-");

            return {
                ...rest,
                docPhoto: docPhoto,
                docUserPhoto: docUserPhoto,
                explicitContent: explicitContent,
                dob: {
                    date: dateOfBirth[2],
                    month: DobConst.months[parseInt(dateOfBirth[1])],
                    year: dateOfBirth[0],
                },
                docType: DOC_TYPES[docType - 1],
                docExpiry: {
                    date: documentExpiry[2],
                    month: DobConst.months[parseInt(documentExpiry[1])],
                    year: documentExpiry[0],
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
                            (enableSumit && files.length >= 2)
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
                                    var regex = /^[a-zA-Z]+$/;
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
                                        var regex = /^[a-zA-Z]+$/;
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

                        <SelectInput
                            type={["text"]}
                            labelText="Document Type"
                            name={["documentType"]}
                            options={[DOC_TYPES]}
                            wrapperClass="mt-3"
                            validationRules={[
                                {
                                    required:
                                        "Document Type selection is required.",
                                },
                            ]}
                        />

                        <div className="d-flex flex-column font-13px">
                            <div className="lato-semibold text-darkGrey my-2">
                                Photo of your ID
                            </div>
                            <div className="d-flex">
                                {!getFilePreview(files, "docPhoto") && (
                                    <img
                                        src={
                                            defaultPersonalInformation &&
                                                defaultPersonalInformation.docPhoto
                                                ? mediaBaseUrl +
                                                "/" +
                                                defaultPersonalInformation.docPhoto
                                                : "/images/card_copy@2x.png"
                                        }
                                        height="69"
                                        width="69"
                                    />
                                )}
                                {getFilePreview(files, "docPhoto") && (
                                    <img
                                        height="69"
                                        width="69"
                                        src={getFilePreview(files, "docPhoto")}
                                    />
                                )}
                                <div className="d-flex flex-column ml-2">
                                    <div className="text-primary">Example</div>
                                    <div className="text-darkGrey">
                                        A clear image of your whole ID card
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <div
                                            className="bg-primary text-white px-2 py-1"
                                            onClick={(e: any) => {
                                                const _input =
                                                    e.target.children[0];
                                                _input && _input.click();
                                            }}
                                        >
                                            Upload File
                                            <input
                                                accept="image/*"
                                                id="upload-cover-image"
                                                name="upload-cover-image"
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={e => {
                                                    handleImageChange(
                                                        e,
                                                        "docPhoto"
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lato-semibold text-darkGrey my-2">
                                Photo of you holding your ID
                            </div>
                            <div className="d-flex">
                                {!getFilePreview(files, "docUserPhoto") && (
                                    <img
                                        src={
                                            defaultPersonalInformation &&
                                                defaultPersonalInformation.docUserPhoto
                                                ? mediaBaseUrl +
                                                "/" +
                                                defaultPersonalInformation.docUserPhoto
                                                : "/images/doc_holding_image@2x.png"
                                        }
                                        height="69"
                                        width="69"
                                    />
                                )}
                                {getFilePreview(files, "docUserPhoto") && (
                                    <img
                                        height="69"
                                        width="69"
                                        src={getFilePreview(
                                            files,
                                            "docUserPhoto"
                                        )}
                                    />
                                )}
                                <div className="d-flex flex-column ml-2">
                                    <div className="text-primary">Example</div>
                                    <div className="text-darkGrey">
                                        A clear image of your whole ID card
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <div
                                            className="bg-primary text-white px-2 py-1"
                                            onClick={(e: any) => {
                                                const _input =
                                                    e.target.children[0];
                                                _input && _input.click();
                                            }}
                                        >
                                            Upload File
                                            <input
                                                accept="image/*"
                                                id="upload-cover-image"
                                                name="upload-cover-image"
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={e => {
                                                    handleImageChange(
                                                        e,
                                                        "docUserPhoto"
                                                    );
                                                }}
                                            />
                                        </div>
                                        {/* {getFilePreview(files, 'docUserPhoto') && <img height="20" width="20" src={getFilePreview(files, 'docUserPhoto')} />} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <LabelInput 
                            type="text"
                            labelText="Card Number" 
                            name="docNumber"
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Card Number is required" } }} 
                        /> */}
                        {/* <LabelInput 
                            type="text"
                            labelText="Card Number"
                            name="docNumber"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Card Number is required",
                                validate: (value: string) => {
                                    const regex = new RegExp(
                                        "^4[0-9]{12}(?:[0-9]{3})?$"
                                    );
                                    return regex.test(value)
                                        ? true
                                        : "Should be 16 digit valid visa card number";
                                },
                            }}
                        /> */}

                        {/* <SelectInput
                            type={["number", "number", "number"]}
                            labelText="Expiry"
                            name={[
                                "docExpiry.date",
                                "docExpiry.month",
                                "docExpiry.year",
                            ]}
                            options={[
                                DobConst.date,
                                DobConst.months,
                                DobConst.year,
                            ]}
                            wrapperClass="mt-3"
                            validationRules={[{ 
                                required: "Date is required",
                                validate: (value: string) => {
                                    return value !== "DD" ? true : "Please select Date of Birth"
                                } 
                            }, { 
                                required: "Month is required",
                                validate: (value: string) => {
                                    return value !== "MM" ? true : "Please select Month of Birth"
                                }
                            }, { 
                                required: "Year is required",
                                validate: (value: string) => {
                                    return value !== "YYYY" ? true : "Please select Year of Birth"
                                } 
                            }]}
                        /> */}

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
                            labelTextElem={<div className="text-darkGrey lato-regular font-11px">
                                <span>Will you be posting explicit content?</span>
                            </div>}
                            value={checkedConsent ? "1" : "0"}
                            checked={checkedConsent}
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
