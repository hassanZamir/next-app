import { USER_SESSION, CREATOR_PROFILE, UploadMediaFilesModel, CreatorProfileModel } from "@Interfaces";

declare namespace IBankingInfoPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        showPersonalInformation: boolean;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
    }

    namespace Actions {
        export interface IGetUploadProfileImagesPayload extends CreatorProfileModel.GetUploadProfileImagesPayload {}
        export interface IGetUploadProfileImagesResponse extends CreatorProfileModel.GetUploadProfileImagesResponse {}
    }
}

export { IBankingInfoPage };
