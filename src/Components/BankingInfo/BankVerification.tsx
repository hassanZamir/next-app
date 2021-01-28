import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";

import {
    PrimaryButton,
    LabelInput,
    FormComponent,
    SelectInput,
    RadioInput,
    ParagraphText,
    LoadingSpinner,
} from "@Components";
import { BankingInfoActions } from "@Actions";
import LocationsList from "../../../pages/signup/locations-list.json";
import { USER_SESSION } from "@Interfaces/index.js";
import { BankAccountService } from "@Services";

export const BankVerification: React.FunctionComponent<{
    user: USER_SESSION;
}> = ({ user }) => {
    const [enableSumit, setEnableSumit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [userBankInfo, setUserBankInfo] = useState<any>({});
    const { bankVerificationState } = useSelector((store: IStore) => store.bankingInfo)
    const [verificationPending, setVerificationPending] = useState<any>(false);
    const dispatch = useDispatch();

    const GetBankingInfo = async () => {
        var result = await BankAccountService.GetBankAccountInfo({
            userid: user.id,
            authtoken: user.token
        })
        if (result && result.status && (result.response?.bankAccount ?? false)) {
            // map bank type code to string
            if (result.response.bankType == "1")
                result.response.bankType = "Checking";
            else if (result.response.bankType == "2")
                result.response.bankType = "Savings";

            // // check bank account status
            // if (result.response.state == "1")
            //     setBankAccountActive(true);
            // else if (result.response.state == "2")
            //     setBankAccountActive(false);
            if (result.response.state == "0")
                setVerificationPending(true);

            setUserBankInfo(result.response);
        }
        else {
            setUserBankInfo({});
        }
        setLoading(false);
    }

    useEffect(() => {
        // if (!userBankInfo || !userBankInfo.bankAccount) {
        // get the banking info
        setLoading(true);
        GetBankingInfo();

        // check bank account status
        if (bankVerificationState == 1)
            setVerificationPending(false);
        else if (bankVerificationState == 2)
            setVerificationPending(false);
        else if (bankVerificationState == 0)
            setVerificationPending(true);
        // }
    }, [bankVerificationState]);

    async function handleSubmit(data: any) {
        if (enableSumit && !loading) {
            const params = {
                bankTitle: data.bankTitle,
                bankType: data.bankType,
                bankName: data.bankName,
                bankAccount: data.bankAccount,
                bankCode: data.bankCode,
                bankAddress: data.bankAddress,
                bankCity: data.bankCity,
                bankState: data.bankState,
                bankCountry: data.bankCountry,
                bankPostalCode: data.bankPostalCode,
                userId: user.id,
                authtoken: user.token,
            };
            setEnableSumit(false);
            await dispatch(BankingInfoActions.PostBankAccountInfo(params));
            setEnableSumit(true);
        }
    }

    return (
        <div className="w-100 px-4">
            <div className="py-2 text-primary font-12px border-top border-bottom d-flex align-items-center justify-content-start">
                Bank Information
            </div>
            {loading && <div className="mt-4 w-100 d-flex flex-column">
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
                <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                    Please wait ...!
                </ParagraphText>
            </div>}
            {!loading && verificationPending && <div className="mt-5 py-3 px-4 text-center">
                <p>Thank you for submitting your bank account details!</p>
                <p className="py-4">Normally it takes 2-3 days to complete the process. Our team will get back to you with the verification status as soon as possible.</p>
            </div>}
            {!loading && !verificationPending && <div className="d-flex justify-content-center ">
                <div className="py-2 px-2 w-100">
                    <FormComponent
                        onSubmit={handleSubmit}
                        defaultValues={userBankInfo}
                        submitActive={
                            enableSumit
                        }
                        submitSuccess={false}
                    >
                        <SelectInput
                            type={["text"]}
                            labelText="Bank Account Type"
                            name={["bankType"]}
                            options={[["Checking", "Savings"]]}
                            wrapperClass="mt-3"
                            validationRules={[
                                { required: "Bank Account Type is required." },
                            ]}
                        />

                        <LabelInput
                            wrapperClass="mt-2"
                            type="text"
                            labelText="Bank Account Title"
                            name="bankTitle"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Bank Title is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Bank Name"
                            name="bankName"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Bank Name is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Account No. / IBAN"
                            name="bankAccount"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Account No. / IBAN is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Routing / Swift / BIC Number"
                            name="bankCode"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Bank Code is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Bank Address"
                            name="bankAddress"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Bank Address is required",
                                },
                            }}
                        />

                        <LabelInput
                            type="text"
                            labelText="Bank City"
                            name="bankCity"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Bank City is required",
                                validate: (value: string) => {
                                    var regex = /^[a-zA-Z ]+$/;
                                    if (!regex.test(value))
                                        return "Bank City must be a string";
                                },
                            }}
                        />

                        <div className="w-100 d-flex justify-content-between mt-3">
                            <LabelInput
                                type="text"
                                labelText="Bank State"
                                name="bankState"
                                wrapperClass="mr-2"
                                validationRules={{
                                    required: "Bank State is required",
                                    validate: (value: string) => {
                                        var regex = /^[a-zA-Z ]+$/;
                                        if (!regex.test(value))
                                            return "Bank State must be a string";
                                    },
                                }}
                            />

                            <LabelInput
                                type="number"
                                labelText="Bank ZIP/Postal Code"
                                name="bankPostalCode"
                                wrapperClass="ml-2"
                                validationRules={{
                                    required: "Bank ZIP/Postal Code is required",
                                    validate: (value: string) => {
                                        var regex = /^[0-9]+$/;
                                        if (!regex.test(value))
                                            return "Bank ZIP/Postal Code must be a number";
                                    },
                                }}
                            />
                        </div>

                        <SelectInput
                            type={["text"]}
                            labelText="Bank Country"
                            name={["bankCountry"]}
                            options={[LocationsList.countries]}
                            wrapperClass="mt-3"
                            validationRules={[
                                { required: "Bank Country is required." },
                            ]}
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
            </div>}
        </div>
    );
};
