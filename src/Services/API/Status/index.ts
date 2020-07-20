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
            response = await Http.Request<AllCommentsModel.GetAllCommentsResponse>(
                "GET",
                "/content/" + payload.contentId + "/comments?page=" + payload.pageNo 
                + "&offset=" + payload.offset 
                + (payload.viewerId ? ("&viewerId=" + payload.viewerId) : ""),
                undefined
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                response: [{
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
            response = await Http.Request<PostCommentModel.GetPostCommentResponse>(
                "POST",
                "/content/" + payload.contentId + "/comment",
                undefined,
                { userId: payload.userId, commentText: payload.commentText }
            );
            // localStorage.setItem("user", response.status);
        } catch (error) {
            response = {
                status: false,
                response: {
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
            response = await Http.Request<LikeCommentModel.GetLikeCommentResponse>(
                "POST",
                "/comment/" + payload.commentId + "/like",
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