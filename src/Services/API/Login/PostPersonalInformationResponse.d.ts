import { USER_SESSION } from "@Interfaces";

export interface PostPersonalInformationResponse {
    status: boolean,
    error: string | null,
    session?: USER_SESSION
}