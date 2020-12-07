import {
    USER_SESSION,
    CREATOR_PROFILE,
    UploadMediaFilesModel,
    CreatorProfileModel,
    PostPersonalInformationModel,
    GETPersonalInformationModel,
    DeleteAccountModel,
    UserCreatorProfileModel,
    HTTP_REQUEST_STATUS
} from "@Interfaces";

declare namespace ISettingsPage {
    export interface IProps {
        user: USER_SESSION;
    }
    export interface IStateProps {
        httpStatus: HTTP_REQUEST_STATUS;
    }

    namespace Actions {

        export interface IUpdateHttpStatus extends HTTP_REQUEST_STATUS { }
        export interface IGetUserProfileSettingsPayload
            extends UserCreatorProfileModel.GetUserCreatorProfilePayload { }
        export interface IGetUserProfileSettingsResponse
            extends UserCreatorProfileModel.GetUserCreatorProfileResponse { }
        export interface IPostUploadSettingsProfileImagesPayload
            extends UserCreatorProfileModel.PostUserCreatorProfilePayload {
            media_url: any = []
        }
        export interface IPostUploadSettingsProfileImagesResponse
            extends UserCreatorProfileModel.PostUserCreatorProfileResponse {
        }
        export interface IGetDeleteAccountPayload
            extends DeleteAccountModel.DeleteAccountPayload { }
        export interface IGetDeleteAccountResponse
            extends DeleteAccountModel.DeleteAccountResponse { }
    }
}

export { ISettingsPage };
