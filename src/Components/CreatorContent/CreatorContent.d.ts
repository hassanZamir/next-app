declare namespace ICreatorContent {
    export interface IProps {
        totalContent: number, 
        totalImage: number, 
        totalVideos: number,
        params: {
            userId: number,
            profileId: string
        },
        isFollower: boolean;
        user: any;
        name: string;
    }
}

export { ICreatorContent }