// #region Global Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// #endregion Global Imports

// #region Local Imports
import { IStore } from "@Redux/IStore";
import { LoadingSpinner, RadioInput } from "@Components";
import { USER_SESSION, MESSAGE_RECIPIENT } from "@Interfaces";
import { MessagesActions } from "@Actions";
import { RecipientRow } from "./RecipientRow";
import { ParagraphText } from "@Components/ParagraphText";
import { theme } from "@Definitions/Styled";
// #endregion Local Imports

export const CreateMessage: React.FunctionComponent<{ loadingSearch: boolean, user: USER_SESSION, scrolledToBottom: boolean, searchActive: boolean }>
    = ({ loadingSearch, user, scrolledToBottom, searchActive }) => {
        const messagesState = useSelector((state: IStore) => state.messages);
        const { messageRecipients } = messagesState;
        const [loading, setLoading] = useState(false);
        const [recipientsForMessage, setRecipientsForMessage] = useState<MESSAGE_RECIPIENT[]>([]);
        const [selectAll, setSelectAll] = useState(false);
        const dispatch = useDispatch();

        useEffect(() => {
            (async () => {
                const param = { userId: user.id, authtoken: user.token };
                setLoading(true);
                await dispatch(MessagesActions.GetMessageRecipients(param));
                setLoading(false);
            })();
        }, []);

        useEffect(() => {
            if (scrolledToBottom) getRecipients();
        }, [scrolledToBottom]);

        const getRecipients = async () => {
            if (messageRecipients.emptyPaginationNo > messageRecipients.paginationNo) {
                await MessagesActions.GetMessageRecipients({
                    userId: user.id,
                    page: messageRecipients.paginationNo,
                    authtoken: user.token,
                });
            }
        }

        const onRecipientAdd = (recipient: MESSAGE_RECIPIENT) => {
            if (recipientsForMessage.length + 1 == _recipients.length)
                setSelectAll(true);
            setRecipientsForMessage([...recipientsForMessage, recipient]);
        }

        const onRecipientAddAll = () => {
            setRecipientsForMessage([..._recipients]);
        }

        const onRecipientRemove = (recipient: MESSAGE_RECIPIENT) => {
            if (selectAll)
                setSelectAll(false);
            const filtered = recipientsForMessage.filter((reciever) => {
                return reciever.userName !== recipient.userName;
            });
            setRecipientsForMessage(filtered);
        }

        const onRecipientRemoveAll = () => {
            setRecipientsForMessage([]);
        }

        const goToSendMessage = async () => {
            if (recipientsForMessage.length === 1) {
                await dispatch(MessagesActions.CreateConversation({
                    userName: user.username,
                    recipientUsername: recipientsForMessage[0].userName,
                    authtoken: user.token,
                }));
            } else {
                await dispatch(MessagesActions.CreateBroadcast(recipientsForMessage));
            }
        }

        const _recipients = searchActive ? messageRecipients.searchValues : messageRecipients.values;
        return (<div className="d-flex flex-column"
            style={{ flex: 1 }}>
            <div className="d-flex flex-row mx-4" style={{
                alignSelf: "flex-end"
            }}>
                <div style={{
                    alignContent: "right"
                }}>{selectAll ? "Tap to unselect all" : "Tap to select all"}</div>
                <div style={{
                    marginLeft: "10px"
                }}>
                    <RadioInput
                        onChange={() => {
                        }}
                        onClick={() => {
                            if (selectAll) {
                                setSelectAll(false);
                                onRecipientRemoveAll();
                            }
                            else {
                                setSelectAll(true);
                                onRecipientAddAll();
                            }
                        }}
                        inputHeight="28px"
                        inputWidth="28px"
                        showLabel={false}
                        name=""
                        type="radio"
                        value="0"
                        checked={selectAll}
                        inputMargin="0px 5px 0px 0px"
                    />
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <LoadingSpinner size="3x" showLoading={loading || loadingSearch}>
                    {_recipients.length > 0 && <div className="d-flex flex-column h-100 w-100">
                        {_recipients.map((recipient, i) => {
                            return <RecipientRow recipient={recipient}
                                user={user}
                                onRecipientAdd={onRecipientAdd}
                                onRecipientRemove={onRecipientRemove}
                                recipientsForMessage={recipientsForMessage}
                                key={i} />
                        })}
                    </div>}
                    {_recipients.length <= 0 && <ParagraphText
                        className="text-primary font-20px lato-bold">
                        {!searchActive ? "You don't have any contacts" : "No Content"}
                    </ParagraphText>}
                    <div onClick={() => { recipientsForMessage.length > 0 && goToSendMessage(); }}
                        className="cursor-pointer"
                    >
                        <div className={"position-absolute d-flex align-items-center justify-content-center " + (recipientsForMessage.length > 0 ? "bg-primary-gradient" : "bg-grey400")}
                            style={{
                                right: "20px",
                                bottom: "80px",
                                height: "52px",
                                width: "52px",
                                borderRadius: "12px"
                            }}>
                            <FontAwesomeIcon icon={faArrowLeft} size="1x" color="white" style={{ transform: "rotate(180deg)" }} />
                        </div>
                    </div>
                </LoadingSpinner>
            </div>
        </div>);
    }
