// #region Global Imports
import React, { useState } from "react";
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

export const RecipientRow: React.FunctionComponent<{ recipient: MESSAGE_RECIPIENT, user: USER_SESSION }> 
    = ({ recipient, user }) => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onRecipientClick = async (recipient: MESSAGE_RECIPIENT) => {
        setLoading(true);
        const result = await MessagesActions.CreateConversation({ userId: user.id, recipientId: recipient.id})();

        if (result.status && result.response) {
            const conversation = result.response;
            Router.push("/message/" + conversation.id, "/message/" + conversation.id);
        } else {
            setError("Error getting conversation");
            setLoading(false);
        }
    }

    return (<div onClick={() => { !loading && onRecipientClick(recipient); }} 
            style={{ 
                marginBottom: "1px",
                borderBottom: "1px solid " + theme.colors.grey300
            }}
            className="hover-bg cursor-pointer d-flex mx-4 py-4">

            <div style={{ minHeight: "62px", minWidth: "62px" }}>
                <BackgroundImage 
                    paddingBottom="100%"
                    borderRadius="12px" 
                    src={[recipient.profileImageUrl ,'/images/profile_image_placeholder.jpg']} />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex px-3 w-100 align-items-center justify-content-between w-100 h-100">
                    <div className="gibson-semibold font-16px text-primary">
                        { recipient.name }
                    </div>
                    {!loading ? <RadioInput 
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
                    </div>}
                </div>
                {error && <div className="text-danger font-12px">{ error }</div>}
            </div>
    </div>);
}
