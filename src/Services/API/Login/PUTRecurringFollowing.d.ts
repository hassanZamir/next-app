// #region Interface Imports
import {
    PUTRecurringFollowingPayload,
    PUTRecurringFollowingResponse,
} from "@Interfaces";
// #endregion Interface Imports

declare namespace PUTRecurringFollowingModel {
    export interface GetPUTRecurringFollowingPayload
        extends PUTRecurringFollowingPayload { }

    export interface PUTRecurringFollowingResponse
        extends PUTRecurringFollowingResponse { }
}

export { PUTRecurringFollowingModel };
