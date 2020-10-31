import {
    USER_SESSION,
    CREATOR_PROFILE,
    GETFollowersInformationModel,
    PostRestrictFollowersModel,
    PostUnRestrictFollowersModel,
    PostBlockedFollowersModel,
    PostUnBlockedFollowersModel,
    PostFavouriteFollowersModel,
    PostUnFavouriteFollowersModel,
    PostPersonalInformationModel,
    GETPersonalInformationModel,
} from "@Interfaces";

declare namespace IFollowersInfoPage {
    export interface IProps {
        user: USER_SESSION;
    }

    export interface IStateProps {
        showPersonalInformation: boolean;
        defaultFollowersInformation: any;
        followerType: number;
        creatorProfile: CREATOR_PROFILE;
        errors: string[];
        success: string[];
    }

    namespace Actions {
        export interface IMapGetFollowersInformation {
            FollowersInformation: GETFollowersInformationModel.GetGETFollowersInformationResponse;
        }

        export interface IGetPostPersonalInformationPayload
            extends PostPersonalInformationModel.GetPostPersonalInformationPayload { }
        export interface IGetPostPersonalInformationResponse
            extends PostPersonalInformationModel.GetPostPersonalInformationResponse { }

        export interface IGetGETPersonalInformationPayload
            extends GETPersonalInformationModel.GetGETPersonalInformationPayload { }
        export interface IGetGETPersonalInformationResponse
            extends GETPersonalInformationModel.GetGETPersonalInformationResponse { }

        export interface IGetGETFollowersInformationPayload
            extends GETFollowersInformationModel.GetGETFollowersInformationPayload { }
        export interface IGetGETFollowersInformationResponse
            extends GETFollowersInformationModel.GetGETFollowersInformationResponse { }

        export interface IGetPostRestrictFollowersPayload
            extends PostRestrictFollowersModel.GetPostRestrictFollowersPayload { }
        export interface IGetPostRestrictFollowersResponse
            extends PostRestrictFollowersModel.GetPostRestrictFollowersResponse { }

        export interface IGetPostUnRestrictFollowersPayload
            extends PostUnRestrictFollowersModel.GetPostUnRestrictFollowersPayload { }
        export interface IGetUnPostRestrictFollowersResponse
            extends PostUnRestrictFollowersModel.GetPostUnRestrictFollowersResponse { }

        export interface IGetPostBlockedFollowersPayload
            extends PostBlockedFollowersModel.GetPostBlockedFollowersPayload { }
        export interface IGetPostBlockedFollowersResponse
            extends PostBlockedFollowersModel.GetPostBlockedFollowersResponse { }

        export interface IGetPostUnBlockedFollowersPayload
            extends PostUnBlockedFollowersModel.GetPostUnBlockedFollowersPayload { }
        export interface IGetPostUnBlockedFollowersResponse
            extends PostUnBlockedFollowersModel.GetPostUnBlockedFollowersResponse { }

        export interface IGetPostFavouriteFollowersPayload
            extends PostFavouriteFollowersModel.GetPostFavouriteFollowersPayload { }
        export interface IGetPostFavouriteFollowersResponse
            extends PostFavouriteFollowersModel.GetPostFavouriteFollowersResponse { }

        export interface IGetPostUnFavouriteFollowersPayload
            extends PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersPayload { }
        export interface IGetPostUnFavouriteFollowersResponse
            extends PostUnFavouriteFollowersModel.GetPostUnFavouriteFollowersResponse { }
    }
}

export { IFollowersInfoPage };
