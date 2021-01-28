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
        bankVerificationState?: number;
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

        export interface IGetBankAccountInfoPayload {
            userid: number,
            authtoken: string,
        }
        export interface IGetBankAccountInfoResponse {
            status: boolean,
            errors: {},
            response: {
                bankTitle: string,
                bankType: string,
                bankName: string,
                bankAccount: number,
                bankCode: string,
                bankAddress: string,
                bankCity: string,
                bankState: string,
                bankCountry: string,
                bankPostalCode: string,
                state: int,
            }
        }

        export interface IPostBankAccountInfoPayload {
            userId: number,
            authtoken: string,

            bankTitle: string,
            bankType: string,
            bankName: string,
            bankAccount: number,
            bankCode: string,
            bankAddress: string,
            bankCity: string,
            bankState: string,
            bankCountry: string,
            bankPostalCode: string,
        }
        export interface IPostBankAccountInfoResponse {
            status: boolean,
            errors: {},
            response: {}
        }
    }
}

export { IBankingInfoPage };
