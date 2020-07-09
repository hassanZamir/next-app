import { FEED } from "@Interfaces";

export interface AllFeedsResponse {
    status: string;
    feeds: FEED[],
    errors: string;
}