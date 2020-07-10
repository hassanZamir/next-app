// #region Global Imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// #endregion Global Imports

// #region Local Imports
import { Layout } from "@Components/Layout";
import { PrimaryButton, LabelInput, StaticImage, ParagraphText, FormComponent, DobInput } from "@Components";
import { LinkText } from "@Components/Basic";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import Link from 'next/link';
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

export const DobConst = {
    date: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
    "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    
    months: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"],
    
    year: ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", 
    "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001","2002",
    "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
    "2015", "2016", "2017", "2018", "2019", "2020"]
};

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
                dateBirth: "9-7-1990",
                // dateBirth : data.dob.date + "-" + data.dob.month + "-" + data.dob.year,
                account_created: true
            }
            setEnableSignUp(false);
            await dispatch(LoginActions.UserSignUp({ params: params }));
            setEnableSignUp(true);
        }
    }
    
    async function validateUserName(inputValue: {[key: string]: string }) {
        const key = Object.keys(inputValue)[0];
        const params = { 
            [key]: inputValue[key],
            account_created: false
        }
        return LoginActions.checkUserNameAvailability({ params: params });
    }

    return (
            <div className="w-100 d-flex flex-column justify-content-between align-items-center">
                <div className="mt-5 row justify-content-center no-gutters">
                    <StaticImage src="/images/veno_tv_logo.png" height="100px" width="100px" />
                </div>
                <div className="row no-gutters justify-content-center mt-3">
                    <FormComponent onSubmit={handleSubmit} defaultValues={{}} 
                        submitActive={enableSignUp && recaptchaToken ? true : false}>

                        <LabelInput type="text"
                            labelText="Full Name" 
                            name="name"
                            validationRules={{ required: {value: true, message: "Full Name is required" } }} 
                            />
                        
                        <DobInput type={["number", "number", "number"]}
                            labelText="Date of Birth" 
                            name={["dob.date", "dob.month", "dob.year"]}
                            options={[DobConst.date, DobConst.months, DobConst.year]} 
                            wrapperClass="mt-3"
                            validationRules={[{ required: "Date is required" }, { required: "Month is required" }, { required: "Year is required" }]}
                        />

                        <LabelInput type="text"
                            labelText="Country" 
                            name="country" 
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Country is required" } }}
                        />
                        <LabelInput type="email"
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
                        <LabelInput type="text"
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
                            name="signUp">
                                Sign Up
                        </PrimaryButton>
                        {!successMessage && <ParagraphText className="text-danger text-center">{ errors.message }</ParagraphText>}
                        {!errors.message && <ParagraphText className="text-success text-center">{ successMessage }</ParagraphText>}
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
