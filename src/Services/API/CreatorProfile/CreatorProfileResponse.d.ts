export type CREATOR_PROFILE = {
    // id: number;
    name: string;
    contentCount: number;
    imagesCount: number;
    videosCount: number;
    followersCount: number;
    bio: string;
    coverImageUrl: string;
    profileImageUrl: string;
    location: string;
    followingFee: number;
}
export interface CreatorProfileResponse {
    status: boolean;
    profile: CREATOR_PROFILE,
    errors: string;
}

export type FEED  = {
    id: int;
    creatorId: int;
    type: CONTENT_TYPE;
    title: string;
    username: string;
    likes: number;
    comments: number;
    time: string;
    mediaUrl: string;
    profileImageUrl: string;
    contentLiked: boolean;
}
export interface CreatorFeedsResponse {
    status: boolean;
    feeds: FEED[];
    errors: string;
}