import { CREATOR_PROFILE } from "./CreatorProfileResponse";

declare namespace UserCreatorProfileModel {
    export interface GetUserCreatorProfilePayload {
        authtoken: string;
        userid: number;
    }

    export interface GetUserCreatorProfileResponse {
        status: boolean;
        response: {};
        errors: {};
    }
}

export interface USER_CREATOR_PROFILE extends CREATOR_PROFILE {
    userStatus: number,
    creatorProfileStatus: number,
    emailVerify: boolean,
    idVerified: boolean,
    docsVerified: boolean,
    bankVerfified: boolean,
    creatorProfileVerified: boolean,

}

export { UserCreatorProfileModel, USER_CREATOR_PROFILE }