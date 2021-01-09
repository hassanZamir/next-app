import {
    USER_SESSION,
    CREATOR_PROFILE,
    GETStatementsModel,
} from "@Interfaces";

declare namespace IStatementsPage {
    export interface IProps {
        user: USER_SESSION;
        // scrolledToBottom: boolean;
    }

    export interface IStateProps {
        loading: boolean;
        defaultStatementsInformation: any;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
        success: string[];
    }

    namespace Actions {
        export interface IMapGetStatements {
            StatementsInformation: GETStatementsModel.GetGETStatementsResponse;
        }

        export interface IGetGETStatementsPayload
            extends GETStatementsModel.GetGETStatementsPayload { }
        export interface IGetGetGETStatementsResponse
            extends GETStatementsModel.GetGETStatementsResponse { }
    }
}

export { IStatementsPage };
