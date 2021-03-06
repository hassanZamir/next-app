import React from "react";
import styled from "styled-components";

import { ICardStatus } from "./CardStatus";
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div<ICardStatus.IProps>`
    border-radius: 15px;
    background: ${({ user }) => {return user.paymentMode ? "transparent linear-gradient(259deg, #F57B52 0%, #EE5D5D 45%, #D96841 95%, #C45934 100%) 0% 0% no-repeat padding-box;" : "#FF6666" }};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 13px 17px;
    cursor: pointer;
`;

export const CardStatus: React.FunctionComponent<ICardStatus.IProps> = (props) => {
    return (
        <Container {...props}>
            <div className="lato-regular font-12px" style={{ marginRight: "8px" }}>{props.user.paymentMode ? "Card added successfully" : "Please add a card to follow creator's account"}</div>
            {!props.user.paymentMode ? <FontAwesomeIcon icon={faPlusCircle} color="white" /> : <FontAwesomeIcon icon={faCheckCircle} color="white" />}
        </Container>
    );
};
