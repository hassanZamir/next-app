// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// #endregion Global Imports

// #region Local Imports
import {
    PrimaryButton,
    LabelInput,
    StaticImage,
    ParagraphText,
    FormComponent,
    SelectInput,
    RadioInput,
} from "@Components";
import { LinkText } from "@Components/Basic";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import Link from "next/link";
import { ActionConsts } from "@Definitions";
import LocationsList from "./locations-list.json";
import DobConst from "./dob-constants.json";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage } from "@Interfaces";
// #endregion Interface Imports

const SignUp: NextPage<ISignUpPage.IProps, ISignUpPage.InitialProps> = () => {
    const [enableSignUp, setEnableSignUp] = useState(true);
    const [termsOfService, setTermsOfService] = useState(false);
    const [recaptchaToken, setToken] = useState("");
    const [triggerValidation, setTriggerValidation] = useState(false);
    const year = (new Date()).getFullYear() - 18;
    const years = Array.from(new Array(80), (val, index) => {
        var y = year - index;
        return y.toString();
    });

    const signUpState = useSelector((state: IStore) => state.signUp);
    const { errors, successMessage } = signUpState;
    const dispatch = useDispatch();

    const handleCaptchaChange = (token: string | null) => {
        if (!token) {
            dispatch({
                type: ActionConsts.Login.SetLoginError,
                payload: { errors: "Captcha expired", session: {} },
            });
        } else {
            setToken(token);
        }
    };

    async function handleSubmit(data: any) {
        if (enableSignUp && recaptchaToken && data.termsOfService === "1") {
            const params = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                country: data.country,
                birthDate:
                    data.dob.year +
                    "-" +
                    (DobConst.months.indexOf(data.dob.month)) +
                    "-" +
                    data.dob.date,
                account_created: true,
            };
            setEnableSignUp(false);
            await dispatch(LoginActions.UserSignUp(params));
            setEnableSignUp(true);
        }
    }

    async function validateUserName(inputValue: { [key: string]: string }) {
        const key = Object.keys(inputValue)[0];
        const params = {
            [key]: inputValue[key],
            account_created: false,
        };
        return LoginActions.checkUserNameAvailability(params);
    }

    return (
        <div className="w-100 d-flex flex-column justify-content-between align-items-center">
            <div className="mt-4 row justify-content-center no-gutters">
                <StaticImage src="/images/veno_tv_logo_main@2x.png" height="100%" width="164px" />
            </div>
            <div className="row no-gutters justify-content-center mt-3">
                <div style={{ width: "320px" }}>
                    <FormComponent
                        onSubmit={handleSubmit}
                        defaultValues={{}}
                        submitActive={
                            enableSignUp && recaptchaToken ? true : false
                        }
                        submitSuccess={
                            errors.message === "" && successMessage !== ""
                        }
                        triggerValidation={triggerValidation}
                    >
                        <LabelInput
                            type="text"
                            labelText="Full Name"
                            name="name"
                            validationRules={{
                                required: { value: true, message: "Full Name is required" },
                                validate: async (value: string) => {
                                    var regex = /^[a-zA-Z.]{1,10}(?: [a-zA-Z]{1,10}){1,3}$/;
                                    if (!regex.test(value.trim()))
                                        return "Please enter valid full name e.g. John Doe or J. Doe or John D";
                                }
                            }}
                        />

                        <SelectInput
                            type={["number", "number", "number"]}
                            labelText="Date of Birth"
                            name={["dob.date", "dob.month", "dob.year"]}
                            options={[
                                DobConst.date,
                                DobConst.months,
                                years,
                            ]}
                            wrapperClass="mt-3"
                            validationRules={[{
                                required: "Date is required",
                                validate: (value: string) => {
                                    return value !== "Date"
                                        ? true
                                        : "Please select Date of Birth";
                                },
                            },
                            {
                                required: "Month is required",
                                validate: (value: string) => {
                                    return value !== "Month"
                                        ? true
                                        : "Please select Month of Birth";
                                },
                            },
                            {
                                required: "Year is required",
                                validate: (value: string) => {
                                    return value !== "Year"
                                        ? true
                                        : "Please select Year of Birth";
                                },
                            }
                            ]}
                        />

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
                        <LabelInput
                            type="email"
                            labelText="Email"
                            name="email"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Email is required",
                                validate: async (value: string) => {
                                    const helper = await validateUserName({
                                        email: value,
                                    });
                                    const response = await helper();
                                    if (
                                        response &&
                                        response.errors.filter(error => {
                                            return (
                                                error && error.field === "email"
                                            );
                                        }).length > 0
                                    )
                                        return "Email is already taken.";

                                    return true;
                                },
                            }}
                        />
                        <LabelInput
                            type="text"
                            labelText="Username"
                            name="username"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Username is required",
                                validate: async (value: string) => {
                                    var regex = /^[a-zA-Z0-9_-]+$/;
                                    if (!regex.test(value))
                                        return "Username can contain alphanumeric characters, _ or -";

                                    const helper = await validateUserName({
                                        username: value,
                                    });
                                    const response = await helper();
                                    if (
                                        response &&
                                        response.errors.filter(error => {
                                            return (
                                                error &&
                                                error.field === "username"
                                            );
                                        }).length > 0
                                    )
                                        return "Username is already taken.";

                                    return true;
                                },
                            }}
                        />
                        <LabelInput
                            type="password"
                            labelText="Password"
                            name="password"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Password is required",
                                validate: (value: string) => {
                                    const regex = new RegExp(
                                        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
                                    );
                                    return regex.test(value)
                                        ? true
                                        : "Password should contain letters and alphabets and need to be 6 digit long";
                                },
                            }}
                        />
                        <LabelInput
                            type="password"
                            labelText="Re-Type Password"
                            name="reTypePassword"
                            wrapperClass="mt-3"
                            validationRules={{
                                required: "Re Type password is required",
                            }}
                        />
                        <div
                            className="captcha-container"
                            style={{ height: "78px" }}
                        >
                            <ReCAPTCHA
                                size="normal"
                                sitekey="6LcPdqsZAAAAADygw6uZ0kPMd-OW8F55aPEtq5FK"
                                onChange={handleCaptchaChange}
                            />
                        </div>

                        <RadioInput
                            type="checkbox"
                            value={termsOfService ? "1" : "0"}
                            onClick={() => {
                                setTermsOfService(!termsOfService);
                                setTriggerValidation(true);
                            }}
                            inputHeight="25px"
                            inputWidth="25px"
                            inputMargin="0px 10px 0px 0px"
                            labelTextElem={
                                <div className="text-darkGrey lato-regular font-11px">
                                    <span>By signing up you agree to our</span>
                                    <span className="text-primary mx-1">
                                        <Link href="/terms-and-conditions"><a>Terms of Service</a></Link>
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-primary mx-1">
                                        <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                                    </span>
                                </div>
                            }
                            name="termsOfService"
                            wrapperClass=""
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Check privacy policy is required",
                                },
                            }}
                        />
                        {!successMessage && <ParagraphText className="py-4 text-danger text-center">
                            {errors.message}
                        </ParagraphText>
                        }
                        <PrimaryButton
                            type="submit"
                            className="mt-2 mb-3 font-20px"
                            name="signUp"
                            showLoader={!enableSignUp}
                        >
                            Sign Up
                        </PrimaryButton>
                    </FormComponent>
                </div>
                <Link href="/login" passHref>
                    <LinkText
                        style={{ height: "40px" }}
                        className="w-100 bg-primary-gradient seoge-ui-bold d-flex align-items-center justify-content-center text-white"
                    >
                        Have an account? Log in here!
                    </LinkText>
                </Link>
            </div>
        </div>
    );
};

export const getStaticProps = (...params: any) => {
    return { props: {} };
};

export default SignUp;
