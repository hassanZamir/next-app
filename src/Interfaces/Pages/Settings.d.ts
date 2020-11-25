import {
    USER_SESSION,
    CREATOR_PROFILE,
    UploadMediaFilesModel,
    CreatorProfileModel,
    PostPersonalInformationModel,
    GETPersonalInformationModel,
    DeleteAccountModel,
} from "@Interfaces";

declare namespace ISettingsPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        showPersonalInformation: boolean;
        defaultPersonalInformation: any;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
        success: string[];
    }

    namespace Actions {
        export interface IMapGetPersonalInformation {
            personalInformation: GETPersonalInformationModel.GetGETPersonalInformationResponse;
        }

        export interface IGetUploadSettingsProfileImagesPayload
            extends CreatorProfileModel.GetUploadSettingsProfileImagesPayload {}
        export interface IGetUploadProfileImagesResponse
            extends CreatorProfileModel.GetUploadSettingsProfileImagesResponse {}

        export interface IGetPostPersonalInformationPayload
            extends PostPersonalInformationModel.GetPostPersonalInformationPayload {}
        export interface IGetPostPersonalInformationResponse
            extends PostPersonalInformationModel.GetPostPersonalInformationResponse {}

        export interface IGetGETPersonalInformationPayload
            extends GETPersonalInformationModel.GetGETPersonalInformationPayload {}
        export interface IGetGETPersonalInformationResponse
            extends GETPersonalInformationModel.GetGETPersonalInformationResponse {}

        export interface IGetDeleteAccountPayload
            extends DeleteAccountModel.DeleteAccountPayload {}
        export interface IGetDeleteAccountResponse
            extends DeleteAccountModel.DeleteAccountResponse {}
    }
}

export { ISettingsPage };
