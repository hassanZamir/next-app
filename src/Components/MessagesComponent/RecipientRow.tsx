// #region Global Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { BackgroundImage } from "@Components/Basic";
import { MESSAGE_RECIPIENT, USER_SESSION } from "@Interfaces";
import { LoadingSpinner } from "@Components";
import { theme } from "@Definitions/Styled";
import { RadioInput } from "@Components";
import { MessagesActions } from "@Actions";
import Router from "next/router";
// #endregion Local Imports
const mediaBaseUrl = process.env.MEDIA_BASE_URL;


export const RecipientRow: React.FunctionComponent<{ recipient: MESSAGE_RECIPIENT, user: USER_SESSION, onRecipientAdd: (a: MESSAGE_RECIPIENT) => void, onRecipientRemove: (a: MESSAGE_RECIPIENT) => void, recipientsForMessage: MESSAGE_RECIPIENT[] }>
    = ({ recipient, user, onRecipientAdd, onRecipientRemove, recipientsForMessage }) => {

        // const dispatch = useDispatch();
        // const [loading, setLoading] = useState(false);

        // const onRecipientClick = async (recipient: MESSAGE_RECIPIENT) => {
        //     setLoading(true);
        //     await dispatch(MessagesActions.CreateConversation({ 
        //         userId: user.id, 
        //         recipientId: recipient.id,
        //         authtoken: user.token,
        //     }));
        // }

        const onRecipientClick = () => {
            if (recipientsForMessage.filter((reciever, i) => { return reciever.userName === recipient.userName }).length > 0) {
                onRecipientRemove(recipient);
            } else {
                onRecipientAdd(recipient);
            }
        }

        return (<div onClick={() => { onRecipientClick(); }}
            style={{
                marginBottom: "1px",
                borderBottom: "1px solid " + theme.colors.grey300,
            }}
            className="hover-bg cursor-pointer d-flex mx-4 py-4"
        >
            <div style={{ minHeight: "62px", minWidth: "62px" }}>
                <BackgroundImage
                    paddingBottom="100%"
                    borderRadius="12px"
                    src={[mediaBaseUrl + "/" + recipient.profileImageUrl, '/images/profile_image_placeholder.jpg']} />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex pl-3 w-100 align-items-center justify-content-between w-100 h-100">
                    <div className="gibson-semibold font-16px text-primary">
                        {recipient.name}
                    </div>
                    <div>
                        <RadioInput
                            onChange={() => { }}
                            inputHeight="28px"
                            inputWidth="28px"
                            showLabel={false}
                            name={recipient.name}
                            type="radio"
                            value="0"
                            checked={recipientsForMessage.filter((reciever, i) => {
                                return reciever.userName === recipient.userName
                            }).length > 0
                            }
                            inputMargin="0px 5px 0px 0px"
                        />
                    </div>


                    {/* {!loading ? <RadioInput 
                        onChange={() => {}}
                        inputHeight="28px"
                        inputWidth="28px"
                        showLabel={false}
                        name={recipient.name}
                        type="radio"
                        value="0" 
                        checked={false}
                        inputMargin="0px 5px 0px 0px"
                    /> : <div className="mr-2">
                        <LoadingSpinner size="1x" showLoading={loading}></LoadingSpinner>
                    </div>} */}
                    {/* {loading && <div className="mr-2">
                        <LoadingSpinner size="1x" showLoading={loading}></LoadingSpinner>
                    </div>} */}
                </div>
            </div>
        </div>);
    }
