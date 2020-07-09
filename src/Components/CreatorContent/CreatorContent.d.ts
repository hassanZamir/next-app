declare namespace ICreatorContent {
    export interface IProps {
        totalContent: number, 
        totalImage: number, 
        totalVideos: number,
        params: {
            userId: string,
            profileId: string
        },
        isFollower: boolean;
        name: string;
    }
}

export { ICreatorContent }