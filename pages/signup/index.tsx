// #region Global Imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// #endregion Global Imports

// #region Local Imports
import { Layout } from "@Components/Layout";
import { PrimaryButton, LabelInput, StaticImage, ParagraphText, FormComponent } from "@Components";
import { LinkText } from "@Components/Basic";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import Link from 'next/link';
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { ISignUpPage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const SignUp: NextPage<ISignUpPage.IProps, ISignUpPage.InitialProps> = () => {
    const [enableSignUp, setEnableSignUp] = useState(true);
    const [recaptchaToken, setToken] = useState("");

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
        console.log("data", data);
        if (enableSignUp && recaptchaToken) {
            const params = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                country: data.country,
                dateBirth : "2-4-2011",
                account_created: true
            }
            setEnableSignUp(false);
            await dispatch(LoginActions.UserSignUp({ params: params }));
            setEnableSignUp(true);
        }
    }
    
    return (
        <Layout>
            <article className="w-100 flex-column">
                <div className="mt-5 row justify-content-center no-gutters">
                    <StaticImage src="/images/veno_tv_logo.png" height="100px" width="100px" />
                </div>
                <div className="row no-gutters justify-content-center mt-3">
                    <FormComponent onSubmit={handleSubmit} defaultValues={{}} 
                        submitActive={recaptchaToken && enableSignUp ? true : false}>

                        <LabelInput type="text"
                            labelText="Full Name" 
                            name="name"
                            validationRules={{ required: {value: true, message: "Full Name is required" } }} 
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
                            validationRules={{ required: {value: true, message: "Email is required" } }}
                        />
                        <LabelInput type="text"
                            labelText="Username" 
                            name="username" 
                            wrapperClass="mt-3"
                            validationRules={{ required: {value: true, message: "Username is required" } }}
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
                            validationRules={{ required: {value: true, message: "Re Type is required" } }}
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
                    </FormComponent>
                    <Link href="/login">
                        <LinkText style={{ height: "40px" }} className="bg-primary-gradient position-absolute left-0 right-0 bottom-0 seoge-ui-bold d-flex align-items-center justify-content-center text-white">
                            Have an account? Log in here!
                        </LinkText>
                    </Link>
                </div> 
            </article>
        </Layout>
    );
};

SignUp.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<ISignUpPage.InitialProps> => {
    return { namespacesRequired: ["common"] };
};


export default SignUp;
