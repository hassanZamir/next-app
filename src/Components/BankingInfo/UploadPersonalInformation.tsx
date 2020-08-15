import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    PrimaryButton, 
    LabelInput, 
    MultiLabelInput,
    FormComponent, 
    SelectInput,
    RadioInput
} from "@Components";
import { BankingInfoActions } from "@Actions";
import DobConst from "../../../pages/signup/dob-constants.json";
import LocationsList from "../../../pages/signup/locations-list.json";
import { USER_SESSION } from "@Interfaces/index.js";

interface IUploadImage {
    key: string,
    preview: "", 
    raw: {
        name: string,
        size: number,
        type: string,
        webkitRelativePath: ""
    }
}

const DOC_TYPES = ["Identity Card", "Passport", "Driving Lisence", "Insurence"];
export const UploadPersonalInformation: React.FunctionComponent<{ user: USER_SESSION}> 
    = ({ user }) => {
    
    const [enableSumit, setEnableSumit] = useState(true);
    const [files, setFiles] = useState<IUploadImage[]>([]);
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false);

    async function handleSubmit(data: any) {
        console.log("in handle submit");
        if (enableSumit && files.length >= 2) {
            const filesPayload: any = [];
            files.forEach((file) => {
                const formData = new FormData();
                formData.append('mediaFiles', new Blob([file.raw as any]), file.raw.name);
                filesPayload.push({ 
                    key: file.key, 
                    url: formData
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
                dob: data.dob.year + "-" + (DobConst.months.indexOf(data.dob.month) + 2)  + "-" + data.dob.date,
                docType: DOC_TYPES.indexOf(data.documentType) + 1,
                docPhoto: "",
                docUserPhoto: "",
                docNumber: data.docNumber,
                docExpiry: data.docExpiry.year + "-" + data.docExpiry.month  + "-" + data.docExpiry.date,
                explicitContent: true,
                media_url: filesPayload,
                userId: user.id
            }
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
                    raw: e.target.files[i]
                } as IUploadImage);
            }
            const filteredFiles = files.filter((f) => {
                return f.key !== key;
            });
            setFiles([...filteredFiles, ...uploadedFiles]);
        }
    }

    const getFilePreview = (_files: IUploadImage[], key: string) : string => {
        const filtered = _files.filter((file) => { return file.key === key});
        return filtered && filtered[0] ? filtered[0].preview : "";
    }

    return (<div className="d-flex flex-column w-100 px-4">
        <div className="py-2 text-primary font-12px border-top border-bottom d-flex align-items-center justify-content-start">
            Personal Information
        </div>
        <div className="d-flex justify-content-center ">
            <div className="py-2" style={{ width: "300px" }}>
                <FormComponent 
                    onSubmit={handleSubmit} 
                    defaultValues={{}} 
                    submitActive={enableSumit && files.length >= 2}
                    submitSuccess={false}
                    >

                        <LabelInput 
                            type="text"
                            labelText="First Name" 
                            name="firstName"
                            validationRules={{ required: {value: true, message: "First Name is required" } }} 
                        />

                        <LabelInput 
                            type="text"
                            labelText="Last Name" 
                            name="lastName"
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Last Name is required" } }} 
                        />

                        <LabelInput 
                            type="text"
                            labelText="Street" 
                            name="street"
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Street is required" } }} 
                        />

                        <LabelInput 
                            type="text"
                            labelText="City" 
                            name="city"
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "City is required" } }} 
                        />
                                
                        <div className="d-flex justify-content-between mt-3">
                            <LabelInput 
                                type="text"
                                labelText="State" 
                                name="state"
                                wrapperClass="mr-2"
                                validationRules={{ required: {value: true, message: "State is required" } }} 
                            />

                            <LabelInput 
                                type="number"
                                labelText="Post Code" 
                                name="postCode"
                                wrapperClass="ml-2"
                                validationRules={{ required: {value: true, message: "Post Code is required" } }} 
                            />
                        </div>

                        <SelectInput 
                            type={["text"]}
                            labelText="Country" 
                            name={["country"]}
                            options={[LocationsList.countries]} 
                            wrapperClass="mt-3"
                            validationRules={[{ required: "Country selection is required."}]}
                        />

                        <SelectInput
                            type={["number", "number", "number"]}
                            labelText="Date of Birth" 
                            name={["dob.date", "dob.month", "dob.year"]}
                            options={[DobConst.date, DobConst.months, DobConst.year]} 
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
                        />

                        <SelectInput 
                            type={["text"]}
                            labelText="Document Type" 
                            name={["documentType"]}
                            options={[DOC_TYPES]} 
                            wrapperClass="mt-3"
                            validationRules={[{ required: "Document Type selection is required."}]}
                        />

                        <div className="d-flex flex-column font-13px">
                            <div className="lato-semibold text-darkGrey my-2">Photo of your ID</div>
                            <div className="d-flex">
                                {!getFilePreview(files, 'docPhoto') && <img src="/images/card_copy@2x.png" height="69" width="69" />}
                                {getFilePreview(files, 'docPhoto') && <img height="69" width="69" src={getFilePreview(files, 'docPhoto')} />}
                                <div className="d-flex flex-column ml-2">
                                    <div className="text-primary">Example</div>
                                    <div className="text-darkGrey">A clear image of your whole ID card</div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <div className="bg-primary text-white px-2 py-1" onClick={(e: any)=> { 
                                            const _input = e.target.children[0];                        
                                            _input && _input.click();
                                        }}>
                                            Upload File
                                            <input accept="image/*" 
                                                id="upload-cover-image"
                                                name="upload-cover-image"
                                                type="file" 
                                                style={{ display: "none" }} 
                                                onChange={(e)=> { handleImageChange(e, 'docPhoto') }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lato-semibold text-darkGrey my-2">Photo of you holding your ID</div>
                            <div className="d-flex">
                                {!getFilePreview(files, 'docUserPhoto') && <img src="/images/doc_holding_image@2x.png" height="69" width="69" />}
                                {getFilePreview(files, 'docUserPhoto') && <img height="69" width="69" src={getFilePreview(files, 'docUserPhoto')} />}
                                <div className="d-flex flex-column ml-2">
                                    <div className="text-primary">Example</div>
                                    <div className="text-darkGrey">A clear image of your whole ID card</div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <div className="bg-primary text-white px-2 py-1" onClick={(e: any)=> { 
                                            const _input = e.target.children[0];                        
                                            _input && _input.click();
                                        }}>
                                            Upload File
                                            <input accept="image/*" 
                                                id="upload-cover-image"
                                                name="upload-cover-image"
                                                type="file" 
                                                style={{ display: "none" }} 
                                                onChange={(e)=> { handleImageChange(e, 'docUserPhoto') }} />
                                        </div>
                                        {/* {getFilePreview(files, 'docUserPhoto') && <img height="20" width="20" src={getFilePreview(files, 'docUserPhoto')} />} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <LabelInput 
                            type="text"
                            labelText="Card Number" 
                            name="docNumber"
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Card Number is required" } }} 
                        />
                        
                        <MultiLabelInput 
                            type={["text", "text", "text"]}
                            labelText="Expiry" 
                            name={["docExpiry.date", "docExpiry.month", "docExpiry.year"]} 
                            wrapperClass="mt-2"
                            placeholder={["DD", "MM", "YYYY"]}
                            validationRules={[{ 
                                required: "Expiry is required"
                            }, { 
                                required: "Expiry is required"
                            }, { 
                                required: "Expiry is required"
                            }]}
                        />

                        <div className="w-100 mt-3 d-flex align-items-start text-darkGrey font-10px lato-semibold">
                            Explicit Content <span className="lato-regular">(Tick if yes)</span>
                        </div>
                        
                        <RadioInput 
                            type="radio"
                            value="1" 
                            labelText="Will you be posting explicit content?"
                            name="explicitContentRadio" 
                            wrapperClass="mt-3"
                            inputMargin="0px 5px 0px 0px"
                            labelTextClass="text-darkGrey font-10px"
                            validationRules={{ required: {value: true, message: "Explicit content tick is required" } }}
                        />

                        <PrimaryButton  
                            type="submit"
                            className="my-3"
                            name="signUp"
                            borderRadius="4px"
                            padding="5px 15px"
                            showLoader={!enableSumit}>
                                Save Changes
                        </PrimaryButton>
                    </FormComponent>
            </div>
        </div>
    </div>);
}