// #region Interface Imports
import {
    PUTRecurringFollowerPayload,
    PUTRecurringFollowerResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PUTRecurringFollowerModel {
    export interface PutPUTRecurringFollowerPayload
        extends PUTRecurringFollowerPayload {}

    export interface GetPUTRecurringFollowerResponse
        extends PUTRecurringFollowerResponse {}
}

export { PUTRecurringFollowerModel };
