// #region Global Imports
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useRouter } from "next/router";
// #endregion Global Imports

// #region Local Imports
import {
    PrimaryButton,
    ThemedInput,
    StaticImage,
    ParagraphText,
    CreatorProfileRules,
    LoadingSpinner,
    SocialLogin,
} from "@Components";
import { CheckYourEmailModal } from "../Modals/CheckYourEmailModal";
import { EmailVerifiedModal } from "../Modals/EmailVerifiedModal";
import { ResetPasswordModal } from "../Modals/ResetPasswordModal";
import { ChangePasswordModal } from "../Modals/ChangePasswordModal";
import { ReturnPolicyModal } from "@Components/Modals";
import { LinkText } from "@Components/Basic";
import { useModal } from "../Hooks";
import { IStore } from "@Redux/IStore";
import { LoginActions } from "@Actions";
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

export const LoginComponent: React.FunctionComponent<{}> = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [enableLogin, setEnableLogin] = useState(false);
    const [recaptchaToken, setToken] = useState("");
    const { email, password } = inputs;
    const modalRef = useRef<HTMLDivElement>(null);
    const { isShowing, toggle } = useModal(modalRef);
    const [userVerificationEmail, setUserVerificationEmail] = useState("");
    const [userVerificationToken, setUserVerificationToken] = useState("");
    const [resetPasswordModal, setResetPasswordModal] = useState(false);
    const returnPolicyModalRef = useModal(useRef<HTMLDivElement>(null));

    const [changePasswordToken, setChangePasswordToken] = useState("");

    const router = useRouter();
    const { modal, token, profile } = router.query;

    const loginState = useSelector((state: IStore) => state.loginError);
    const { errors, creatorProfile } = loginState;
    const dispatch = useDispatch();

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function isFormValid() {
        const { email, password } = inputs;
        email && password && recaptchaToken
            ? setEnableLogin(true)
            : setEnableLogin(false);
    }

    useEffect(() => {
        isFormValid();
    }, [email, password, recaptchaToken]);

    useEffect(() => {
        router.prefetch("/");

        if (modal === "check-your-email") {
            const { email } = router.query;
            setUserVerificationEmail(email as string);
            toggle();
            router.push("/login", "/login", { shallow: true });
            return;
        } else if (modal === "account-verify") {
            setUserVerificationToken(token as string);
            toggle();
            router.push("/login", "/login", { shallow: true });
            return;
        } else if (modal === "change-your-password") {
            setChangePasswordToken(token as string);
            toggle();
            router.push("/login", "/login", { shallow: true });
            return;
        } else if (profile) {
            dispatch(
                LoginActions.GetCreatorProfile({ username: profile as string })
            );
        } else {
            return;
        }
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (enableLogin) {
            setEnableLogin(false);
            await dispatch(
                LoginActions.UserLogin({
                    params: {
                        email: email,
                        password: password,
                        recaptchaToken: recaptchaToken,
                    },
                })
            );
            setEnableLogin(true);
        }
    }

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

    const forgetPasswordClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setResetPasswordModal(true);
        toggle();
    };

    return (
        <div className="w-100 d-flex flex-column justify-content-between align-items-center">
            {userVerificationEmail && (
                <CheckYourEmailModal
                    toggle={toggle}
                    isShowing={isShowing}
                    modalRef={modalRef}
                    email={userVerificationEmail}
                />
            )}

            {userVerificationToken && (
                <EmailVerifiedModal
                    toggle={toggle}
                    isShowing={isShowing}
                    modalRef={modalRef}
                    token={userVerificationToken}
                />
            )}

            {resetPasswordModal && (
                <ResetPasswordModal isShowing={isShowing} modalRef={modalRef} />
            )}

            {changePasswordToken && (
                <ChangePasswordModal
                    isShowing={isShowing}
                    modalRef={modalRef}
                    token={changePasswordToken}
                />
            )}

            {!profile && (
                <div className="mt-5 row justify-content-center no-gutters">
                    <StaticImage
                        src="/images/veno_tv_logo_main@2x.png"
                        height="100%"
                        width="164px"
                    />
                </div>
            )}
            {profile && (
                <div
                    className="mt-3 border-primary d-flex align-items-center justify-content-center"
                    style={{
                        minHeight: "300px",
                        width: "300px",
                        border: "2px solid",
                        borderRadius: "18px",
                    }}
                >
                    {"name" in creatorProfile && (
                        <CreatorProfileRules creatorProfile={creatorProfile} />
                    )}
                    {!("name" in creatorProfile) && !errors && (
                        <LoadingSpinner size="xl" />
                    )}
                    {!("name" in creatorProfile) && errors && (
                        <div>{errors}</div>
                    )}
                </div>
            )}
            <SocialLogin />

            <div className="font-19px text-darkGrey">-----OR-----</div>

            <form
                name="login-form"
                className="flex-column d-flex align-items-center"
                style={{ width: "271px" }}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <input
                    id="username"
                    style={{ display: "none" }}
                    type="text"
                    name="fakeusernameremembered"
                />
                <input
                    id="password"
                    style={{ display: "none" }}
                    type="password"
                    name="fakepasswordremembered"
                ></input>
                <ThemedInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={isFormValid}
                    autoComplete="nope"
                />
                <ThemedInput
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={isFormValid}
                    name="password"
                    autoComplete="new-password"
                    className="mt-3"
                />

                <div className="w-100 mt-1 text-left">
                    <LinkText
                        style={{ textDecoration: "underline" }}
                        className="text-primary font-10px cursor-pointer"
                        onClick={forgetPasswordClick}
                    >
                        Forgot Password?
                    </LinkText>
                </div>

                <div className="captcha-container" style={{ height: "78px" }}>
                    <ReCAPTCHA
                        size="normal"
                        sitekey="6LcPdqsZAAAAADygw6uZ0kPMd-OW8F55aPEtq5FK"
                        onChange={handleCaptchaChange}
                    />
                </div>
                <div className="p-4">
                    {errors && (
                        <ParagraphText className="text-danger text-center font-12px">
                            {errors}
                        </ParagraphText>
                    )}
                </div>
                <PrimaryButton
                    type="submit"
                    className="font-20px"
                    isActive={enableLogin}
                >
                    LOGIN
                </PrimaryButton>
            </form>
            {/* { add footer links here} */}
            <div
                className="text-grey100 font-12px text-center my-2"
                onClick={() => {
                    returnPolicyModalRef.toggle();
                }}
            >
                Return Policy
            </div>
            <ReturnPolicyModal
                isShowing={returnPolicyModalRef.isShowing}
                toggle={returnPolicyModalRef.toggle}
            />
            <Link href="/signup" passHref>
                <LinkText
                    style={{ height: "40px" }}
                    className="w-100 bg-primary-gradient seoge-ui-bold d-flex align-items-center justify-content-center text-white"
                >
                    Don't have an account? Sign up Now!
                </LinkText>
            </Link>
        </div>
    );
};
