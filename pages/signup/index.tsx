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
    SelectInput
} from "@Components";
import { LinkText } from "@Components/Basic";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import Link from 'next/link';
import { ActionConsts } from "@Definitions";
import LocationsList from "./locations-list.json";
import DobConst from "./dob-constants.json";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage } from "@Interfaces";
// #endregion Interface Imports

const SignUp: NextPage<ISignUpPage.IProps, ISignUpPage.InitialProps> = () => {
    const [enableSignUp, setEnableSignUp] = useState(true);
    const [recaptchaToken, setToken] = useState("");

    const signUpState = useSelector((state: IStore) => state.signUp);
    const { errors, successMessage } = signUpState;
    const dispatch = useDispatch();

    const handleCaptchaChange = (token: string | null) => {
        if (!token) {
            dispatch({
                type: ActionConsts.Login.SetLoginError,
                payload: { errors: 'Captcha expired', session: {} }
            });
        } else {
            console.log("Setting Token", token);
            setToken(token);
        }
    }

    async function handleSubmit(data: any) {
        if (enableSignUp && recaptchaToken) {
            const params = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                country: data.country,
                birthDate : data.dob.date + "-" + (DobConst.months.indexOf(data.dob.month) + 1)  + "-" + data.dob.year,
                account_created: true
            }
            console.log(params);
            setEnableSignUp(false);
            await dispatch(LoginActions.UserSignUp(params));
            setEnableSignUp(true);
        }
    }
    
    async function validateUserName(inputValue: {[key: string]: string }) {
        const key = Object.keys(inputValue)[0];
        const params = { 
            [key]: inputValue[key],
            account_created: false
        }
        return LoginActions.checkUserNameAvailability(params);
    }

    return (
            <div className="w-100 d-flex flex-column justify-content-between align-items-center">
                <div className="mt-5 row justify-content-center no-gutters">
                    <StaticImage src="/images/veno_tv_logo.png" height="100px" width="100px" />
                </div>
                <div className="row no-gutters justify-content-center mt-3">
                    <FormComponent 
                        onSubmit={handleSubmit} 
                        defaultValues={{}} 
                        submitActive={enableSignUp && recaptchaToken ? true : false}
                        submitSuccess={errors.message === "" && successMessage !== ""}>

                        <LabelInput 
                            type="text"
                            labelText="Full Name" 
                            name="name"
                            validationRules={{ required: {value: true, message: "Full Name is required" } }} 
                            />
                        
                        <SelectInput
                            type={["number", "number", "number"]}
                            labelText="Date of Birth" 
                            name={["dob.date", "dob.month", "dob.year"]}
                            options={[DobConst.date, DobConst.months, DobConst.year]} 
                            wrapperClass="mt-3"
                            validationRules={[{ required: "Date is required" }, { required: "Month is required" }, { required: "Year is required" }]}
                        />

                        <SelectInput 
                            type={["text"]}
                            labelText="Country" 
                            name={["country"]}
                            options={[LocationsList.countries]} 
                            wrapperClass="mt-3"
                            validationRules={[{ required: "Country selection is required."}]}
                        />
                        <LabelInput 
                            type="email"
                            labelText="Email" 
                            name="email" 
                            wrapperClass="mt-3"
                            validationRules={{ 
                                required: "Email is required",
                                validate: async (value: string) => {
                                    const helper = await validateUserName({ email: value });
                                    const response = await helper();
                                    if (response && response.errors.filter((error) => { return error && error.field === 'email' }).length > 0)
                                        return "Email is already taken.";
                                    
                                    return true;
                                }
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
                                    const helper = await validateUserName({ username: value });
                                    const response = await helper();
                                    if (response && response.errors
                                        .filter((error) => { return error && error.field === 'username' })
                                        .length > 0)
                                    return "Username is already taken.";
                                    
                                    return true;
                                }
                            }}
                        />
                        <LabelInput 
                            type="password"
                            labelText="Password" 
                            name="password" 
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Password is required" } }}
                        />
                        <LabelInput 
                            type="password"
                            labelText="Re-Type Password" 
                            name="reTypePassword"
                            wrapperClass="mt-3" 
                            validationRules={{ 
                                required: "Re Type password is required"
                            }}
                        />
                        <div className="captcha-container mt-3" 
                            style={{ height: "78px" }}>
                            <ReCAPTCHA
                                size="normal"
                                sitekey="6LcPdqsZAAAAADygw6uZ0kPMd-OW8F55aPEtq5FK"
                                onChange={handleCaptchaChange}
                            />
                        </div>
                        <PrimaryButton  
                            type="submit"
                            className="mt-2 font-20px"
                            name="signUp"
                            showLoader={!enableSignUp}>
                                Sign Up
                        </PrimaryButton>
                        {!successMessage && <ParagraphText className="py-4 text-danger text-center">{ errors.message }</ParagraphText>}
                    </FormComponent>
                    <Link href="/login" passHref>
                        <LinkText style={{ height: "40px" }} className="w-100 bg-primary-gradient seoge-ui-bold d-flex align-items-center justify-content-center text-white">
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
