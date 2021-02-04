import { USER_SESSION } from "@Interfaces";
import { BankingInfoActions, CreatorProfileActions } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import {
    ParagraphText,
    LoadingSpinner,
    CircularImage,
    PrimaryButton,
} from "@Components";
import { UploadPersonalInformation } from "@Components/BankingInfo/UploadPersonalInformation";
import { BackgroundImage } from "@Components/Basic";
import React, { useEffect, useState } from "react";
import { theme } from "@Definitions/Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Router, { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { BankVerification } from "./BankVerification";

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const router = useRouter();
    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile)
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const {
        errors,
        success,
        externalVerificationAttempt
    } = bankingInfo;
    const [loading, setLoading] = useState(true);
    const [loadEmbedId, setLoadEmbedId] = useState(false);
    const [loadManualForm, setLoadManualForm] = useState(false);
    const [bankVerifyForm, setBankVerifyForm] = useState(false);

    const manualVerificationUrl = "https://forms.clickup.com/f/359t3-473/2EV39OJPVWEVXEDSQU";

    const truliooServiceUrl = process.env.TRULIOO_MS_URL;
    const truliooFeKey = process.env.TRULIOO_FE_KEY;
    const apiUrl = `${process.env.API_URL}/api/accounts/${user.id}/upgrade`;

    useEffect(() => {
        if (externalVerificationAttempt && userCreatorProfile.manualVerify) {
            addToast("Sorry, external verification failed. Please submit the required details for manual verification.");
        }
    }, [externalVerificationAttempt])

    useEffect(() => {
        const params = {
            userid: user.id,
            authtoken: user.token,
        };
        dispatch(CreatorProfileActions.GetUserCreatorProfile(params));
    }, []);

    useEffect(() => {
        success.splice(0, success.length);
        errors.splice(0, errors.length);

        if (userCreatorProfile.name && (!userCreatorProfile.profileImageUrl || !userCreatorProfile.coverImageUrl))
            router.push("/settings?action=upgrade");

        if (!userCreatorProfile.creatorProfileVerified) {
            errors.push("Account Status: Verification Required");
            setLoadEmbedId(true);
        }
        else if (userCreatorProfile.manualVerify) {
            errors.push("Account Status: Manual Verification Required");
            setLoadManualForm(true);
            if (!externalVerificationAttempt)
                setLoadEmbedId(false);
        }
        else if (!userCreatorProfile.bankVerfified) {
            errors.push("Account Status: Bank Account Verification Required");
            setLoadManualForm(false);
            setLoadEmbedId(false);
            setBankVerifyForm(true);
            setLoading(false);
        }
        else {
            success.push("Account Status: Verification Completed");
            setLoadEmbedId(false);
            setLoadManualForm(false);
            setBankVerifyForm(false);
            router.push("/");
        }
    }, [userCreatorProfile]);

    return <React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.push("/")}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Account Upgrade</ParagraphText>

        {
            success.length > 0 && (
                <div className="d-flex flex-column">
                    {success.map((msg: string, i: number) => {
                        return (
                            <div key={i} className="text-success font-12px text-center">
                                {msg}
                            </div>
                        );
                    })}
                </div>
            )
        }
        {
            errors.length > 0 && (
                <div className="d-flex flex-column">
                    {errors.map((error: string, i: number) => {
                        return (
                            <div key={i} className="text-danger font-12px text-center">
                                {error}
                            </div>
                        );
                    })}
                </div>
            )
        }

        <div className="mt-3 d-flex position-relative justify-content-center h-100 account-upgrade-loader">
            {loading && <div className="position-absolute" style={{ top: "45%", left: "45%" }}>
                <LoadingSpinner size="3x" />
            </div>}
            <div className="w-100 z-1">
                {!userCreatorProfile.creatorProfileVerified && loadEmbedId && <iframe
                    onLoad={() => { setLoading(false) }}
                    allow={'camera;geolocation'}
                    name={`${user.token}#${apiUrl}#${truliooFeKey}`}
                    frameBorder="0px"
                    width="98%"
                    height="100%"
                    src={truliooServiceUrl}>
                </iframe>}
                {!userCreatorProfile.creatorProfileVerified && loadManualForm && <iframe
                    onLoad={() => { setLoading(false) }}
                    allow={'camera;geolocation'}
                    name={`${user.token}#${apiUrl}#${truliooFeKey}`}
                    frameBorder="0px"
                    width="98%"
                    height="100%"
                    src={manualVerificationUrl}>
                </iframe>}
                {bankVerifyForm && <BankVerification user={user} ></BankVerification>}
            </div>
        </div>

    </React.Fragment>
};
