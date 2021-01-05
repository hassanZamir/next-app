import {
    USER_SESSION,
    CREATOR_PROFILE,
    UploadMediaFilesModel,
    CreatorProfileModel,
    PostPersonalInformationModel,
    GETPersonalInformationModel,
} from "@Interfaces";

declare namespace IBankingInfoPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        showPersonalInformation: boolean;
        defaultPersonalInformation: any;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
        success: string[];
        externalVerificationAttempt: boolean;
    }

    namespace Actions {
        export interface IMapGetPersonalInformation {
            personalInformation: GETPersonalInformationModel.GetGETPersonalInformationResponse;
        }

        export interface IGetUploadProfileImagesPayload extends CreatorProfileModel.GetUploadProfileImagesPayload { }
        export interface IGetUploadProfileImagesResponse extends CreatorProfileModel.GetUploadProfileImagesResponse { }

        export interface IGetPostPersonalInformationPayload extends PostPersonalInformationModel.GetPostPersonalInformationPayload { }
        export interface IGetPostPersonalInformationResponse extends PostPersonalInformationModel.GetPostPersonalInformationResponse { }

        export interface IGetGETPersonalInformationPayload extends GETPersonalInformationModel.GetGETPersonalInformationPayload { }
        export interface IGetGETPersonalInformationResponse extends GETPersonalInformationModel.GetGETPersonalInformationResponse { }
    }
}

export { IBankingInfoPage };
