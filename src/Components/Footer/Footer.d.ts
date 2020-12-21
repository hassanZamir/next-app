import { USER_SESSION } from "@Interfaces";

declare namespace IFooter {
        export interface IProps {
                selected: string;
                session: USER_SESSION;
                onMenuClick: () => void;
        }
}

export { IFooter };
