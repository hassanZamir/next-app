export interface AllFeedsResponse {
    status: string;
    feeds: {
        title: string;
        username: string;
        likes: number;
        comments: number;
        time: string;
        imageUrl: string;
    }[],
    errors: string;
}