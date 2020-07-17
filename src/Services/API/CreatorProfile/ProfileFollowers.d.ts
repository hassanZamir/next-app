// #region Interface Imports
import { 
    ProfileFollowersPayload,
    ProfileFollowersResponse
} from "@Interfaces"; 
// #endregion Interface Imports

declare namespace ProfileFollowersModel {
    export interface GetProfileFollowersPayload extends ProfileFollowersPayload {}
    export interface GetProfileFollowersResponse extends ProfileFollowersResponse {}
}

export { ProfileFollowersModel };
