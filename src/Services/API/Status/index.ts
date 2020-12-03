// #region Local Imports
import { Http } from "@Services";
// #endregion Local Imports

import { AllCommentsModel, PostCommentModel, LikeCommentModel } from "@Interfaces";

export const StatusService = {
    GetAllComments: async (
        payload: AllCommentsModel.GetAllCommentsPayload
    ): Promise<AllCommentsModel.GetAllCommentsResponse> => {
        let response: AllCommentsModel.GetAllCommentsResponse;

        try {
            response = await Http.UserAuthRequest<AllCommentsModel.GetAllCommentsResponse>(
                "GET",
                "/content/" + payload.contentId + "/comments?page=" + payload.pageNo
                + "&offset=" + payload.offset
                + (payload.sort === 'desc' ? "&sort=desc" : "&sort=" + payload.sort)
                + (payload.userId ? ("&viewerId=" + payload.userId) : ""),
                payload.authtoken,
                undefined
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                response: [{
                    "isTipComment": true,
                    "name": "sohaib Riaz",
                    "profileImageUrl": "",
                    "userName": "sohaibminhas",
                    "content_viewer_like": true,
                    "id": 6,
                    "userId": 11,
                    "contentId": 6,
                    "text": "sadasd",
                    "likesCount": 0,
                    "timeStamp": "2020-07-16T12:51:41.8133333"
                }]
            };
        }
        return response;
    },
    PostComment: async (
        payload: PostCommentModel.GetPostCommentPayload
    ): Promise<PostCommentModel.GetPostCommentResponse> => {
        let response: PostCommentModel.GetPostCommentResponse;

        try {
            response = await Http.UserAuthRequest<PostCommentModel.GetPostCommentResponse>(
                "POST",
                "/content/" + payload.contentId + "/comment",
                payload.authtoken,
                undefined,
                { userId: payload.userId, commentText: payload.commentText }
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                response: {
                    "isTipComment": false,
                    "name": "sohaib Riaz",
                    "profileImageUrl": "",
                    "userName": "sohaibminhas",
                    "content_viewer_like": true,
                    "id": 6,
                    "userId": 11,
                    "contentId": 6,
                    "text": "sadasd",
                    "likesCount": 0,
                    "timeStamp": "2020-07-16T12:51:41.8133333"
                }
            };
        }
        return response;
    },
    LikeComment: async (
        payload: LikeCommentModel.GetLikeCommentPayload
    ): Promise<LikeCommentModel.GetLikeCommentResponse> => {
        let response: LikeCommentModel.GetLikeCommentResponse;

        try {
            response = await Http.UserAuthRequest<LikeCommentModel.GetLikeCommentResponse>(
                "POST",
                "/comment/" + payload.commentId + "/like",
                payload.authtoken,
                undefined,
                { userId: payload.userId }
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    },
    UnLikeComment: async (
        payload: LikeCommentModel.GetLikeCommentPayload
    ): Promise<LikeCommentModel.GetLikeCommentResponse> => {
        let response: LikeCommentModel.GetLikeCommentResponse;

        try {
            response = await Http.UserAuthRequest<LikeCommentModel.GetLikeCommentResponse>(
                "DELETE",
                "/comment/" + payload.commentId + "/like",
                payload.authtoken,
                undefined,
                { userId: payload.userId }
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false
            };
        }
        return response;
    }
}