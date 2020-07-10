// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// #endregion Global Imports

// #region Local Imports
import { PrimaryButton, ThemedInput, StaticImage, ParagraphText } from "@Components";
import { LinkText } from "@Components/Basic";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import Link from 'next/link';
import Router from 'next/router';
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

export const LoginComponent: React.FunctionComponent<{}> = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [enableLogin, setEnableLogin] = useState(false);
    const [recaptchaToken, setToken] = useState("");
    const { email, password } = inputs;

    const loginState = useSelector((state: IStore) => state.login);
    const { errors } = loginState;
    const dispatch = useDispatch();

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function isFormValid() {
        const { email, password } = inputs;
        email && password && recaptchaToken ? setEnableLogin(true) : setEnableLogin(false); 
    }

    useEffect(() => {
        isFormValid();
    }, [email, password, recaptchaToken])

    useEffect(() => {
        // Prefetch the dashboard page as the user will go there after the login
        Router.prefetch('/');
    }, [])
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (enableLogin) {
            setEnableLogin(false);
            await dispatch(LoginActions.UserLogin({
                params: {
                    email: email,
                    password: password,
                    recaptchaToken: recaptchaToken
                }
            }));
            setEnableLogin(true);
        }
    }

    const handleCaptchaChange = (token: string | null) => {
        if (!token) {
            dispatch({
                type: ActionConsts.Login.SetLoginError,
                payload: { errors: 'Captcha expired', session: {} }
            });
        } else {
            setToken(token);
        }
    }

    return (
        <div className="w-100 d-flex flex-column justify-content-between align-items-center">
            <div className="mt-5 row justify-content-center no-gutters">
                <StaticImage src="/images/veno_tv_logo.png" height="100px" width="100px" />
            </div>
            <form name="login-form" className="flex-column d-flex align-items-center"
                style={{ width: "271px" }} 
                onSubmit={handleSubmit}
                autoComplete="off">
                    
                <input id="username" style={{display: "none"}} type="text" name="fakeusernameremembered" />
                <input id="password" style={{display:"none"}} type="password" name="fakepasswordremembered"></input>
                <ThemedInput type="email" 
                    placeholder="Email"
                    name="email" 
                    onChange={handleChange} 
                    onBlur={isFormValid} 
                    autoComplete="nope" />
                <ThemedInput type="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    onBlur={isFormValid}
                    name="password"
                    autoComplete="new-password"
                    className="mt-3" />
                <Link href="#" passHref>
                    <LinkText style={{ textDecoration: "underline" }} 
                        className="text-primary text-left font-10px w-100 mt-1">
                            Forgot Password?
                    </LinkText>
                </Link>
                
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
                    isActive={enableLogin}>
                        LOGIN
                </PrimaryButton>
                {errors && <ParagraphText className="text-danger text-center">{ errors }</ParagraphText>}
            </form>
            <Link href="/signup" passHref>
                <LinkText style={{ height: "40px" }} className="w-100 bg-primary-gradient seoge-ui-bold d-flex align-items-center justify-content-center text-white">
                    Don't have an account? Sign up Now!
                </LinkText>
            </Link>
        </div>
    );
}