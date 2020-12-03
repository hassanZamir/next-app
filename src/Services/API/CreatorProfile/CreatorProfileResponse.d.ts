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
    userName: string;
};
export interface CreatorProfileResponse {
    status: boolean;
    response: CREATOR_PROFILE;
}

export type mediaUrl = { type: number; url: string; token: string, transformations?: any }; // TODO: OVERRIDE THIS ONCE optimizing brange is merged

export type FEED = {
    name: string;
    username: string;
    profileImageUrl: string;
    content_viewer_like: boolean;
    id: number;
    title: string;
    media_url: mediaUrl[];
    medialist?: mediaUrl[]; // TODO: OVERRIDE THIS ONCE optimizing branch is merged
    likesCount: number;
    commentsCount: number;
    tipsCount: number;
    timeStamp: string;
};
export interface CreatorFeedsResponse {
    status: boolean;
    response: FEED[];
}
