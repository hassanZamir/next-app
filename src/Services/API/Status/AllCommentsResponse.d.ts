export type COMMENT = {
      name: string,
      profileImageUrl: string,
      userName: string,
      id: number,
      userId: number,
      contentId: number,
      text: string,
      likesCount: number,
      timeStamp: string,
      content_viewer_like: boolean
}
export interface AllCommentsResponse {
      status: boolean;
      response: COMMENT[]
}