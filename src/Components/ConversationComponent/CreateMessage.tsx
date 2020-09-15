// #region Global Imports
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faLink, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// #endregion Global Imports

// #region Local Imports
import { Textarea } from "@Components/Basic";
import { MessagesActions } from "@Actions";
import { USER_SESSION } from "@Interfaces";
import { theme } from "@Definitions/Styled";
// #endregion Local Imports

export const CreateMessage: React.FunctionComponent<{ user: USER_SESSION, conversationId: number }> 
    = ({ user, conversationId }) => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setMessage(value);
    }

    const sendMessage = async () => {
        const date = new Date();
        const params = {
            conversationId: conversationId,
            senderId: user.id,
            type: 1,
            message: message,
            sentAt: date.getFullYear() 
                + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) 
                + "-" + (new Date().getDate() < 10 ? "0" + date.getDate() : date.getDate())
        }
        await dispatch(MessagesActions.CreateMessage(params));
        setMessage('');
    }

    return (<div className="d-flex align-items-center justify-content-between pl-4 py-3 pr-3">
        <div className="position-relative">
            <div className="bg-primary d-flex align-items-center justify-content-center" 
                style={{ height: "32px", width: "32px", borderRadius: "12px", transform: "rotate(45deg)" }}>
            </div>
            <div className="position-absolute" style={{ top: "4px", left: "7px" }}>
                <FontAwesomeIcon icon={faLink} color="white"></FontAwesomeIcon>
            </div>
        </div>
        <img className="px-1" src="/images/price_tag@2x.png" height="45px" width="45px" />
        <Textarea 
            placeholder="Say Something..."
            name="message" 
            rows={2} 
            columns={10} 
            className="border-grey500 rounded w-100 font-10px text-primary mx-2 text-area-box-shadow" 
            onChange={handleChange}
            value={message}/>
        <FontAwesomeIcon
                onClick={() => message && sendMessage() }
                className="cursor-pointer" icon={faArrowRight} color={theme.colors.primary} size="lg" />
    </div>);
}
