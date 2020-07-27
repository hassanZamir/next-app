import { USER_SESSION } from "@Interfaces";

declare namespace ICardStatus {
    export interface IProps {
        user: USER_SESSION;
        onClick?: ()=>void;
    }
}

export { ICardStatus };
