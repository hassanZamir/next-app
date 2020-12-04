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
/**
* @deprecated Use `FEED_MEDIA` instead.
*/
export type mediaUrl = { type: number; url: string; token: string, transformations?: any };

export type FEED = {
    name: string;
    username: string;
    profileImageUrl: string;
    content_viewer_like: boolean;
    id: number;
    title: string;
    media_url: mediaUrl[];
    medialist?: FEED_MEDIA[];
    likesCount: number;
    commentsCount: number;
    tipsCount: number;
    timeStamp: string;
};

export type FEED_MEDIA = {
    type: number; // media type image=1, video=2
    url: string; // original media url
    token: string; // secured access signature to access media from storage
    transformations?: FEED_MEDIA_TRANSFORMATION[];
}

export type FEED_MEDIA_TRANSFORMATION = {
    transformationType: FEED_MEDIA_TRANSFORMATION_TYPE; // transformation type 
    url: string; // transformed url
    token: string; // transformed url sas media storage token
}

export enum FEED_MEDIA_TRANSFORMATION_TYPE {
    CONTENT_LG = 1,
    CONTENT_MD = 2,
    CONTENT_SM = 3,
    CONTENT_XS = 4,
}

export interface CreatorFeedsResponse {
    status: boolean;
    response: FEED[];
}
