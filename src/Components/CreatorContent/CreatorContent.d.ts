import { USER_SESSION } from "@Interfaces";

declare namespace ICreatorContent {
    export interface IProps {
        scrolledToBottom: boolean,
        followingFee: number,
        contentCount: number, 
        imagesCount: number, 
        videosCount: number,
        user: USER_SESSION;
        name: string;
        profileUserName: string;
        isFollower: boolean;
        onFollow: (followOrUnfolow: boolean)=>void;
    }
}

export { ICreatorContent }