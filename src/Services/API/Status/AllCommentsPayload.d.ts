export interface AllCommentsPayload {
    contentId: number;
    pageNo: number;
    offset: number;
    userId?: number;
    sort?: string;
    authtoken: string;
}