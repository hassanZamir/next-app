export type CREATOR_PROFILE = {
    id: number;
    name: string;
    totalContent: number;
    totalImages: number;
    totalVideos: number;
    totalFollowers: number;
    totalFollowing: number;
    showFollowers: boolean;
    bio: string;
    coverImageUrl: string;
    profileImageUrl: string;
    address: string;
    isFollower: boolean;
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
}
export interface CreatorFeedsResponse {
    status: boolean;
    feeds: FEED[];
    errors: string;
}