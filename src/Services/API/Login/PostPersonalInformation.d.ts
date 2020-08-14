// #region Interface Imports
import { PostPersonalInformationPayload, PostPersonalInformationResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace PostPersonalInformationModel {
    export interface GetPostPersonalInformationPayload extends PostPersonalInformationPayload {}

    export interface GetPostPersonalInformationResponse extends PostPersonalInformationResponse {}
}

export { PostPersonalInformationModel };
