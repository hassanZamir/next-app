import { CREATOR_PROFILE } from "../CreatorProfile/CreatorProfileResponse";

declare namespace ICCBillAddCardModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
        user: USER_SESSION;
        creatorProfile: CREATOR_PROFILE;
    }
}

export { ICCBillAddCardModal }