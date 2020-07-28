import { USER_SESSION } from "@Interfaces";

declare namespace IFooter {
    export interface IProps {
        selected: string;
        user: USER_SESSION;
    }
}

export { IFooter };
