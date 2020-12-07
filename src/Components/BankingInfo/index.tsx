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

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION }> = ({
    user,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userCreatorProfile } = useSelector((state: IStore) => state.creatorProfile)
    const bankingInfo = useSelector((state: IStore) => state.bankingInfo);
    const {
        errors,
        showPersonalInformation,
        success,
        defaultPersonalInformation,
    } = bankingInfo;
    const [loading, setLoading] = useState(true);
    const [loadEmbedId, setLoadEmbedId] = useState(true);

    const truliooServiceUrl = process.env.TRULIOO_MS_URL;
    const truliooFeKey = process.env.TRULIOO_FE_KEY;
    const apiUrl = `${process.env.API_URL}/api/accounts/${user.id}/upgrade`;

    useEffect(() => {
        success.splice(0, success.length);
        errors.splice(0, errors.length);

        if (userCreatorProfile)//&& defaultPersonalInformation)
            setLoading(false);

        if (userCreatorProfile.creatorProfileVerified)
            success.push("Account upgraded successfully.");
        else
            errors.push("Account Verification: PENDING");

        if (userCreatorProfile.idVerified && userCreatorProfile.docsVerified) {
            setLoadEmbedId(false);
            router.push("/");
        }
        else
            setLoadEmbedId(true);

        // if (userCreatorProfile.creatorProfileVerified) {

        // }
        // else {

        //     if (userCreatorProfile.idVerified)
        //         success.push("Identity Verification: DONE");
        //     else
        //         errors.push("Identity Verification: PENDING");

        //     if (userCreatorProfile.docsVerified)
        //         success.push("Document Verification: DONE");
        //     else
        //         errors.push("Document Verification: PENDING");
        // }
    }, [userCreatorProfile]);//, defaultPersonalInformation]);

    useEffect(() => {
        const params = {
            userid: user.id,
            authtoken: user.token,
        };
        dispatch(CreatorProfileActions.GetUserCreatorProfile(params));
    }, []);

    return <React.Fragment>
        <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
            <FontAwesomeIcon
                onClick={() => Router.push("/")}
                className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
        </div>
        <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Account Upgrade</ParagraphText>

        <div className="d-flex flex-column align-items-center flex-fill body-background">
            {!userCreatorProfile ? (
                <div
                    style={{ flex: 1 }}
                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                >
                    <LoadingSpinner size="3x" />
                </div>
            ) : (
                    <React.Fragment>
                        {!userCreatorProfile.creatorProfileVerified && loadEmbedId && <iframe
                            allow={'camera;geolocation'}
                            name={`${user.token}#${apiUrl}#${truliooFeKey}`}
                            frameBorder="0px"
                            width="98%"
                            height="100%"
                            src={truliooServiceUrl}>
                        </iframe>}
                    </React.Fragment>
                )}
            {success.length > 0 && (
                <div className="d-flex flex-column">
                    {success.map((msg: string, i: number) => {
                        return (
                            <div className="text-success font-12px text-center">
                                {msg}
                            </div>
                        );
                    })}
                </div>
            )}
            {errors.length > 0 && (
                <div className="d-flex flex-column">
                    {errors.map((error: string, i: number) => {
                        return (
                            <div className="text-danger font-12px text-center">
                                {error}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    </React.Fragment>
};
