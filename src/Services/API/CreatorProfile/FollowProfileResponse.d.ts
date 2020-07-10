import { CREATOR_PROFILE } from "@Interfaces";

export interface FollowProfileResponse {
    status: boolean;
    profile: CREATOR_PROFILE,
    errors: string;
}