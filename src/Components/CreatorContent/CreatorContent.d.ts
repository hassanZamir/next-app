import { USER_SESSION } from "@Interfaces";

declare namespace ICreatorContent {
    export interface IProps {
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