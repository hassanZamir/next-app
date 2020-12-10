import {
    USER_SESSION,
    CREATOR_PROFILE,
    GETFollowingInformationModel,
    PUTRecurringFollowingModel,
} from "@Interfaces";
import { FollowingModel } from "@Services/API/Following/Following";

declare namespace IFollowingInfoPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        showPersonalInformation: boolean;
        defaultFollowingInformation: any;
        followingType: number;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
        success: string[];
    }

    namespace Actions {
        export interface IMapGetFollowingInformation {
            FollowingInformation: GETFollowingInformationModel.GetGETFollowingInformationResponse;
        }

        export interface IGetGETFollowingInformationPayload
            extends GETFollowingInformationModel.GetGETFollowingInformationPayload { }
        export interface IGetGETFollowingInformationResponse
            extends GETFollowingInformationModel.GetGETFollowingInformationResponse { }

        export interface IGetPUTRecurringFollowingPayload
            extends PUTRecurringFollowingModel.GetPUTRecurringFollowingPayload { }
        export interface IGetPUTRecurringFollowerPayload
            extends PUTRecurringFollowingModel.GetPUTRecurringFollowingResponse { }

        export interface ICheckUserFollowingPayload extends FollowingModel.ICheckUserFollowingPayload { }
        export interface ICheckUserFollowingResponse extends FollowingModel.ICheckUserFollowingResponse { }
    }
}

export { IFollowingInfoPage };
