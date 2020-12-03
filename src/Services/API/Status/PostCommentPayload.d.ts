export interface PostCommentPayload {
    contentId: number;
    userId: number;
    commentText: string;
    authtoken: string;
}