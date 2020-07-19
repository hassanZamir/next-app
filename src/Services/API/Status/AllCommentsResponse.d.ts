export type COMMENT = {
      name: string,
      profileImageUrl: string,
      userName: string,
      id: number,
      userId: number,
      contentId: number,
      text: string,
      likesCount: number,
      timeStamp: string
}
export interface AllCommentsResponse {
      status: boolean;
      response: COMMENT[]
}