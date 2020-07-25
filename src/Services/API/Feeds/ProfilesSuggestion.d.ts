// #region Interface Imports
import { ProfilesSuggestionPayload, ProfilesSuggestionResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace ProfilesSuggestionModel {
    export interface GetProfilesSuggestionPayload extends ProfilesSuggestionPayload {}
    export interface GetProfilesSuggestionResponse extends ProfilesSuggestionResponse {}
}

export { ProfilesSuggestionModel };
