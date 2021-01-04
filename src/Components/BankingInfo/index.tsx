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

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const router = useRouter();
    const { userCreatorProfile, isProfileFetching } = useSelector((state: IStore) => state.creatorProfile)
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const {
        errors,
        success,
    } = bankingInfo;
    const [loading, setLoading] = useState(true);
    const [loadEmbedId, setLoadEmbedId] = useState(false);
    const [loadManualForm, setLoadManualForm] = useState(false);

    const manualVerificationUrl = "https://forms.clickup.com/f/359t3-473/2EV39OJPVWEVXEDSQU";

    const truliooServiceUrl = process.env.TRULIOO_MS_URL;
    const truliooFeKey = process.env.TRULIOO_FE_KEY;
    const apiUrl = `${process.env.API_URL}/api/accounts/${user.id}/upgrade`;

    // useEffect(() => {
    //     if (isProfileFetching == false) {
    //         setLoading(false);
    //         if (!userCreatorProfile.creatorProfileVerified) {
    //             addToast("Please provide correct identity details to match our records.");
    //         }
    //     }
    // }, [isProfileFetching])

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

        if (userCreatorProfile.creatorProfileVerified) {
            success.push("Account Status: Verification Completed");
            setLoadEmbedId(false);
            setLoadManualForm(false);
            router.push("/");
        }
        else if (userCreatorProfile.manualVerify) {
            errors.push("Account Status: Manual Verification Required");
            setLoadManualForm(true);
            setLoadEmbedId(false);
        }
        else {
            errors.push("Account Status: Verification Required");
            setLoadEmbedId(true);
        }
    }, [userCreatorProfile]);

    return <React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.push("/")}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Account Upgrade</ParagraphText>
        <div className="d-flex position-relative justify-content-center h-100 account-upgrade-loader">
            {loading && <div className="position-absolute" style={{ top: "45%", left: "45%" }}>
                <LoadingSpinner size="3x" />
            </div>}
            <div className="w-100 z-1">
                {!userCreatorProfile.creatorProfileVerified && loadEmbedId && <iframe
                    onLoad={() => { setLoading(false) }}
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
            </div>
        </div>
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
    </React.Fragment>
};
