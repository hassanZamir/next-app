// #region Interface Imports
import { AddCardPayload, AddCardResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace AddCardModel {
    export interface GetAddCardPayload extends AddCardPayload {}
    export interface GetAddCardResponse extends AddCardResponse {}

}

export { AddCardModel };
