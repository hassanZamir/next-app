import { CREATOR_PROFILE } from "./CreatorProfileResponse";

declare namespace UserCreatorProfileModel {
    export interface GetUserCreatorProfilePayload {
        authtoken: string;
        userid: number;
    }

    export interface GetUserCreatorProfileResponse {
        status: boolean;
        response?: USER_CREATOR_PROFILE;
        errors: {};
    }

    // being used in edit profile settings screen
    export interface PostUserCreatorProfilePayload {
        authtoken: string;
        userId: number;
        name: string;
        coverImageUrl: string;
        profileImageUrl: string;
        location: string;
        bio: string;
        followingFee: double;
    }
    export interface PostUserCreatorProfileResponse {
        authtoken: string;
        userId: number;
        name: string;
        coverImageUrl: string;
        profileImageUrl: string;
        location: string;
        bio: string;
        followingFee: double;
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